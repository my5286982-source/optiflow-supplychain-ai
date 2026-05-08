# OptiFlow AI Python

هذه نسخة Python كاملة من مشروع OptiFlow AI. كل Agent موجود في ملف Python مستقل، وتم تجهيز كل ملف ليصدر `adk_agent` يعمل مع Google ADK.

الواجهة المحلية في `app.py` لا تحتاج Flask أو FastAPI أو Streamlit. أما تشغيل Google ADK فيحتاج تثبيت `google-adk` ومفتاح Gemini.

## التشغيل

من داخل مجلد `python_app`:

```bash
python app.py
```

ثم افتح:

```text
http://localhost:4174
```

على Windows يمكنك تشغيل:

```text
run_optiflow_python.bat
```

## تشغيل Google ADK

ثبت الحزمة:

```bash
pip install -r requirements.txt
```

انسخ `.env.example` إلى `.env` وضع مفتاح Gemini.

من مجلد `OptiFlow-AI`:

```bash
adk run python_app
```

أو:

```bash
adk web --port 8000
```

ثم افتح:

```text
http://localhost:8000
```

## مسارات الإيجنتات

```text
python_app/agents/trend_monitor.py
python_app/agents/inventory_watch.py
python_app/agents/buyer_agent.py
python_app/agents/waste_saver.py
python_app/agents/control_agent.py
python_app/agents/optiflow_brain.py
python_app/agent.py
```

## مسؤولية كل Agent

- `trend_monitor.py`: يحول حالة السوق إلى توقع طلب.
- `inventory_watch.py`: يحسب التغطية والخطر وحد إعادة الطلب.
- `buyer_agent.py`: يختار المورد ويبني طلبات الشراء حسب الميزانية والسعة.
- `waste_saver.py`: يحسب الهدر المتوقع ويقترح الإجراء المناسب.
- `control_agent.py`: يوازن الميزانية والسعة وجاهزية العمل.
- `optiflow_brain.py`: ينسق جميع الوكلاء ويخرج القرار النهائي.
- `agent.py`: يحتوي `root_agent` الرسمي لـ Google ADK.

## ملفات مهمة

```text
python_app/app.py              السيرفر الرئيسي
python_app/data.py             بيانات الأنشطة والأصناف والموردين والحالات
python_app/models.py           نماذج البيانات
python_app/i18n.py             نصوص العربي والإنجليزي ورمز الريال الجديد
python_app/state.py            حالة التطبيق وحفظ الأصناف المضافة
python_app/web/views.py        توليد واجهة HTML من Python
python_app/static/styles.css   التصميم
python_app/storage/            حفظ الأصناف المضافة
python_app/adk_tools.py        أدوات ADK التي يستدعيها Gemini
python_app/adk_compat.py       توافق آمن إذا لم تكن google-adk مثبتة
```

## المميزات المنقولة

- اختيار النشاط: مطعم، بقالة، مصنع أسمدة الخرج.
- حالات سوق مختلفة حسب النشاط.
- اللغة العربية والإنجليزية.
- رمز الريال السعودي الجديد.
- إضافة صنف جديد.
- اعتماد طلبات الشراء وتحديث المخزون.
- عرض مسارات الإيجنتات داخل الواجهة.
