from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, List, Optional


Label = Dict[str, str]


@dataclass
class Supplier:
    id: str
    name: Label
    specialty: Label
    reliability: float
    base_lead_hours: float
    price_index: float
    min_order: float
    distance_km: float
    sustainability: float


@dataclass
class Item:
    id: str
    name: Label
    category_key: str
    unit: Label
    stock: float
    daily_demand: float
    lead_time_hours: float
    shelf_life_days: float
    reorder_point: float
    unit_cost: float
    sale_impact: float
    suppliers: List[str]
    custom: bool = False


@dataclass
class Scenario:
    id: str
    name: Label
    profile_keys: List[str]
    demand_lift: float
    affected_categories: List[str]
    affected_item_ids: List[str]
    disruption: float
    note: Label


@dataclass
class Profile:
    id: str
    name: Label
    city: Label
    capacity_units: float
    baseline_storage_use: float
    default_suppliers: List[str]
    items: List[Item] = field(default_factory=list)


@dataclass
class Controls:
    autonomy: int = 70
    trend: int = 68
    budget: float = 24000
    storage: int = 78
    approved_value: float = 0


@dataclass
class TrendSignal:
    demand_multiplier: float
    affected_categories: List[str]
    affected_item_ids: List[str]
    note: Label


@dataclass
class AnalyzedItem:
    item: Item
    item_affected: bool
    adjusted_demand: float
    lead_days: float
    target_stock: float
    coverage_days: float
    reorder_qty: int
    seventy_two_hour_demand: float
    spoilage_qty: float
    spoilage_value: float
    status: str
    supplier: Optional[Supplier] = None
    disrupted_lead_hours: float = 0
    unit_cost: float = 0
    order_value: float = 0
    waste_saving: float = 0
    decision_key: str = "decision_none"


@dataclass
class Order:
    item_id: str
    item_name: Label
    category_key: str
    qty: int
    unit: Label
    value: float
    supplier_name: Label
    lead_hours: float
    reason_key: str
    priority: str


@dataclass
class AgentCard:
    code: str
    name_key: str
    state_key: str
    body: str


@dataclass
class AnalysisResult:
    profile: Profile
    scenario: Scenario
    controls: Controls
    demand_multiplier: float
    storage_limit: float
    current_units: float
    available_space: float
    items: List[AnalyzedItem]
    orders: List[Order]
    total_purchase: float
    total_waste_prevented: float
    risk_count: int
    watch_count: int
    service_readiness: int
    confidence: int
    brain_summary: str
    agent_cards: List[AgentCard]
