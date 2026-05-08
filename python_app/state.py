from __future__ import annotations

import json
from dataclasses import asdict
from pathlib import Path
from typing import Dict, List

from data import CATEGORIES, fresh_profiles, scenario_by_id, scenarios_for_profile
from models import Controls, Item, Profile


class AppState:
    """Holds the current demo state and custom items."""

    def __init__(self, storage_path: Path) -> None:
        self.storage_path = storage_path
        self.profiles: Dict[str, Profile] = fresh_profiles()
        self.lang = "ar"
        self.profile_key = "restaurant"
        self.scenario_id = scenarios_for_profile(self.profile_key)[0].id
        self.controls = Controls()
        self.load_custom_items()

    @property
    def profile(self) -> Profile:
        return self.profiles[self.profile_key]

    @property
    def scenario(self):
        return scenario_by_id(self.profile_key, self.scenario_id)

    def set_profile(self, profile_key: str) -> None:
        if profile_key in self.profiles:
            self.profile_key = profile_key
            self.scenario_id = scenarios_for_profile(profile_key)[0].id
            self.controls.approved_value = 0
            if profile_key == "fertilizerFactory":
                self.controls.budget = 360000
            else:
                self.controls.budget = 24000

    def set_scenario(self, scenario_id: str) -> None:
        self.scenario_id = scenario_by_id(self.profile_key, scenario_id).id

    def add_item(self, values: Dict[str, str]) -> None:
        category_key = values.get("category_key", "custom")
        if category_key not in CATEGORIES:
            category_key = "custom"
        item = Item(
            id=f"custom-{len(self.profile.items) + 1}-{int(self.controls.budget)}",
            name={"ar": values.get("name", "").strip(), "en": values.get("name", "").strip()},
            category_key=category_key,
            unit={"ar": values.get("unit", "").strip(), "en": values.get("unit", "").strip()},
            stock=self.to_float(values.get("stock"), 0),
            daily_demand=max(1, self.to_float(values.get("daily_demand"), 1)),
            lead_time_hours=max(1, self.to_float(values.get("lead_time_hours"), 8)),
            shelf_life_days=max(1, self.to_float(values.get("shelf_life_days"), 30)),
            reorder_point=max(1, self.to_float(values.get("reorder_point"), 1)),
            unit_cost=max(0.1, self.to_float(values.get("unit_cost"), 1)),
            sale_impact=max(1, min(100, self.to_float(values.get("sale_impact"), 30))),
            suppliers=list(self.profile.default_suppliers),
            custom=True,
        )
        if item.name["ar"] and item.unit["ar"]:
            self.profile.items.append(item)
            self.save_custom_items()

    def clear_custom_items(self) -> None:
        self.profile.items = [item for item in self.profile.items if not item.custom]
        self.save_custom_items()

    def approve_orders(self, orders) -> None:
        for order in orders:
            for item in self.profile.items:
                if item.id == order.item_id:
                    item.stock += order.qty
                    break
        self.controls.approved_value += sum(order.value for order in orders)
        self.save_custom_items()

    def load_custom_items(self) -> None:
        if not self.storage_path.exists():
            return
        try:
            saved = json.loads(self.storage_path.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            return
        for profile_key, rows in saved.items():
            if profile_key not in self.profiles or not isinstance(rows, list):
                continue
            self.profiles[profile_key].items.extend(self.item_from_dict(row) for row in rows if isinstance(row, dict))

    def save_custom_items(self) -> None:
        self.storage_path.parent.mkdir(parents=True, exist_ok=True)
        saved: Dict[str, List[dict]] = {}
        for profile_key, profile in self.profiles.items():
            saved[profile_key] = [asdict(item) for item in profile.items if item.custom]
        self.storage_path.write_text(json.dumps(saved, ensure_ascii=False, indent=2), encoding="utf-8")

    @staticmethod
    def item_from_dict(row: Dict[str, object]) -> Item:
        return Item(
            id=str(row.get("id", "custom")),
            name=dict(row.get("name", {"ar": "صنف", "en": "Item"})),
            category_key=str(row.get("category_key", "custom")),
            unit=dict(row.get("unit", {"ar": "وحدة", "en": "unit"})),
            stock=float(row.get("stock", 0)),
            daily_demand=float(row.get("daily_demand", 1)),
            lead_time_hours=float(row.get("lead_time_hours", 8)),
            shelf_life_days=float(row.get("shelf_life_days", 30)),
            reorder_point=float(row.get("reorder_point", 1)),
            unit_cost=float(row.get("unit_cost", 1)),
            sale_impact=float(row.get("sale_impact", 30)),
            suppliers=list(row.get("suppliers", [])),
            custom=True,
        )

    @staticmethod
    def to_float(value: object, fallback: float) -> float:
        try:
            parsed = float(value)
        except (TypeError, ValueError):
            return fallback
        return parsed if parsed >= 0 else fallback
