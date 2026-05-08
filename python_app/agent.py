from __future__ import annotations

import sys
from pathlib import Path


CURRENT_DIR = Path(__file__).resolve().parent
if str(CURRENT_DIR) not in sys.path:
    sys.path.insert(0, str(CURRENT_DIR))

from adk_compat import create_agent
from adk_tools import explain_agent_files, list_businesses, list_market_cases, run_optiflow_analysis
from agents.buyer_agent import adk_agent as buyer_agent
from agents.control_agent import adk_agent as control_agent
from agents.inventory_watch import adk_agent as inventory_watch
from agents.trend_monitor import adk_agent as trend_monitor
from agents.waste_saver import adk_agent as waste_saver


root_agent = create_agent(
    name="optiflow_ai",
    description="Multi-agent supply-chain planner for restaurant, grocery, and fertilizer factory operations.",
    instruction=(
        "You are OptiFlow AI. Help the user make simple stock and buying decisions. "
        "Ask for the business profile and market case if missing. Use tools before giving numbers. "
        "Coordinate the sub-agents: Trend Monitor, Inventory Watch, Buyer Agent, Waste Saver, and Control Agent. "
        "When the user writes Arabic, answer in clear Arabic. When the user writes English, answer in simple English."
    ),
    tools=[list_businesses, list_market_cases, run_optiflow_analysis, explain_agent_files],
    sub_agents=[trend_monitor, inventory_watch, buyer_agent, waste_saver, control_agent],
)
