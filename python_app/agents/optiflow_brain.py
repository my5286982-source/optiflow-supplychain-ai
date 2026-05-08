from __future__ import annotations

from typing import Dict, List

from adk_compat import create_agent
from adk_tools import explain_agent_files, list_businesses, list_market_cases, run_optiflow_analysis
from agents.buyer_agent import BuyerAgent
from agents.control_agent import ControlAgent
from agents.inventory_watch import InventoryWatch
from agents.trend_monitor import TrendMonitor
from agents.waste_saver import WasteSaver
from i18n import label, money, t
from models import AgentCard, AnalysisResult, Controls, Profile, Scenario, Supplier


class OptiFlowBrain:
    """Coordinates all agents and returns one decision result."""

    def __init__(self, suppliers: Dict[str, Supplier], lang: str = "ar") -> None:
        self.lang = lang
        self.trend_monitor = TrendMonitor()
        self.inventory_watch = InventoryWatch()
        self.buyer_agent = BuyerAgent(suppliers)
        self.waste_saver = WasteSaver()
        self.control_agent = ControlAgent()

    def analyze(self, profile: Profile, scenario: Scenario, controls: Controls) -> AnalysisResult:
        signal = self.trend_monitor.analyze(scenario, controls)
        storage_limit, current_units, available_space = self.control_agent.storage_numbers(profile, controls)
        rows = self.inventory_watch.evaluate(profile, scenario, signal, controls)
        self.buyer_agent.attach_suppliers(rows, profile, scenario)
        total_waste = self.waste_saver.apply(rows, controls)
        orders = self.buyer_agent.build_orders(rows, controls, available_space)
        service_readiness, risk_count, watch_count, _ = self.control_agent.readiness(rows, orders, controls)
        confidence = self.control_agent.confidence(rows, scenario, controls)
        total_purchase = sum(order.value for order in orders)
        top_row = sorted(rows, key=self.buyer_agent.urgency_score, reverse=True)[0] if rows else None
        brain_summary = self.summary(profile, scenario, available_space, top_row)
        agent_cards = self.agent_cards(signal.demand_multiplier, scenario, risk_count, watch_count, orders, total_purchase, total_waste)

        return AnalysisResult(
            profile=profile,
            scenario=scenario,
            controls=controls,
            demand_multiplier=signal.demand_multiplier,
            storage_limit=storage_limit,
            current_units=current_units,
            available_space=available_space,
            items=rows,
            orders=orders,
            total_purchase=total_purchase,
            total_waste_prevented=total_waste,
            risk_count=risk_count,
            watch_count=watch_count,
            service_readiness=service_readiness,
            confidence=confidence,
            brain_summary=brain_summary,
            agent_cards=agent_cards,
        )

    def summary(self, profile: Profile, scenario: Scenario, available_space: float, top_row: object) -> str:
        item_name = label(top_row.item.name, self.lang) if top_row else "-"
        if self.lang == "en":
            return f"{label(scenario.note, self.lang)} First action: watch {item_name}. Free space is about {round(available_space):,} units."
        return f"{label(scenario.note, self.lang)} القرار الأول: متابعة {item_name}. المساحة المتاحة تقريبا {round(available_space):,} وحدة."

    def agent_cards(
        self,
        demand_multiplier: float,
        scenario: Scenario,
        risk_count: int,
        watch_count: int,
        orders: List[object],
        total_purchase: float,
        total_waste: float,
    ) -> List[AgentCard]:
        demand_lift = round((demand_multiplier - 1) * 100)
        if self.lang == "en":
            trend_body = f"Demand is up {demand_lift}% because of {label(scenario.name, self.lang)}."
            inventory_body = f"{risk_count} risk items and {watch_count} watch items."
            buyer_body = f"{len(orders)} buy orders worth {money(total_purchase, self.lang)}." if orders else "No urgent buy orders now."
            waste_body = f"Possible waste saving: {money(total_waste, self.lang)}."
            control_body = "Checked budget and storage before suggesting orders."
        else:
            trend_body = f"توقع الطلب ارتفع {demand_lift}% بسبب {label(scenario.name, self.lang)}."
            inventory_body = f"{risk_count} صنف حرج و {watch_count} صنف يحتاج متابعة."
            buyer_body = f"{len(orders)} طلب شراء بقيمة {money(total_purchase, self.lang)}." if orders else "لا توجد طلبات شراء عاجلة الآن."
            waste_body = f"يمكن تقليل هدر بقيمة {money(total_waste, self.lang)}."
            control_body = "تمت موازنة الميزانية والسعة قبل اقتراح الشراء."

        return [
            AgentCard("TM", "trend_monitor", "watching", trend_body),
            AgentCard("IW", "inventory_watch", "alert" if risk_count else "stable", inventory_body),
            AgentCard("BA", "buyer_agent", "buying" if orders else "waiting", buyer_body),
            AgentCard("WS", "waste_saver", "saving" if total_waste else "watching", waste_body),
            AgentCard("CA", "control_agent", "control", control_body),
        ]


adk_agent = create_agent(
    name="optiflow_brain",
    description="Main coordinator for OptiFlow AI supply-chain decisions.",
    instruction=(
        "You are OptiFlow Brain, the main coordinator. Choose the right business and market case, "
        "run the OptiFlow analysis tool, then summarize the decision. Mention risk items, buy orders, "
        "waste saving, readiness, and the next action. Use simple Arabic when the user writes Arabic, "
        "and simple English when the user writes English."
    ),
    tools=[list_businesses, list_market_cases, run_optiflow_analysis, explain_agent_files],
)
