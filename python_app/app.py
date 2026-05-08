from __future__ import annotations

from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from traceback import format_exc
from urllib.parse import parse_qs

from agents.optiflow_brain import OptiFlowBrain
from data import SUPPLIERS
from i18n import normalize_lang
from state import AppState
from web.views import render_page


ROOT = Path(__file__).resolve().parent
STATIC_ROOT = ROOT / "static"
STORAGE_PATH = ROOT / "storage" / "custom_items.json"
PORT = 4174

STATE = AppState(STORAGE_PATH)


class OptiFlowHandler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        try:
            if self.path.startswith("/static/"):
                self.serve_static()
                return
            self.serve_home()
        except Exception:
            self.send_text(format_exc(), HTTPStatus.INTERNAL_SERVER_ERROR)

    def do_POST(self) -> None:
        try:
            fields = self.read_form()
            if self.path == "/settings":
                self.handle_settings(fields)
            elif self.path == "/add-item":
                STATE.add_item(self.first_values(fields))
            elif self.path == "/clear-items":
                STATE.clear_custom_items()
            elif self.path == "/approve":
                result = self.analyze()
                STATE.approve_orders(result.orders)
            self.redirect("/")
        except Exception:
            self.send_text(format_exc(), HTTPStatus.INTERNAL_SERVER_ERROR)

    def serve_home(self) -> None:
        result = self.analyze()
        page = render_page(STATE, result)
        self.send_bytes(page.encode("utf-8"), "text/html; charset=utf-8")

    def serve_static(self) -> None:
        relative = self.path.replace("/static/", "", 1).split("?", 1)[0]
        target = (STATIC_ROOT / relative).resolve()
        if not str(target).startswith(str(STATIC_ROOT.resolve())) or not target.exists():
            self.send_text("Not found", HTTPStatus.NOT_FOUND)
            return
        content_type = "text/css; charset=utf-8" if target.suffix == ".css" else "application/octet-stream"
        self.send_bytes(target.read_bytes(), content_type)

    def handle_settings(self, fields: dict) -> None:
        values = self.first_values(fields)
        STATE.lang = normalize_lang(values.get("lang", STATE.lang))
        old_profile = STATE.profile_key
        STATE.set_profile(values.get("profile_key", STATE.profile_key))
        if STATE.profile_key == old_profile:
            STATE.set_scenario(values.get("scenario_id", STATE.scenario_id))
        else:
            STATE.set_scenario(values.get("scenario_id", STATE.scenario_id))
        STATE.controls.autonomy = self.to_int(values.get("autonomy"), STATE.controls.autonomy, 30, 95)
        STATE.controls.trend = self.to_int(values.get("trend"), STATE.controls.trend, 0, 100)
        STATE.controls.storage = self.to_int(values.get("storage"), STATE.controls.storage, 45, 100)
        STATE.controls.budget = self.to_float(values.get("budget"), STATE.controls.budget, 1)

    def analyze(self):
        return OptiFlowBrain(SUPPLIERS, STATE.lang).analyze(STATE.profile, STATE.scenario, STATE.controls)

    def read_form(self) -> dict:
        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length).decode("utf-8") if length else ""
        return parse_qs(raw)

    @staticmethod
    def first_values(fields: dict) -> dict:
        return {key: values[0] if values else "" for key, values in fields.items()}

    @staticmethod
    def to_int(value: object, fallback: int, minimum: int, maximum: int) -> int:
        try:
            parsed = int(float(str(value)))
        except (TypeError, ValueError):
            return fallback
        return max(minimum, min(maximum, parsed))

    @staticmethod
    def to_float(value: object, fallback: float, minimum: float) -> float:
        try:
            parsed = float(str(value))
        except (TypeError, ValueError):
            return fallback
        return max(minimum, parsed)

    def redirect(self, location: str) -> None:
        self.send_response(HTTPStatus.SEE_OTHER)
        self.send_header("Location", location)
        self.end_headers()

    def send_text(self, text: str, status: HTTPStatus = HTTPStatus.OK) -> None:
        self.send_response(status)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write(text.encode("utf-8"))

    def send_bytes(self, content: bytes, content_type: str) -> None:
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", content_type)
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(content)

    def log_message(self, format: str, *args: object) -> None:
        return


def main() -> None:
    server = ThreadingHTTPServer(("localhost", PORT), OptiFlowHandler)
    print(f"OptiFlow AI Python is running at http://localhost:{PORT}")
    server.serve_forever()


if __name__ == "__main__":
    main()
