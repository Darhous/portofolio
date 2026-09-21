"""اختبار تكامل حقيقي (اختياري) — يستهلك رصيداً فعلياً.

لا يُشغَّل إلا صريحاً عبر:
    pytest --live tests/test_integration.py

ويتطلب متغير البيئة ROOYAI_API_KEY. باقي الاختبارات في هذه الحزمة كلها
تعمل بـ mock للشبكة ولا تستهلك أي رصيد.
"""

from __future__ import annotations

from rooyai_client import RooyaiClient


def test_live_generate_minimal_request(live_api_key: str):
    client = RooyaiClient(api_key=live_api_key, max_retries=1)
    result = client.generate("a single red circle on white background", model="ultra")

    assert result.base64_data or result.url or result.binary
