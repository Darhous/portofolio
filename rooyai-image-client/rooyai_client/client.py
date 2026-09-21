"""عميل واجهة Rooyai لتوليد الصور (Rooyai Image Generation API)."""

from __future__ import annotations

import base64
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Literal

import requests

from .config import DEFAULT_BASE_URL, DEFAULT_EDIT_MODEL, DEFAULT_MODEL
from .exceptions import STATUS_CODE_TO_EXCEPTION, RateLimitedError, RooyaiError

ImageType = Literal["png", "jpeg", "webp"]
ResponseFormat = Literal["b64_json", "url"]

MAX_PROMPT_LENGTH = 4000


@dataclass
class RateLimitInfo:
    """معلومات حدود الطلبات المستخرجة من رؤوس الاستجابة (إن وُجدت)."""

    limit: int | None = None
    remaining: int | None = None
    reset: int | None = None

    @property
    def is_known(self) -> bool:
        return self.limit is not None or self.remaining is not None or self.reset is not None


@dataclass
class ImageResult:
    """نتيجة توليد/تعديل صورة واحدة، مع إمكانية حفظها على القرص."""

    id: str | None = None
    created: int | None = None
    format: str | None = None
    width: int | None = None
    height: int | None = None
    base64_data: str | None = None
    url: str | None = None
    binary: bytes | None = None
    raw: dict[str, Any] | None = None
    rate_limit: RateLimitInfo | None = None

    def to_bytes(self, *, session: requests.Session | None = None, timeout: float = 30.0) -> bytes:
        """يرجع بيانات الصورة كـ bytes، ويُنزّل الرابط تلقائياً إن كان response_format=url."""
        if self.binary is not None:
            return self.binary
        if self.base64_data is not None:
            return base64.b64decode(self.base64_data)
        if self.url is not None:
            sess = session or requests.Session()
            response = sess.get(self.url, timeout=timeout)
            response.raise_for_status()
            return response.content
        raise ValueError("لا توجد بيانات صورة صالحة (لا base64 ولا binary ولا رابط) لحفظها")

    def save(self, path: str | Path, *, session: requests.Session | None = None) -> Path:
        """يحفظ الصورة في المسار المحدد وينشئ المجلدات الناقصة تلقائياً."""
        target = Path(path)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(self.to_bytes(session=session))
        return target


class RooyaiClient:
    """عميل بسيط للتعامل مع Rooyai Image Generation API.

    يدعم:
      * الرد الافتراضي بصيغة JSON، وصيغة OpenAI-style (response_format=b64_json/url).
      * البث المباشر للصورة (output=stream) عند stream=True.
      * إعادة المحاولة (retry) مع exponential backoff، واحترام رأس Retry-After.
      * أخطاء مخصصة لكل كود استجابة (400/401/402/403/429/503).
    """

    def __init__(
        self,
        api_key: str,
        *,
        base_url: str = DEFAULT_BASE_URL,
        timeout: float = 60.0,
        max_retries: int = 3,
        backoff_base: float = 1.0,
        backoff_max: float = 30.0,
        session: requests.Session | None = None,
    ) -> None:
        if not api_key:
            raise ValueError("api_key مطلوب ولا يمكن أن يكون فارغاً")
        self.api_key = api_key
        self.base_url = base_url
        self.timeout = timeout
        self.max_retries = max_retries
        self.backoff_base = backoff_base
        self.backoff_max = backoff_max
        self.session = session or requests.Session()

    # ------------------------------------------------------------------ #
    # واجهات عامة
    # ------------------------------------------------------------------ #
    def generate(
        self,
        prompt: str,
        *,
        model: str = DEFAULT_MODEL,
        image_type: ImageType = "png",
        size: str | None = None,
        aspect: str | None = None,
        vertex_aspect: str | None = None,
        vertex_resolution: str | None = None,
        response_format: ResponseFormat | None = None,
        stream: bool = False,
        extra: dict[str, Any] | None = None,
    ) -> ImageResult:
        """يولّد صورة جديدة من نص وصفي (prompt)."""
        payload = self._build_payload(
            prompt=prompt,
            model=model,
            image_type=image_type,
            size=size,
            aspect=aspect,
            vertex_aspect=vertex_aspect,
            vertex_resolution=vertex_resolution,
            images=None,
            response_format=response_format,
            extra=extra,
        )
        return self._send(payload, stream=stream)

    def edit(
        self,
        prompt: str,
        images: list[str],
        *,
        model: str = DEFAULT_EDIT_MODEL,
        image_type: ImageType = "png",
        vertex_aspect: str | None = None,
        vertex_resolution: str | None = None,
        response_format: ResponseFormat | None = None,
        stream: bool = False,
        extra: dict[str, Any] | None = None,
    ) -> ImageResult:
        """يعدّل صورة موجودة (رابط عام واحد) بناءً على نص وصفي."""
        if not images:
            raise ValueError("images مطلوبة لعملية التعديل (رابط عام واحد على الأقل)")
        if len(images) > 1:
            raise ValueError("صورة واحدة كحد أقصى مسموحة لعملية التعديل")
        payload = self._build_payload(
            prompt=prompt,
            model=model,
            image_type=image_type,
            size=None,
            aspect=None,
            vertex_aspect=vertex_aspect,
            vertex_resolution=vertex_resolution,
            images=images,
            response_format=response_format,
            extra=extra,
        )
        return self._send(payload, stream=stream)

    # ------------------------------------------------------------------ #
    # بناء الطلب
    # ------------------------------------------------------------------ #
    def _build_payload(
        self,
        *,
        prompt: str,
        model: str,
        image_type: str,
        size: str | None,
        aspect: str | None,
        vertex_aspect: str | None,
        vertex_resolution: str | None,
        images: list[str] | None,
        response_format: str | None,
        extra: dict[str, Any] | None,
    ) -> dict[str, Any]:
        if not prompt:
            raise ValueError("prompt مطلوب ولا يمكن أن يكون فارغاً")
        if len(prompt) > MAX_PROMPT_LENGTH:
            raise ValueError(f"الوصف (prompt) طويل جداً: الحد الأقصى {MAX_PROMPT_LENGTH} حرفاً")

        payload: dict[str, Any] = {
            "prompt": prompt,
            "model": model,
            "image_type": image_type,
        }
        if size is not None:
            payload["size"] = size
        if aspect is not None:
            payload["aspect"] = aspect
        if vertex_aspect is not None:
            payload["vertexAspect"] = vertex_aspect
        if vertex_resolution is not None:
            payload["vertexResolution"] = vertex_resolution
        if images:
            payload["images"] = list(images)
        if response_format is not None:
            payload["response_format"] = response_format
        if extra:
            payload.update(extra)
        return payload

    # ------------------------------------------------------------------ #
    # الإرسال والتحويل
    # ------------------------------------------------------------------ #
    def _send(self, payload: dict[str, Any], *, stream: bool) -> ImageResult:
        response = self._request(payload, stream=stream)
        rate_limit = self._extract_rate_limit(response)
        if stream:
            return self._parse_stream_response(response, rate_limit)
        data = response.json()
        return self._parse_json_response(data, rate_limit)

    def _request(self, payload: dict[str, Any], *, stream: bool) -> requests.Response:
        url = f"{self.base_url}?output=stream" if stream else self.base_url
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        attempt = 0
        while True:
            try:
                response = self.session.post(
                    url,
                    json=payload,
                    headers=headers,
                    timeout=self.timeout,
                    stream=stream,
                )
            except requests.RequestException as exc:
                attempt += 1
                if attempt > self.max_retries:
                    raise RooyaiError(f"فشل الاتصال بخادم Rooyai: {exc}") from exc
                time.sleep(self._backoff_delay(attempt))
                continue

            if response.ok:
                return response

            should_retry, delay = self._should_retry(response, attempt)
            if should_retry:
                attempt += 1
                time.sleep(delay)
                continue

            self._raise_for_status(response)
            raise AssertionError("unreachable")  # pragma: no cover

    def _should_retry(self, response: requests.Response, attempt: int) -> tuple[bool, float]:
        # لا تُعاد المحاولة إلا على 429 (تجاوز الحد). أكواد الأخطاء الأخرى
        # (400/401/402/403/503) لها دلالة محددة في التوثيق ويجب أن تُرفع
        # للمستخدم كما هي، بما فيها 503 التي تُسترد فيها القيمة تلقائياً
        # حسب توثيق الخدمة، دون إعادة محاولة ضمنية من العميل.
        if attempt >= self.max_retries:
            return False, 0.0
        if response.status_code == 429:
            retry_after = self._parse_retry_after(response)
            return True, retry_after if retry_after is not None else self._backoff_delay(attempt + 1)
        return False, 0.0

    def _backoff_delay(self, attempt: int) -> float:
        delay = self.backoff_base * (2 ** (attempt - 1))
        return min(delay, self.backoff_max)

    @staticmethod
    def _parse_retry_after(response: requests.Response) -> float | None:
        header = response.headers.get("Retry-After")
        if header is None:
            return None
        try:
            return max(0.0, float(header))
        except ValueError:
            return None

    @staticmethod
    def _extract_rate_limit(response: requests.Response) -> RateLimitInfo:
        headers = response.headers

        def _as_int(name: str) -> int | None:
            value = headers.get(name)
            if value is None:
                return None
            try:
                return int(value)
            except ValueError:
                return None

        return RateLimitInfo(
            limit=_as_int("X-RateLimit-Limit"),
            remaining=_as_int("X-RateLimit-Remaining"),
            reset=_as_int("X-RateLimit-Reset"),
        )

    def _raise_for_status(self, response: requests.Response) -> None:
        try:
            data: dict[str, Any] = response.json()
        except ValueError:
            data = {}

        message = None
        error_field = data.get("error") if isinstance(data, dict) else None
        if isinstance(error_field, dict):
            message = error_field.get("message")
        elif isinstance(error_field, str):
            message = error_field
        if not message and isinstance(data, dict):
            message = data.get("message")
        if not message:
            message = response.text or f"HTTP {response.status_code}"

        status = response.status_code
        exc_class = STATUS_CODE_TO_EXCEPTION.get(status, RooyaiError)
        if exc_class is RateLimitedError:
            raise RateLimitedError(
                message,
                status_code=status,
                response=data,
                retry_after=self._parse_retry_after(response),
            )
        raise exc_class(message, status_code=status, response=data)

    @staticmethod
    def _parse_json_response(data: dict[str, Any], rate_limit: RateLimitInfo) -> ImageResult:
        # شكل OpenAI-style: {"data": [{"b64_json": ...}]} أو {"data": [{"url": ...}]}
        openai_data = data.get("data")
        if isinstance(openai_data, list) and openai_data:
            item = openai_data[0]
            return ImageResult(
                id=data.get("id"),
                created=data.get("created"),
                format=item.get("format") or data.get("format"),
                width=item.get("width") or data.get("width"),
                height=item.get("height") or data.get("height"),
                base64_data=item.get("b64_json"),
                url=item.get("url"),
                raw=data,
                rate_limit=rate_limit,
            )

        # الشكل الافتراضي: {"id","created","format","width","height","image":{"base64","size"}}
        image = data.get("image") or {}
        return ImageResult(
            id=data.get("id"),
            created=data.get("created"),
            format=data.get("format"),
            width=data.get("width"),
            height=data.get("height"),
            base64_data=image.get("base64"),
            raw=data,
            rate_limit=rate_limit,
        )

    @staticmethod
    def _parse_stream_response(response: requests.Response, rate_limit: RateLimitInfo) -> ImageResult:
        content_type = response.headers.get("Content-Type", "")
        fmt = content_type.split("/")[-1].split(";")[0].strip() if "/" in content_type else None
        return ImageResult(
            binary=response.content,
            format=fmt or None,
            rate_limit=rate_limit,
        )
