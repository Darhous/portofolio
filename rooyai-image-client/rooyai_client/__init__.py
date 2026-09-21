"""عميل بايثون لواجهة Rooyai لتوليد الصور (Rooyai Image Generation API)."""

from .client import ImageResult, RateLimitInfo, RooyaiClient
from .exceptions import (
    AuthenticationError,
    GenerationFailedError,
    InsufficientCreditsError,
    InvalidRequestError,
    ModelUnavailableError,
    RateLimitedError,
    RooyaiError,
)

# اسم مختصر مطابق للمواصفة: Client
Client = RooyaiClient

__all__ = [
    "Client",
    "RooyaiClient",
    "ImageResult",
    "RateLimitInfo",
    "RooyaiError",
    "InvalidRequestError",
    "AuthenticationError",
    "InsufficientCreditsError",
    "ModelUnavailableError",
    "RateLimitedError",
    "GenerationFailedError",
]

__version__ = "0.1.0"
