from __future__ import annotations

from typing import Dict, List

from adk_compat import create_agent
from adk_tools import run_optiflow_analysis
from models import AnalyzedItem, Controls, Order, Profile, Scenario, Supplier


class BuyerAgent:
    """Chooses suppliers and creates buy orders inside budget and storage limits."""

    def __init__(self, suppliers: Dict[str, Supplier]) -> None:
        self.suppliers = suppliers

    def attach_suppliers(self, rows: List[AnalyzedItem], profile: Profile, scenario: Scenario) -> None:
        for row in rows:
            supplier = self.best_supplier(row.item.suppliers or profile.default_suppliers, profile, scenario)
            row.supplier = supplier
            row.disrupted_lead_hours = supplier.base_lead_hours * (1 + scenario.disruption)
            row.unit_cost = row.item.unit_cost * supplier.price_index
            row.order_value = row.reorder_qty * row.unit_cost

    def build_orders(self, rows: List[AnalyzedItem], controls: Controls, available_space: float) -> List[Order]:
        purchase_rows = sorted(
            [row for row in rows if row.reorder_qty > 0 and row.status != "healthy"],
            key=self.urgency_score,
            reverse=True,
        )
        remaining_budget = controls.budget - controls.approved_value
        remaining_space = available_space
        orders: List[Order] = []

        for row in purchase_rows:
            if remaining_budget <= 0 or remaining_space <= 0 or not row.supplier:
                break
            affordable_qty = int(remaining_budget / max(row.unit_cost, 1))
            space_qty = int(remaining_space)
            qty = max(0, min(row.reorder_qty, affordable_qty, space_qty))
            if qty < 1:
                continue
            value = qty * row.unit_cost
            remaining_budget -= value
            remaining_space -= qty
            orders.append(
                Order(
                    item_id=row.item.id,
                    item_name=row.item.name,
                    category_key=row.item.category_key,
                    qty=qty,
                    unit=row.item.unit,
                    value=value,
                    supplier_name=row.supplier.name,
                    lead_hours=row.disrupted_lead_hours,
                    reason_key="reason_trend" if row.item_affected else "reason_safety",
                    priority=row.status,
                )
            )
        return orders

    def best_supplier(self, supplier_ids: List[str], profile: Profile, scenario: Scenario) -> Supplier:
        candidates = []
        fallback = self.suppliers[profile.default_suppliers[0]]
        for supplier_id in supplier_ids:
            supplier = self.suppliers.get(supplier_id, fallback)
            disrupted_lead = supplier.base_lead_hours * (1 + scenario.disruption)
            score = (
                supplier.reliability * 42
                + (1 / supplier.price_index) * 22
                + (1 / (disrupted_lead / 8)) * 18
                + supplier.sustainability * 10
                + (1 / (supplier.distance_km / 18)) * 8
            )
            candidates.append((score, supplier))
        return sorted(candidates, key=lambda pair: pair[0], reverse=True)[0][1]

    @staticmethod
    def urgency_score(row: AnalyzedItem) -> float:
        shortage_weight = row.reorder_qty * row.unit_cost
        coverage_weight = max(0, 6 - row.coverage_days) * 100
        impact_weight = row.item.sale_impact * 12
        return shortage_weight + coverage_weight + impact_weight


adk_agent = create_agent(
    name="buyer_agent",
    description="Suggests buy orders and supplier choices inside budget and storage limits.",
    instruction=(
        "You are Buyer Agent for OptiFlow AI. Focus on what to buy, quantity, supplier, arrival hours, and cost. "
        "Never ignore budget or storage limits. Use simple wording."
    ),
    tools=[run_optiflow_analysis],
)
