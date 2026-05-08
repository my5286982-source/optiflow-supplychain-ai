from __future__ import annotations

from typing import Dict, List

from data import CATEGORIES, SUPPLIERS, fresh_profiles, scenario_by_id, scenarios_for_profile
from i18n import label, money, normalize_lang
from models import Controls


def list_businesses(lang: str = "ar") -> Dict[str, object]:
    """Return available OptiFlow business profiles."""

    lang = normalize_lang(lang)
    profiles = fresh_profiles()
    return {
        "businesses": [
            {"id": key, "name": label(profile.name, lang), "city": label(profile.city, lang)}
            for key, profile in profiles.items()
        ]
    }


def list_market_cases(profile_key: str = "restaurant", lang: str = "ar") -> Dict[str, object]:
    """Return market cases that match one business profile."""

    lang = normalize_lang(lang)
    return {
        "profile_key": profile_key,
        "market_cases": [
            {"id": scenario.id, "name": label(scenario.name, lang), "note": label(scenario.note, lang)}
            for scenario in scenarios_for_profile(profile_key)
        ],
    }


def run_optiflow_analysis(
    profile_key: str = "restaurant",
    scenario_id: str = "",
    autonomy: int = 70,
    trend: int = 68,
    budget: float = 24000,
    storage: int = 78,
    lang: str = "ar",
) -> Dict[str, object]:
    """Run the full OptiFlow decision flow and return a compact result."""

    from agents.optiflow_brain import OptiFlowBrain

    lang = normalize_lang(lang)
    profiles = fresh_profiles()
    if profile_key not in profiles:
        profile_key = "restaurant"
    profile = profiles[profile_key]
    if not scenario_id:
        scenario_id = scenarios_for_profile(profile_key)[0].id
    scenario = scenario_by_id(profile_key, scenario_id)
    if profile_key == "fertilizerFactory" and budget == 24000:
        budget = 360000

    controls = Controls(
        autonomy=max(30, min(95, int(autonomy))),
        trend=max(0, min(100, int(trend))),
        budget=max(1, float(budget)),
        storage=max(45, min(100, int(storage))),
    )
    result = OptiFlowBrain(SUPPLIERS, lang).analyze(profile, scenario, controls)

    return {
        "business": label(profile.name, lang),
        "market_case": label(scenario.name, lang),
        "summary": result.brain_summary,
        "risk_count": result.risk_count,
        "watch_count": result.watch_count,
        "buying_value": money(result.total_purchase, lang),
        "waste_saved": money(result.total_waste_prevented, lang),
        "readiness": f"{result.service_readiness}%",
        "confidence": f"{result.confidence}%",
        "orders": [
            {
                "item": label(order.item_name, lang),
                "qty": order.qty,
                "unit": label(order.unit, lang),
                "supplier": label(order.supplier_name, lang),
                "value": money(order.value, lang),
                "arrival_hours": round(order.lead_hours),
                "priority": order.priority,
            }
            for order in result.orders
        ],
        "critical_items": [
            {
                "item": label(row.item.name, lang),
                "category": label(CATEGORIES.get(row.item.category_key, CATEGORIES["custom"]), lang),
                "stock": round(row.item.stock),
                "coverage_days": round(row.coverage_days, 1),
                "reorder_qty": row.reorder_qty,
            }
            for row in result.items
            if row.status == "critical"
        ],
    }


def calculate_demand_signal(profile_key: str = "restaurant", scenario_id: str = "", trend: int = 68, lang: str = "ar") -> Dict[str, object]:
    """Return the demand lift for the selected business and market case."""

    lang = normalize_lang(lang)
    if not scenario_id:
        scenario_id = scenarios_for_profile(profile_key)[0].id
    scenario = scenario_by_id(profile_key, scenario_id)
    demand_multiplier = 1 + scenario.demand_lift * (max(0, min(100, int(trend))) / 100)
    return {
        "market_case": label(scenario.name, lang),
        "demand_lift_percent": round((demand_multiplier - 1) * 100),
        "affected_categories": scenario.affected_categories,
        "affected_items": scenario.affected_item_ids,
        "note": label(scenario.note, lang),
    }


def explain_agent_files() -> Dict[str, List[Dict[str, str]]]:
    """Return clear paths for every Google ADK agent file."""

    return {
        "agents": [
            {"agent": "Trend Monitor", "path": "python_app/agents/trend_monitor.py"},
            {"agent": "Inventory Watch", "path": "python_app/agents/inventory_watch.py"},
            {"agent": "Buyer Agent", "path": "python_app/agents/buyer_agent.py"},
            {"agent": "Waste Saver", "path": "python_app/agents/waste_saver.py"},
            {"agent": "Control Agent", "path": "python_app/agents/control_agent.py"},
            {"agent": "OptiFlow Brain", "path": "python_app/agents/optiflow_brain.py"},
        ]
    }
