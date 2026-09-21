"""رسائل واجهة سطر الأوامر بالعربية (افتراضي) والإنجليزية."""

from __future__ import annotations

MESSAGES: dict[str, dict[str, str]] = {
    "ar": {
        "cli.description": "عميل سطر الأوامر لواجهة Rooyai لتوليد الصور",
        "arg.api_key": "مفتاح API لـ Rooyai (أو عيّن متغير البيئة ROOYAI_API_KEY)",
        "arg.base_url": "عنوان الـ API (اختياري، الافتراضي من ملف الإعدادات)",
        "arg.model": "اسم الموديل",
        "arg.image_type": "صيغة الصورة: png | jpeg | webp",
        "arg.size": "المقاس (لموديل qwen1 فقط): 1024x1024 | 1792x1024 | 1024x1792",
        "arg.aspect": "نسبة العرض إلى الارتفاع (لموديل qwen2 فقط): square | landscape | portrait",
        "arg.vertex_aspect": "نسبة vertex (لموديلات vertex فقط)، مثل 3:4",
        "arg.vertex_resolution": "دقة vertex (لموديلات vertex فقط)، مثل 2K",
        "arg.response_format": "شكل الرد: b64_json أو url (بنمط OpenAI)",
        "arg.stream": "استقبال الصورة مباشرة كبيانات ثنائية (output=stream)",
        "arg.output": "مسار حفظ الصورة الناتجة",
        "arg.prompt": "نص وصف الصورة المطلوبة (حتى 4000 حرف)",
        "arg.images": "رابط عام للصورة المطلوب تعديلها (صورة واحدة كحد أقصى)",
        "arg.timeout": "الحد الأقصى للانتظار بالثواني لكل طلب",
        "arg.max_retries": "أقصى عدد لمحاولات إعادة الإرسال عند 429/5xx",
        "arg.lang": "لغة رسائل الواجهة: ar أو en",
        "error.missing_api_key": (
            "لم يتم تحديد مفتاح API. مرّره بـ --api-key أو عيّن متغير البيئة "
            "ROOYAI_API_KEY."
        ),
        "error.edit_missing_image": "يجب تمرير رابط صورة واحد على الأقل باستخدام --image لعملية التعديل.",
        "error.generic": "خطأ: {message}",
        "error.invalid_request": "طلب خاطئ (400): {message}",
        "error.authentication": "مفتاح API غير صالح (401): {message}",
        "error.insufficient_credits": "الرصيد غير كافٍ (402): {message}",
        "error.model_unavailable": (
            "الموديل '{model}' معطّل مؤقتاً (403): {message}. جرّب موديلاً آخر."
        ),
        "error.rate_limited": (
            "تم تجاوز حد الطلبات (429): {message}. انتظر {retry_after} ثانية ثم أعد المحاولة."
        ),
        "error.rate_limited_unknown_wait": (
            "تم تجاوز حد الطلبات (429): {message}. انتظر قليلاً ثم أعد المحاولة."
        ),
        "error.generation_failed": (
            "فشل التوليد (503): {message}. الرصيد يُسترد تلقائياً بحسب توثيق الخدمة."
        ),
        "success.saved": "تم الحفظ في: {path}",
        "success.rate_limit_info": "حدود الطلبات — المتاح: {remaining}/{limit}، يُعاد الضبط: {reset}",
        "success.no_output": "تم الاستلام بنجاح لكن لم يُطلب حفظ الملف (استخدم --output).",
        "success.url_only": "رابط الصورة: {url}",
        "check.title": "فحص الموديل: {model}",
        "check.ok": "✅ الموديل '{model}' يعمل بشكل طبيعي.",
        "check.insufficient_credits": (
            "⚠️ الموديل '{model}' يستجيب، لكن الرصيد غير كافٍ لإتمام طلب فعلي (402)."
        ),
        "check.unavailable": "❌ الموديل '{model}' معطّل مؤقتاً حالياً (403).",
        "check.rate_limited": "⏳ تم تجاوز حد الطلبات أثناء الفحص (429)، أعد المحاولة بعد قليل.",
        "check.auth_error": "❌ مفتاح API غير صالح (401)، تحقّق من المفتاح المستخدم.",
        "check.invalid_request": "❌ طلب خاطئ عند فحص الموديل '{model}' (400): {message}",
        "check.generation_failed": "❌ فشل التوليد عند فحص الموديل '{model}' (503): {message}",
        "check.unexpected_error": "❌ خطأ غير متوقع أثناء فحص الموديل '{model}': {message}",
    },
    "en": {
        "cli.description": "Command-line client for the Rooyai image generation API",
        "arg.api_key": "Rooyai API key (or set the ROOYAI_API_KEY environment variable)",
        "arg.base_url": "API base URL (optional, defaults from the config file)",
        "arg.model": "Model name",
        "arg.image_type": "Image format: png | jpeg | webp",
        "arg.size": "Size (qwen1 only): 1024x1024 | 1792x1024 | 1024x1792",
        "arg.aspect": "Aspect ratio (qwen2 only): square | landscape | portrait",
        "arg.vertex_aspect": "Vertex aspect ratio (vertex models only), e.g. 3:4",
        "arg.vertex_resolution": "Vertex resolution (vertex models only), e.g. 2K",
        "arg.response_format": "Response format: b64_json or url (OpenAI-style)",
        "arg.stream": "Receive the raw image bytes directly (output=stream)",
        "arg.output": "Path to save the resulting image",
        "arg.prompt": "Text prompt describing the desired image (up to 4000 chars)",
        "arg.images": "Public URL of the image to edit (max one image)",
        "arg.timeout": "Per-request timeout in seconds",
        "arg.max_retries": "Max retry attempts on 429/5xx responses",
        "arg.lang": "CLI message language: ar or en",
        "error.missing_api_key": (
            "No API key provided. Pass --api-key or set the ROOYAI_API_KEY "
            "environment variable."
        ),
        "error.edit_missing_image": "At least one --image URL is required for the edit command.",
        "error.generic": "Error: {message}",
        "error.invalid_request": "Bad request (400): {message}",
        "error.authentication": "Invalid API key (401): {message}",
        "error.insufficient_credits": "Insufficient credits (402): {message}",
        "error.model_unavailable": (
            "Model '{model}' is temporarily unavailable (403): {message}. Try another model."
        ),
        "error.rate_limited": (
            "Rate limit exceeded (429): {message}. Wait {retry_after}s and retry."
        ),
        "error.rate_limited_unknown_wait": (
            "Rate limit exceeded (429): {message}. Wait a bit and retry."
        ),
        "error.generation_failed": (
            "Generation failed (503): {message}. Credits are refunded automatically per docs."
        ),
        "success.saved": "Saved to: {path}",
        "success.rate_limit_info": "Rate limit — remaining: {remaining}/{limit}, reset: {reset}",
        "success.no_output": "Request succeeded but no --output path was given, nothing saved.",
        "success.url_only": "Image URL: {url}",
        "check.title": "Checking model: {model}",
        "check.ok": "✅ Model '{model}' is working normally.",
        "check.insufficient_credits": (
            "⚠️ Model '{model}' responded, but credits are insufficient for a real request (402)."
        ),
        "check.unavailable": "❌ Model '{model}' is currently unavailable (403).",
        "check.rate_limited": "⏳ Rate limit hit during check (429), retry shortly.",
        "check.auth_error": "❌ Invalid API key (401), check the key you used.",
        "check.invalid_request": "❌ Bad request while checking model '{model}' (400): {message}",
        "check.generation_failed": "❌ Generation failed while checking model '{model}' (503): {message}",
        "check.unexpected_error": "❌ Unexpected error while checking model '{model}': {message}",
    },
}

DEFAULT_LANG = "ar"


def t(key: str, lang: str = DEFAULT_LANG, **kwargs: object) -> str:
    """يرجع رسالة مترجمة حسب المفتاح واللغة، مع دعم fallback للعربية."""
    table = MESSAGES.get(lang, MESSAGES[DEFAULT_LANG])
    text = table.get(key) or MESSAGES[DEFAULT_LANG].get(key, key)
    if kwargs:
        try:
            return text.format(**kwargs)
        except (KeyError, IndexError):
            return text
    return text
