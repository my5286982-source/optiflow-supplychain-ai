from __future__ import annotations

import math
from typing import List

from adk_compat import create_agent
from adk_tools import run_optiflow_analysis
from models import AnalyzedItem, Controls, Profile, Scenario, TrendSignal


class InventoryWatch:
    """Calculates coverage, shortage, and stock risk for every item."""

    def evaluate(self, profile: Profile, scenario: Scenario, signal: TrendSignal, controls: Controls) -> List[AnalyzedItem]:
        rows: List[AnalyzedItem] = []
        for item in profile.items:
            item_affected = item.id in signal.affected_item_ids or item.category_key in signal.affected_categories
            adjusted_demand = item.daily_demand * (
                signal.demand_multiplier if item_affected else 1 + scenario.demand_lift * 0.15
            )
            lead_days = (item.lead_time_hours * (1 + scenario.disruption)) / 24
            target_days = 2.6 + controls.autonomy / 55
            target_stock = adjusted_demand * max(target_days, lead_days + 1.1)
            coverage_days = item.stock / max(adjusted_demand, 1)
            shortage = max(0, target_stock - item.stock)
            reorder_qty = math.ceil(shortage)
            seventy_two_hour_demand = adjusted_demand * 3
            spoilage_qty = max(0, item.stock - adjusted_demand * item.shelf_life_days * 0.82)
            spoilage_value = spoilage_qty * item.unit_cost

            status = "healthy"
            if coverage_days < lead_days + 0.65 or item.stock < item.reorder_point * 0.82:
                status = "critical"
            elif coverage_days < lead_days + 1.6 or item.stock < item.reorder_point or spoilage_value > 350:
                status = "watch"

            rows.append(
                AnalyzedItem(
                    item=item,
                    item_affected=item_affected,
                    adjusted_demand=adjusted_demand,
                    lead_days=lead_days,
                    target_stock=target_stock,
                    coverage_days=coverage_days,
                    reorder_qty=reorder_qty,
                    seventy_two_hour_demand=seventy_two_hour_demand,
                    spoilage_qty=spoilage_qty,
                    spoilage_value=spoilage_value,
                    status=status,
                )
            )
        return rows


adk_agent = create_agent(
    name="inventory_watch",
    description="Checks stock coverage, risk items, and reorder needs.",
    instruction=(
        "You are Inventory Watch for OptiFlow AI. Focus only on stock, coverage days, critical items, and reorder needs. "
        "Use the analysis tool when the user gives a business and market case. Keep the answer clear and short."
    ),
    tools=[run_optiflow_analysis],
)
