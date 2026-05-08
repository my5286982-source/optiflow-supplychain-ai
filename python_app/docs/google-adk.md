# Google ADK Setup

## Arabic

تم تجهيز المشروع ليعمل مع Google ADK و Gemini.

### التثبيت

من مجلد `python_app`:

```bash
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

انسخ `.env.example` إلى `.env` وضع مفتاح Gemini:

```text
GOOGLE_GENAI_USE_VERTEXAI=FALSE
GOOGLE_API_KEY=YOUR_KEY
OPTIFLOW_ADK_MODEL=gemini-flash-latest
```

### تشغيل ADK CLI

من مجلد `OptiFlow-AI`:

```bash
adk run python_app
```

أو شغل:

```text
run_google_adk_cli.bat
```

### تشغيل ADK Web

من مجلد `OptiFlow-AI`:

```bash
adk web --port 8000
```

ثم افتح:

```text
http://localhost:8000
```

أو شغل:

```text
run_google_adk_web.bat
```

## English

The project is ready for Google ADK and Gemini.

### Install

From the `python_app` folder:

```bash
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Copy `.env.example` to `.env` and add your Gemini key:

```text
GOOGLE_GENAI_USE_VERTEXAI=FALSE
GOOGLE_API_KEY=YOUR_KEY
OPTIFLOW_ADK_MODEL=gemini-flash-latest
```

### Run ADK CLI

From the `OptiFlow-AI` folder:

```bash
adk run python_app
```

### Run ADK Web

From the `OptiFlow-AI` folder:

```bash
adk web --port 8000
```

Open:

```text
http://localhost:8000
```
