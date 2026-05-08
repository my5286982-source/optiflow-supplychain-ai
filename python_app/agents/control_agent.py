from __future__ import annotations

from typing import List, Tuple

from adk_compat import create_agent
from adk_tools import run_optiflow_analysis
from models import AnalyzedItem, Controls, Order, Profile, Scenario


class ControlAgent:
    """Balances storage, budget, and service readiness."""

    def storage_numbers(self, profile: Profile, controls: Controls) -> Tuple[float, float, float]:
        storage_limit = profile.capacity_units * (controls.storage / 100)
        current_units = sum(item.stock for item in profile.items)
        available_space = max(0, storage_limit - current_units)
        return storage_limit, current_units, available_space

    def readiness(self, rows: List[AnalyzedItem], orders: List[Order], controls: Controls) -> Tuple[int, int, int, int]:
        total_purchase = sum(order.value for order in orders)
        risk_count = sum(1 for row in rows if row.status == "critical")
        watch_count = sum(1 for row in rows if row.status == "watch")
        service_readiness = round(
            self.clamp(
                100
                - risk_count * 11
                - watch_count * 4
                + min(12, controls.autonomy / 8)
                - max(0, (total_purchase - controls.budget) / 1800),
                38,
                99,
            )
        )
        return service_readiness, risk_count, watch_count, round(total_purchase)

    def confidence(self, rows: List[AnalyzedItem], scenario: Scenario, controls: Controls) -> int:
        risk_count = sum(1 for row in rows if row.status == "critical")
        return round(self.clamp(76 + controls.autonomy / 6 - scenario.disruption * 24 - max(0, risk_count - 1) * 3, 61, 96))

    @staticmethod
    def clamp(value: float, minimum: float, maximum: float) -> float:
        return max(minimum, min(maximum, value))


adk_agent = create_agent(
    name="control_agent",
    description="Balances budget, storage space, confidence, and readiness.",
    instruction=(
        "You are Control Agent for OptiFlow AI. Check if the plan fits budget and storage. "
        "Explain readiness and confidence in very simple terms."
    ),
    tools=[run_optiflow_analysis],
)
