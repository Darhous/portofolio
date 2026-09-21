<div dir="rtl">

# عميل Rooyai لتوليد الصور (Python)

عميل بايثون + أداة سطر أوامر (CLI) للتعامل مع واجهة **Rooyai Image Generation API**
(`POST https://rooyai.com/api/v1/images`). يدعم توليد الصور، تعديل الصور، الحفظ
المباشر على القرص، البث (stream)، وإعادة المحاولة التلقائية عند تجاوز حد الطلبات.

## ⚠️ تنبيه أمني مهم بخصوص المفتاح (API Key)

- **لا تضع مفتاح API أبداً داخل الكود المصدري أو في رسائل الـ commit أو في محادثات
  الدردشة/الشات بوت.** أي نص تلصقه في محادثة قد يُخزَّن في سجلات الخدمة.
- استخدم متغير بيئة (`ROOYAI_API_KEY`) أو ملف `.env` **غير مُتتبَّع في git** (أضفه
  إلى `.gitignore`).
- إذا شككت أن مفتاحك انكشف (مثلاً لُصق في شات، أو رفع بالخطأ على GitHub)،
  **قم بإلغائه فوراً (Revoke) من لوحة تحكم Rooyai وأصدر مفتاحاً جديداً.**
- لا تشارك المفتاح مع أي طرف ثالث، ولا تمرره كمعامل رابط (query string) في أي
  مكان قد يُسجَّل في access logs.

## التثبيت

يتطلب Python 3.10 أو أحدث.

```bash
cd rooyai-image-client
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

هذا يثبّت الحزمة مع أداة سطر الأوامر `rooyai` وتبعيات الاختبار (`pytest`).

## الإعداد

```bash
export ROOYAI_API_KEY="ضع_مفتاحك_هنا"
```

أو مرّره مباشرة عبر `--api-key` في كل أمر (غير مفضّل لتفادي بقائه في سجل الأوامر
`history`).

## أمثلة الاستخدام (CLI)

### توليد صورة

```bash
rooyai generate "منظر جبلي عند الغروب" \
  --model ultra \
  --image-type png \
  --output ./out/mountain.png
```

### توليد بنمط استجابة OpenAI (b64_json / url)

```bash
rooyai generate "قطة كرتونية" --response-format url
```

### توليد عبر موديل qwen2 بدعم اللغة العربية و aspect

```bash
rooyai generate "مدينة مستقبلية بالليل" --model qwen2 --aspect landscape
```

### توليد عبر موديل qwen1 بمقاس محدد

```bash
rooyai generate "شعار بسيط لمقهى" --model qwen1 --size 1792x1024
```

### توليد بنمط vertex (imagen4) مع vertexAspect و vertexResolution

```bash
rooyai generate "لوحة تجريدية ملونة" \
  --model vertex-imagen4 \
  --vertex-aspect 3:4 \
  --vertex-resolution 2K
```

### استقبال الصورة كبيانات ثنائية مباشرة (stream)

```bash
rooyai generate "غروب على الشاطئ" --stream --output ./out/beach.png
```

### تعديل صورة موجودة (رابط عام واحد كحد أقصى)

```bash
rooyai edit "أضف قوس قزح في السماء" \
  --image "https://example.com/photo.png" \
  --model vertex-gemini-edit \
  --output ./out/edited.png
```

### فحص حالة موديل معيّن (بأرخص طلب ممكن)

```bash
rooyai models-check --model ultra
```

هذا الأمر يجرّب طلباً بسيطاً على الموديل المحدد ويطبع حالته: يعمل، معطّل مؤقتاً
(403)، تجاوز حد الطلبات (429)، رصيد غير كافٍ (402)، أو خطأ آخر. **ملاحظة**: لأن
قائمة الأسعار الكاملة غير معلنة رسمياً، لا يمكن ضمان أن الطلب "الأرخص فعلياً"
لن يستهلك رصيداً — استخدم الأمر بحذر.

### تبديل لغة رسائل الواجهة إلى الإنجليزية

```bash
rooyai --lang en generate "a red sports car"
```

## استخدام العميل من كود بايثون

```python
from rooyai_client import Client

client = Client(api_key="ضع_مفتاحك_هنا")

result = client.generate("قطة تجلس على كرسي", model="ultra")
result.save("cat.png")

# تعديل صورة موجودة
edited = client.edit(
    "غيّر لون الخلفية إلى أزرق",
    images=["https://example.com/photo.png"],
    model="vertex-gemini-edit",
)
edited.save("edited.png")
```

## التعامل مع الأخطاء

كل كود استجابة من الـ API يُترجم إلى استثناء بايثون مخصص:

| الكود | الاستثناء                | المعنى                                                    |
| ----- | ------------------------- | ----------------------------------------------------------- |
| 400   | `InvalidRequestError`     | طلب خاطئ (باراميترات غير صحيحة)                              |
| 401   | `AuthenticationError`     | مفتاح API غير صالح                                         |
| 402   | `InsufficientCreditsError`| رصيد غير كافٍ                                              |
| 403   | `ModelUnavailableError`   | الموديل معطّل مؤقتاً، جرّب موديلاً آخر                       |
| 429   | `RateLimitedError`        | تجاوز حد الطلبات — العميل يعيد المحاولة تلقائياً مع احترام `Retry-After` قبل رفع هذا الاستثناء |
| 503   | `GenerationFailedError`   | فشل التوليد؛ الرصيد يُسترد تلقائياً بحسب توثيق الخدمة        |

```python
from rooyai_client import InsufficientCreditsError, ModelUnavailableError, RateLimitedError

try:
    result = client.generate("...", model="standard")
except InsufficientCreditsError:
    print("الرصيد غير كافٍ")
except ModelUnavailableError:
    print("جرّب موديلاً آخر")
except RateLimitedError as exc:
    print("انتظر", exc.retry_after, "ثانية")
```

## نقاط غير مؤكَّدة في توثيق الخدمة (مهم)

بعض تفاصيل الـ API لم تكن مؤكدة وقت بناء هذا العميل، وتم التعامل معها كما يلي
بدلاً من افتراضها في الكود:

1. **حد الطلبات في الدقيقة غير معلن رسمياً**: العميل يطبّق `retry` مع
   exponential backoff عند استجابة 429، ويحترم رأس `Retry-After` إن وُجد،
   ويعرض حدود الطلبات (`X-RateLimit-*`) إن أرسلها الخادم عبر `ImageResult.rate_limit`.
2. **سعر موديل `standard`**: مذكور في مصدرين مختلفين بقيمتين متضاربتين (5 أو 1
   كريدت). لم نثبّت أي رقم في الكود — راجع `rooyai_client/models.json` وتحقق من
   لوحة تحكم حسابك قبل الاعتماد على أي سعر.
3. **موديل التعديل**: يُذكر أحياناً باسم `flux2-klein-9b` وأحياناً
   `vertex-gemini-edit`. القيمة الافتراضية في هذه الحزمة هي `vertex-gemini-edit`
   (القيمة الأوضح في التوثيق المتاح)، وكلا الاسمين قابلان للتمرير كموديل عادي.
4. **قائمة الموديلات الكاملة غير متوفرة**: العميل لا يرفض أي اسم موديل، ويقبل
   أي نص تمرره في `--model`. القائمة الموجودة في `rooyai_client/models.json`
   إعلامية فقط وقابلة للتحديث بدون تعديل الكود.

## تشغيل الاختبارات

جميع الاختبارات تعمل بمحاكاة (mock) للشبكة ولا تستهلك أي رصيد فعلي:

```bash
pytest
```

اختبار التكامل الحقيقي (يستهلك رصيداً فعلياً) اختياري ومُعطَّل بشكل افتراضي،
ولا يعمل إلا بتمرير `--live` مع تعيين `ROOYAI_API_KEY`:

```bash
ROOYAI_API_KEY="مفتاحك" pytest --live tests/test_integration.py
```

## بنية الحزمة

```
rooyai-image-client/
├── rooyai_client/
│   ├── client.py       # RooyaiClient (Client) و ImageResult
│   ├── cli.py          # واجهة سطر الأوامر
│   ├── config.py        # تحميل الإعدادات من models.json
│   ├── exceptions.py     # الأخطاء المخصصة لكل كود استجابة
│   ├── i18n.py            # رسائل الواجهة (عربي/إنجليزي)
│   └── models.json         # أسماء الموديلات والملاحظات (قابل للتحديث بدون كود)
└── tests/
    ├── test_client.py    # اختبارات العميل (mock كامل للشبكة)
    ├── test_cli.py         # اختبارات سطر الأوامر
    └── test_integration.py  # اختبار تكامل حقيقي اختياري (--live فقط)
```

</div>
