"""إعدادات قابلة للضبط: عنوان الـ API وقائمة الموديلات المعروفة.

القائمة الكاملة للموديلات وأسعارها بالكريدت غير معلنة رسمياً وقد تتضارب بين
مصادر التوثيق (راجع models.json). لذلك:
  * العميل لا يرفض أي اسم موديل غير موجود في هذه القائمة — أي نص يُقبل.
  * هذا الملف هو المصدر الوحيد لأسماء الموديلات الافتراضية والمعروفة، بحيث
    يمكن تحديثها دون تعديل منطق الكود في client.py أو cli.py.
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any

_MODELS_FILE = Path(__file__).with_name("models.json")


@dataclass(frozen=True)
class ModelInfo:
    name: str
    category: str
    price_credits: int | float | None
    notes: str


def _load_raw() -> dict[str, Any]:
    with _MODELS_FILE.open("r", encoding="utf-8") as fh:
        return json.load(fh)


_RAW = _load_raw()

DEFAULT_BASE_URL: str = _RAW.get("default_base_url", "https://rooyai.com/api/v1/images")
DEFAULT_MODEL: str = _RAW.get("default_model", "ultra")
DEFAULT_EDIT_MODEL: str = _RAW.get("default_edit_model", "vertex-gemini-edit")

KNOWN_MODELS: tuple[ModelInfo, ...] = tuple(
    ModelInfo(
        name=item["name"],
        category=item.get("category", "generate"),
        price_credits=item.get("price_credits"),
        notes=item.get("notes", ""),
    )
    for item in _RAW.get("models", [])
)


def get_model_info(name: str) -> ModelInfo | None:
    """يرجع معلومات الموديل المعروفة إن وجدت، أو None لموديل غير مسجّل."""
    for model in KNOWN_MODELS:
        if model.name == name:
            return model
    return None


def reload_models(path: str | Path | None = None) -> None:
    """يعيد تحميل قائمة الموديلات من ملف إعدادات مخصص (مفيد للاختبارات أو التوسّع)."""
    global _RAW, DEFAULT_BASE_URL, DEFAULT_MODEL, DEFAULT_EDIT_MODEL, KNOWN_MODELS
    target = Path(path) if path else _MODELS_FILE
    with target.open("r", encoding="utf-8") as fh:
        _RAW = json.load(fh)
    DEFAULT_BASE_URL = _RAW.get("default_base_url", DEFAULT_BASE_URL)
    DEFAULT_MODEL = _RAW.get("default_model", DEFAULT_MODEL)
    DEFAULT_EDIT_MODEL = _RAW.get("default_edit_model", DEFAULT_EDIT_MODEL)
    KNOWN_MODELS = tuple(
        ModelInfo(
            name=item["name"],
            category=item.get("category", "generate"),
            price_credits=item.get("price_credits"),
            notes=item.get("notes", ""),
        )
        for item in _RAW.get("models", [])
    )
