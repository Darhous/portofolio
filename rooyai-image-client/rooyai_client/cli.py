"""واجهة سطر الأوامر لعميل Rooyai (rooyai-cli)."""

from __future__ import annotations

import argparse
import os
import sys
from typing import Sequence

from .client import RooyaiClient
from .config import DEFAULT_BASE_URL, DEFAULT_EDIT_MODEL, DEFAULT_MODEL
from .exceptions import (
    AuthenticationError,
    GenerationFailedError,
    InsufficientCreditsError,
    InvalidRequestError,
    ModelUnavailableError,
    RateLimitedError,
    RooyaiError,
)
from .i18n import DEFAULT_LANG, t

ENV_API_KEY = "ROOYAI_API_KEY"


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="rooyai", description="Rooyai image API CLI")
    parser.add_argument("--lang", choices=["ar", "en"], default=DEFAULT_LANG)
    parser.add_argument("--api-key", default=None)
    parser.add_argument("--base-url", default=DEFAULT_BASE_URL)
    parser.add_argument("--timeout", type=float, default=60.0)
    parser.add_argument("--max-retries", type=int, default=3)

    subparsers = parser.add_subparsers(dest="command", required=True)

    generate = subparsers.add_parser("generate")
    generate.add_argument("prompt")
    generate.add_argument("--model", default=DEFAULT_MODEL)
    generate.add_argument("--image-type", default="png", choices=["png", "jpeg", "webp"])
    generate.add_argument("--size", default=None)
    generate.add_argument("--aspect", default=None)
    generate.add_argument("--vertex-aspect", default=None)
    generate.add_argument("--vertex-resolution", default=None)
    generate.add_argument("--response-format", default=None, choices=["b64_json", "url"])
    generate.add_argument("--stream", action="store_true")
    generate.add_argument("--output", "-o", default=None)

    edit = subparsers.add_parser("edit")
    edit.add_argument("prompt")
    edit.add_argument("--image", dest="images", action="append", default=[])
    edit.add_argument("--model", default=DEFAULT_EDIT_MODEL)
    edit.add_argument("--image-type", default="png", choices=["png", "jpeg", "webp"])
    edit.add_argument("--vertex-aspect", default=None)
    edit.add_argument("--vertex-resolution", default=None)
    edit.add_argument("--response-format", default=None, choices=["b64_json", "url"])
    edit.add_argument("--stream", action="store_true")
    edit.add_argument("--output", "-o", default=None)

    models_check = subparsers.add_parser("models-check")
    models_check.add_argument("--model", default=DEFAULT_MODEL)

    return parser


def _apply_localized_help(parser: argparse.ArgumentParser, lang: str) -> None:
    """يحدّث نصوص المساعدة بعد معرفة اللغة (argparse لا يدعم لغة ديناميكية بسهولة)."""
    parser.description = t("cli.description", lang)
    mapping = {
        "--api-key": "arg.api_key",
        "--base-url": "arg.base_url",
        "--model": "arg.model",
        "--image-type": "arg.image_type",
        "--size": "arg.size",
        "--aspect": "arg.aspect",
        "--vertex-aspect": "arg.vertex_aspect",
        "--vertex-resolution": "arg.vertex_resolution",
        "--response-format": "arg.response_format",
        "--stream": "arg.stream",
        "--output": "arg.output",
        "--image": "arg.images",
        "--timeout": "arg.timeout",
        "--max-retries": "arg.max_retries",
        "--lang": "arg.lang",
    }
    for action_group in parser._subparsers._group_actions if parser._subparsers else []:  # noqa: SLF001
        for sub_action in action_group.choices.values():
            for action in sub_action._actions:  # noqa: SLF001
                for opt in action.option_strings:
                    if opt in mapping:
                        action.help = t(mapping[opt], lang)
    for action in parser._actions:  # noqa: SLF001
        for opt in action.option_strings:
            if opt in mapping:
                action.help = t(mapping[opt], lang)


def _resolve_api_key(args: argparse.Namespace, lang: str) -> str:
    api_key = args.api_key or os.environ.get(ENV_API_KEY)
    if not api_key:
        print(t("error.missing_api_key", lang), file=sys.stderr)
        raise SystemExit(2)
    return api_key


def _build_client(args: argparse.Namespace, lang: str) -> RooyaiClient:
    api_key = _resolve_api_key(args, lang)
    return RooyaiClient(
        api_key=api_key,
        base_url=args.base_url,
        timeout=args.timeout,
        max_retries=args.max_retries,
    )


def _print_error(exc: RooyaiError, lang: str, *, model: str | None = None) -> None:
    if isinstance(exc, InvalidRequestError):
        print(t("error.invalid_request", lang, message=exc.message), file=sys.stderr)
    elif isinstance(exc, AuthenticationError):
        print(t("error.authentication", lang, message=exc.message), file=sys.stderr)
    elif isinstance(exc, InsufficientCreditsError):
        print(t("error.insufficient_credits", lang, message=exc.message), file=sys.stderr)
    elif isinstance(exc, ModelUnavailableError):
        print(
            t("error.model_unavailable", lang, model=model or "?", message=exc.message),
            file=sys.stderr,
        )
    elif isinstance(exc, RateLimitedError):
        if exc.retry_after is not None:
            print(
                t("error.rate_limited", lang, message=exc.message, retry_after=exc.retry_after),
                file=sys.stderr,
            )
        else:
            print(t("error.rate_limited_unknown_wait", lang, message=exc.message), file=sys.stderr)
    elif isinstance(exc, GenerationFailedError):
        print(t("error.generation_failed", lang, message=exc.message), file=sys.stderr)
    else:
        print(t("error.generic", lang, message=exc.message), file=sys.stderr)


def _print_rate_limit(result_rate_limit, lang: str) -> None:
    if result_rate_limit is not None and result_rate_limit.is_known:
        print(
            t(
                "success.rate_limit_info",
                lang,
                remaining=result_rate_limit.remaining,
                limit=result_rate_limit.limit,
                reset=result_rate_limit.reset,
            )
        )


def _handle_result(result, output: str | None, lang: str) -> int:
    _print_rate_limit(result.rate_limit, lang)
    if output:
        path = result.save(output)
        print(t("success.saved", lang, path=str(path)))
    elif result.url and not result.base64_data and not result.binary:
        print(t("success.url_only", lang, url=result.url))
    else:
        print(t("success.no_output", lang))
    return 0


def cmd_generate(args: argparse.Namespace, lang: str) -> int:
    client = _build_client(args, lang)
    try:
        result = client.generate(
            args.prompt,
            model=args.model,
            image_type=args.image_type,
            size=args.size,
            aspect=args.aspect,
            vertex_aspect=args.vertex_aspect,
            vertex_resolution=args.vertex_resolution,
            response_format=args.response_format,
            stream=args.stream,
        )
    except RooyaiError as exc:
        _print_error(exc, lang, model=args.model)
        return 1
    except ValueError as exc:
        print(t("error.generic", lang, message=str(exc)), file=sys.stderr)
        return 2
    return _handle_result(result, args.output, lang)


def cmd_edit(args: argparse.Namespace, lang: str) -> int:
    if not args.images:
        print(t("error.edit_missing_image", lang), file=sys.stderr)
        return 2
    client = _build_client(args, lang)
    try:
        result = client.edit(
            args.prompt,
            args.images,
            model=args.model,
            image_type=args.image_type,
            vertex_aspect=args.vertex_aspect,
            vertex_resolution=args.vertex_resolution,
            response_format=args.response_format,
            stream=args.stream,
        )
    except RooyaiError as exc:
        _print_error(exc, lang, model=args.model)
        return 1
    except ValueError as exc:
        print(t("error.generic", lang, message=str(exc)), file=sys.stderr)
        return 2
    return _handle_result(result, args.output, lang)


def cmd_models_check(args: argparse.Namespace, lang: str) -> int:
    client = _build_client(args, lang)
    print(t("check.title", lang, model=args.model))
    try:
        client.generate("test", model=args.model, image_type="png")
    except InsufficientCreditsError:
        print(t("check.insufficient_credits", lang, model=args.model))
        return 0
    except ModelUnavailableError:
        print(t("check.unavailable", lang, model=args.model))
        return 1
    except RateLimitedError:
        print(t("check.rate_limited", lang))
        return 1
    except AuthenticationError:
        print(t("check.auth_error", lang))
        return 1
    except InvalidRequestError as exc:
        print(t("check.invalid_request", lang, model=args.model, message=exc.message))
        return 1
    except GenerationFailedError as exc:
        print(t("check.generation_failed", lang, model=args.model, message=exc.message))
        return 1
    except RooyaiError as exc:
        print(t("check.unexpected_error", lang, model=args.model, message=exc.message))
        return 1
    else:
        print(t("check.ok", lang, model=args.model))
        return 0


def main(argv: Sequence[str] | None = None) -> int:
    argv = list(argv if argv is not None else sys.argv[1:])
    lang = DEFAULT_LANG
    if "--lang" in argv:
        idx = argv.index("--lang")
        if idx + 1 < len(argv):
            lang = argv[idx + 1]

    parser = build_parser()
    _apply_localized_help(parser, lang)
    args = parser.parse_args(argv)
    lang = args.lang

    if args.command == "generate":
        return cmd_generate(args, lang)
    if args.command == "edit":
        return cmd_edit(args, lang)
    if args.command == "models-check":
        return cmd_models_check(args, lang)

    parser.print_help()
    return 2


if __name__ == "__main__":  # pragma: no cover
    raise SystemExit(main())
