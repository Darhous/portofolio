from __future__ import annotations

from pathlib import Path
from unittest.mock import MagicMock

import pytest

from rooyai_client import (
    AuthenticationError,
    GenerationFailedError,
    ImageResult,
    InsufficientCreditsError,
    InvalidRequestError,
    ModelUnavailableError,
    RateLimitedError,
    RooyaiClient,
    RooyaiError,
)

from .conftest import FakeResponse


def make_client(**kwargs) -> RooyaiClient:
    defaults = dict(api_key="test-key", max_retries=3, backoff_base=0.0, backoff_max=0.0)
    defaults.update(kwargs)
    client = RooyaiClient(**defaults)
    client.session = MagicMock()
    return client


# --------------------------------------------------------------------------- #
# استجابات ناجحة بصيغ مختلفة
# --------------------------------------------------------------------------- #


def test_generate_default_json_format():
    client = make_client()
    client.session.post.return_value = FakeResponse(
        status_code=200,
        json_data={
            "id": "img_1",
            "created": 111,
            "format": "png",
            "width": 512,
            "height": 512,
            "image": {"base64": "aGVsbG8=", "size": 5},
        },
        headers={"X-RateLimit-Limit": "60", "X-RateLimit-Remaining": "59", "X-RateLimit-Reset": "30"},
    )

    result = client.generate("قطة على سطح", model="ultra")

    assert isinstance(result, ImageResult)
    assert result.id == "img_1"
    assert result.base64_data == "aGVsbG8="
    assert result.to_bytes() == b"hello"
    assert result.rate_limit is not None
    assert result.rate_limit.limit == 60
    assert result.rate_limit.remaining == 59

    sent_payload = client.session.post.call_args.kwargs["json"]
    assert sent_payload["prompt"] == "قطة على سطح"
    assert sent_payload["model"] == "ultra"
    assert sent_payload["image_type"] == "png"
    headers = client.session.post.call_args.kwargs["headers"]
    assert headers["Authorization"] == "Bearer test-key"


def test_generate_openai_style_b64_json():
    client = make_client()
    client.session.post.return_value = FakeResponse(
        status_code=200,
        json_data={
            "created": 222,
            "data": [{"b64_json": "aGVsbG8=", "format": "png", "width": 256, "height": 256}],
        },
    )

    result = client.generate("test", response_format="b64_json")

    assert result.base64_data == "aGVsbG8="
    assert result.format == "png"
    assert result.width == 256


def test_generate_openai_style_url():
    client = make_client()
    client.session.post.return_value = FakeResponse(
        status_code=200,
        json_data={"created": 333, "data": [{"url": "https://cdn.example.com/x.png"}]},
    )

    result = client.generate("test", response_format="url")

    assert result.url == "https://cdn.example.com/x.png"
    assert result.base64_data is None


def test_generate_stream_returns_binary():
    client = make_client()
    client.session.post.return_value = FakeResponse(
        status_code=200,
        content=b"\x89PNGrawbytes",
        headers={"Content-Type": "image/png"},
    )

    result = client.generate("test", stream=True)

    assert result.binary == b"\x89PNGrawbytes"
    assert result.format == "png"
    assert client.session.post.call_args.args[0].endswith("?output=stream")
    assert client.session.post.call_args.kwargs["stream"] is True


# --------------------------------------------------------------------------- #
# تحقق من المدخلات قبل إرسال أي طلب شبكي
# --------------------------------------------------------------------------- #


def test_prompt_too_long_raises_without_network_call():
    client = make_client()
    with pytest.raises(ValueError):
        client.generate("ا" * 4001)
    client.session.post.assert_not_called()


def test_empty_prompt_raises():
    client = make_client()
    with pytest.raises(ValueError):
        client.generate("")


def test_edit_requires_images():
    client = make_client()
    with pytest.raises(ValueError):
        client.edit("edit this", [])
    client.session.post.assert_not_called()


def test_edit_rejects_more_than_one_image():
    client = make_client()
    with pytest.raises(ValueError):
        client.edit("edit this", ["https://a.com/1.png", "https://a.com/2.png"])
    client.session.post.assert_not_called()


def test_edit_success_sends_images_payload():
    client = make_client()
    client.session.post.return_value = FakeResponse(
        status_code=200,
        json_data={"id": "e1", "image": {"base64": "aGVsbG8="}},
    )

    client.edit("make it blue", ["https://a.com/1.png"], model="vertex-gemini-edit")

    sent_payload = client.session.post.call_args.kwargs["json"]
    assert sent_payload["images"] == ["https://a.com/1.png"]
    assert sent_payload["model"] == "vertex-gemini-edit"
    assert "size" not in sent_payload
    assert "aspect" not in sent_payload


# --------------------------------------------------------------------------- #
# كل أكواد الأخطاء
# --------------------------------------------------------------------------- #


@pytest.mark.parametrize(
    "status_code,exc_type",
    [
        (400, InvalidRequestError),
        (401, AuthenticationError),
        (402, InsufficientCreditsError),
        (403, ModelUnavailableError),
        (503, GenerationFailedError),
    ],
)
def test_error_status_codes_raise_specific_exceptions(status_code, exc_type):
    client = make_client()
    client.session.post.return_value = FakeResponse(
        status_code=status_code,
        json_data={"error": {"message": f"failure {status_code}"}},
    )

    with pytest.raises(exc_type) as excinfo:
        client.generate("test")

    assert excinfo.value.status_code == status_code
    assert f"failure {status_code}" in excinfo.value.message
    # لا يُعاد المحاولة تلقائياً على هذه الأكواد
    assert client.session.post.call_count == 1


def test_error_message_fallback_to_text_when_no_json():
    client = make_client()
    client.session.post.return_value = FakeResponse(status_code=400, text="plain text error")

    with pytest.raises(InvalidRequestError) as excinfo:
        client.generate("test")

    assert "plain text error" in excinfo.value.message


def test_unknown_status_code_raises_base_error():
    client = make_client()
    client.session.post.return_value = FakeResponse(status_code=418, json_data={"message": "teapot"})

    with pytest.raises(RooyaiError) as excinfo:
        client.generate("test")

    assert excinfo.value.status_code == 418
    assert not isinstance(excinfo.value, (InvalidRequestError, AuthenticationError))


# --------------------------------------------------------------------------- #
# 429 وإعادة المحاولة (retry / backoff / Retry-After)
# --------------------------------------------------------------------------- #


def test_rate_limited_retries_then_succeeds_honoring_retry_after(monkeypatch):
    client = make_client(max_retries=3)
    sleeps: list[float] = []
    monkeypatch.setattr("rooyai_client.client.time.sleep", lambda s: sleeps.append(s))

    responses = [
        FakeResponse(status_code=429, json_data={"error": {"message": "slow down"}}, headers={"Retry-After": "2"}),
        FakeResponse(status_code=200, json_data={"id": "ok", "image": {"base64": "aGVsbG8="}}),
    ]
    client.session.post.side_effect = responses

    result = client.generate("test")

    assert result.id == "ok"
    assert client.session.post.call_count == 2
    assert sleeps == [2.0]


def test_rate_limited_exceeds_max_retries_raises():
    client = make_client(max_retries=2, backoff_base=0.0)
    client.session.post.return_value = FakeResponse(
        status_code=429, json_data={"error": {"message": "too many"}}
    )

    with pytest.raises(RateLimitedError):
        client.generate("test")

    assert client.session.post.call_count == 3  # المحاولة الأولى + محاولتان إعادة


def test_service_unavailable_503_is_not_retried():
    # 503 له دلالة محددة (فشل التوليد، الرصيد يُسترد تلقائياً حسب التوثيق)
    # ويجب أن يُرفع كخطأ مباشرة دون إعادة محاولة ضمنية من العميل.
    client = make_client(max_retries=3)
    client.session.post.return_value = FakeResponse(
        status_code=503, json_data={"error": {"message": "temp fail"}}
    )

    with pytest.raises(GenerationFailedError):
        client.generate("test")

    assert client.session.post.call_count == 1


def test_connection_error_retried_then_raises(monkeypatch):
    import requests

    client = make_client(max_retries=1)
    monkeypatch.setattr("rooyai_client.client.time.sleep", lambda s: None)
    client.session.post.side_effect = requests.ConnectionError("boom")

    with pytest.raises(RooyaiError):
        client.generate("test")

    assert client.session.post.call_count == 2  # المحاولة الأولى + محاولة واحدة إعادة


# --------------------------------------------------------------------------- #
# ImageResult: to_bytes / save
# --------------------------------------------------------------------------- #


def test_image_result_to_bytes_from_base64():
    result = ImageResult(base64_data="aGVsbG8=")
    assert result.to_bytes() == b"hello"


def test_image_result_to_bytes_from_binary():
    result = ImageResult(binary=b"raw-bytes")
    assert result.to_bytes() == b"raw-bytes"


def test_image_result_to_bytes_from_url_downloads():
    session = MagicMock()
    session.get.return_value = FakeResponse(status_code=200, content=b"downloaded")
    result = ImageResult(url="https://cdn.example.com/x.png")

    assert result.to_bytes(session=session) == b"downloaded"
    session.get.assert_called_once()


def test_image_result_to_bytes_raises_when_empty():
    result = ImageResult()
    with pytest.raises(ValueError):
        result.to_bytes()


def test_image_result_save_creates_parent_dirs(tmp_path: Path):
    result = ImageResult(base64_data="aGVsbG8=")
    target = tmp_path / "nested" / "dir" / "out.png"

    saved_path = result.save(target)

    assert saved_path == target
    assert target.read_bytes() == b"hello"
