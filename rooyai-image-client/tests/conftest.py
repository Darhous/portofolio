from __future__ import annotations

import os
from typing import Any

import pytest


def pytest_addoption(parser: pytest.Parser) -> None:
    parser.addoption(
        "--live",
        action="store_true",
        default=False,
        help="يشغّل اختبار التكامل الحقيقي (يستهلك رصيداً فعلياً) مقابل Rooyai API",
    )


@pytest.fixture
def live_mode(request: pytest.FixtureRequest) -> bool:
    return bool(request.config.getoption("--live"))


@pytest.fixture
def live_api_key(request: pytest.FixtureRequest) -> str:
    if not request.config.getoption("--live"):
        pytest.skip("اختبار التكامل الحقيقي يعمل فقط مع --live")
    api_key = os.environ.get("ROOYAI_API_KEY")
    if not api_key:
        pytest.skip("متغير البيئة ROOYAI_API_KEY غير معرَّف لتشغيل اختبار التكامل")
    return api_key


class FakeResponse:
    """محاكاة بسيطة لـ requests.Response لتفادي أي اتصال شبكي فعلي في الاختبارات."""

    def __init__(
        self,
        status_code: int = 200,
        json_data: dict[str, Any] | None = None,
        content: bytes = b"",
        headers: dict[str, str] | None = None,
        text: str = "",
    ) -> None:
        self.status_code = status_code
        self._json_data = json_data
        self.content = content
        self.headers = headers or {}
        self.text = text or (str(json_data) if json_data is not None else "")

    @property
    def ok(self) -> bool:
        return 200 <= self.status_code < 300

    def json(self) -> dict[str, Any]:
        if self._json_data is None:
            raise ValueError("no json body")
        return self._json_data

    def raise_for_status(self) -> None:
        if not self.ok:
            raise RuntimeError(f"HTTP {self.status_code}")
