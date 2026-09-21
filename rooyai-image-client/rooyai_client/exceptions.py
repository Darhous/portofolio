"""أخطاء مخصصة لكل كود استجابة من واجهة Rooyai."""

from __future__ import annotations

from typing import Any


class RooyaiError(Exception):
    """خطأ عام أساسي لكل أخطاء عميل Rooyai."""

    def __init__(
        self,
        message: str,
        *,
        status_code: int | None = None,
        response: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.response = response or {}

    def __str__(self) -> str:  # pragma: no cover - تمثيل نصي فقط
        if self.status_code is not None:
            return f"[{self.status_code}] {self.message}"
        return self.message


class InvalidRequestError(RooyaiError):
    """400 - طلب خاطئ (باراميترات غير صحيحة أو مفقودة)."""


class AuthenticationError(RooyaiError):
    """401 - مفتاح API غير صالح."""


class InsufficientCreditsError(RooyaiError):
    """402 - رصيد غير كافٍ لإتمام الطلب."""


class ModelUnavailableError(RooyaiError):
    """403 - الموديل معطّل مؤقتاً، يُنصح بتجربة موديل آخر."""


class RateLimitedError(RooyaiError):
    """429 - تجاوز الحد المسموح من الطلبات."""

    def __init__(
        self,
        message: str,
        *,
        status_code: int | None = None,
        response: dict[str, Any] | None = None,
        retry_after: float | None = None,
    ) -> None:
        super().__init__(message, status_code=status_code, response=response)
        self.retry_after = retry_after


class GenerationFailedError(RooyaiError):
    """503 - فشل التوليد، ويُسترد الرصيد تلقائياً بحسب التوثيق."""


#: تعيين كود الحالة إلى نوع الخطأ المناسب لاستخدامه في العميل.
STATUS_CODE_TO_EXCEPTION: dict[int, type[RooyaiError]] = {
    400: InvalidRequestError,
    401: AuthenticationError,
    402: InsufficientCreditsError,
    403: ModelUnavailableError,
    429: RateLimitedError,
    503: GenerationFailedError,
}
