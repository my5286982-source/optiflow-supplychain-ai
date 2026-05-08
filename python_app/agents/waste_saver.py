from __future__ import annotations

from typing import List

from adk_compat import create_agent
from adk_tools import run_optiflow_analysis
from models import AnalyzedItem, Controls


class WasteSaver:
    """Estimates waste savings and sets a simple action key for every item."""

    def apply(self, rows: List[AnalyzedItem], controls: Controls) -> float:
        total = 0.0
        for row in rows:
            row.waste_saving = self.waste_saving(row, controls)
            total += row.waste_saving
            if row.status == "critical" and row.reorder_qty > 0:
                row.decision_key = "decision_buy"
            elif row.spoilage_value > 350:
                row.decision_key = "decision_waste"
            elif row.status == "watch":
                row.decision_key = "decision_watch"
            else:
                row.decision_key = "decision_none"
        return total

    @staticmethod
    def waste_saving(row: AnalyzedItem, controls: Controls) -> float:
        if row.spoilage_value <= 250:
            return 0
        return row.spoilage_value * (controls.autonomy / 100) * 0.68


adk_agent = create_agent(
    name="waste_saver",
    description="Finds possible waste savings and simple actions to reduce waste.",
    instruction=(
        "You are Waste Saver for OptiFlow AI. Focus on waste risk, expiry risk, discount suggestions, and reuse options. "
        "Keep the answer practical."
    ),
    tools=[run_optiflow_analysis],
)
