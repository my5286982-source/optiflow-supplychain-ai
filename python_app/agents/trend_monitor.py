from __future__ import annotations

from adk_compat import create_agent
from adk_tools import calculate_demand_signal, list_market_cases
from models import Controls, Scenario, TrendSignal


class TrendMonitor:
    """Reads the selected market case and turns it into a demand signal."""

    def analyze(self, scenario: Scenario, controls: Controls) -> TrendSignal:
        demand_multiplier = 1 + scenario.demand_lift * (controls.trend / 100)
        return TrendSignal(
            demand_multiplier=demand_multiplier,
            affected_categories=list(scenario.affected_categories),
            affected_item_ids=list(scenario.affected_item_ids),
            note=scenario.note,
        )


adk_agent = create_agent(
    name="trend_monitor",
    description="Watches business market cases and explains demand changes.",
    instruction=(
        "You are Trend Monitor for OptiFlow AI. Use simple Arabic or simple English. "
        "Your job is to read the selected business and market case, then explain which demand signal changed and why. "
        "Do not create buy orders."
    ),
    tools=[list_market_cases, calculate_demand_signal],
)
