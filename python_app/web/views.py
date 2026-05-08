from __future__ import annotations

from html import escape
from pathlib import Path

from data import CATEGORIES, scenarios_for_profile
from i18n import label, money, normalize_lang, t
from models import AnalysisResult, AnalyzedItem
from state import AppState


AGENT_PATHS = [
    ("Root Agent", "agent.py"),
    ("Trend Monitor", "agents/trend_monitor.py"),
    ("Inventory Watch", "agents/inventory_watch.py"),
    ("Buyer Agent", "agents/buyer_agent.py"),
    ("Waste Saver", "agents/waste_saver.py"),
    ("Control Agent", "agents/control_agent.py"),
    ("OptiFlow Brain", "agents/optiflow_brain.py"),
]


def h(value: object) -> str:
    return escape(str(value), quote=True)


def selected(current: str, value: str) -> str:
    return " selected" if current == value else ""


def render_page(state: AppState, result: AnalysisResult) -> str:
    lang = normalize_lang(state.lang)
    direction = "rtl" if lang == "ar" else "ltr"
    return f"""<!doctype html>
<html lang="{lang}" dir="{direction}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{h(t(lang, "title"))}</title>
    <link rel="stylesheet" href="/static/styles.css" />
  </head>
  <body data-lang="{lang}">
    <div class="shell">
      {render_header(state)}
      <main>
        {render_controls(state)}
        {render_kpis(lang, result)}
        {render_brain(lang, result)}
        <section class="two-col">
          {render_agents(lang, result)}
          {render_orders(lang, result)}
        </section>
        <section class="two-col">
          {render_data_help(lang, state, result)}
          {render_add_item_form(lang)}
        </section>
        {render_inventory(lang, result)}
        {render_agent_paths(lang)}
      </main>
    </div>
  </body>
</html>"""


def render_header(state: AppState) -> str:
    lang = normalize_lang(state.lang)
    profile = state.profile
    return f"""
<header class="topbar">
  <div class="brand">
    <div class="brand-mark">OF</div>
    <div>
      <h1>OptiFlow AI</h1>
      <p>{h(label(profile.name, lang))} - {h(label(profile.city, lang))}</p>
    </div>
  </div>
  <div class="status">
    <span class="dot"></span>
    <span>{h(t(lang, "live_mode"))}</span>
  </div>
</header>"""


def render_controls(state: AppState) -> str:
    lang = normalize_lang(state.lang)
    profile_options = "".join(
        f'<option value="{h(key)}"{selected(state.profile_key, key)}>{h(label(profile.name, lang))}</option>'
        for key, profile in state.profiles.items()
    )
    scenario_options = "".join(
        f'<option value="{h(scenario.id)}"{selected(state.scenario_id, scenario.id)}>{h(label(scenario.name, lang))}</option>'
        for scenario in scenarios_for_profile(state.profile_key)
    )
    return f"""
<section class="panel">
  <form class="control-grid" method="post" action="/settings">
    <label>{h(t(lang, "language"))}
      <select name="lang">
        <option value="ar"{selected(lang, "ar")}>العربية</option>
        <option value="en"{selected(lang, "en")}>English</option>
      </select>
    </label>
    <label>{h(t(lang, "business"))}
      <select name="profile_key">{profile_options}</select>
    </label>
    <label>{h(t(lang, "market_case"))}
      <select name="scenario_id">{scenario_options}</select>
    </label>
    <label>{h(t(lang, "decision_power"))}
      <input type="number" name="autonomy" min="30" max="95" value="{state.controls.autonomy}" />
    </label>
    <label>{h(t(lang, "demand_power"))}
      <input type="number" name="trend" min="0" max="100" value="{state.controls.trend}" />
    </label>
    <label>{h(t(lang, "budget"))}
      <input type="number" name="budget" min="1" value="{round(state.controls.budget)}" />
    </label>
    <label>{h(t(lang, "storage"))}
      <input type="number" name="storage" min="45" max="100" value="{state.controls.storage}" />
    </label>
    <button class="primary" type="submit">{h(t(lang, "save_settings"))}</button>
  </form>
</section>"""


def render_kpis(lang: str, result: AnalysisResult) -> str:
    return f"""
<section class="kpi-grid">
  <article class="kpi"><span>{h(t(lang, "stock_risk"))}</span><strong>{result.risk_count}</strong><small>{result.watch_count} {h(t(lang, "watch"))}</small></article>
  <article class="kpi"><span>{h(t(lang, "buy_value"))}</span><strong>{h(money(result.total_purchase, lang))}</strong><small>{h(t(lang, "budget"))}</small></article>
  <article class="kpi"><span>{h(t(lang, "waste_saved"))}</span><strong>{h(money(result.total_waste_prevented, lang))}</strong><small>{h(t(lang, "decision_waste"))}</small></article>
  <article class="kpi"><span>{h(t(lang, "readiness"))}</span><strong>{result.service_readiness}%</strong><small>{h(t(lang, "confidence"))} {result.confidence}%</small></article>
</section>"""


def render_brain(lang: str, result: AnalysisResult) -> str:
    inventory_percent = round((result.current_units / max(result.storage_limit, 1)) * 100)
    demand_lift = round((result.demand_multiplier - 1) * 100)
    return f"""
<section class="panel brain">
  <div class="panel-head">
    <div><span class="eyebrow">OptiFlow Brain</span><h2>{h(label(result.scenario.name, lang))}</h2></div>
    <span class="badge">{h(t(lang, "confidence"))} {result.confidence}%</span>
  </div>
  <p>{h(result.brain_summary)}</p>
  <div class="flow">
    <div><strong>{len(result.orders)}</strong><span>{h(t(lang, "supplier"))}</span></div>
    <div><strong>{inventory_percent}%</strong><span>{h(t(lang, "stock"))}</span></div>
    <div><strong>+{demand_lift}%</strong><span>{h(t(lang, "demand_power"))}</span></div>
  </div>
</section>"""


def render_agents(lang: str, result: AnalysisResult) -> str:
    cards = []
    for card in result.agent_cards:
        cards.append(
            f"""<article class="agent">
  <div class="agent-code">{h(card.code)}</div>
  <div><div class="agent-title"><strong>{h(t(lang, card.name_key))}</strong><span>{h(t(lang, card.state_key))}</span></div><p>{h(card.body)}</p></div>
</article>"""
        )
    return f"""<section class="panel"><div class="panel-head"><h2>{h(t(lang, "agents"))}</h2></div><div class="stack">{''.join(cards)}</div></section>"""


def render_orders(lang: str, result: AnalysisResult) -> str:
    if not result.orders:
        rows = f'<p class="empty">{h(t(lang, "no_orders"))}</p>'
    else:
        rows = "".join(
            f"""<article class="order {h(order.priority)}">
  <div><strong>{h(label(order.item_name, lang))}</strong><span>{h(t(lang, order.reason_key))}</span></div>
  <dl>
    <div><dt>{h(t(lang, "qty"))}</dt><dd>{order.qty:,} {h(label(order.unit, lang))}</dd></div>
    <div><dt>{h(t(lang, "supplier"))}</dt><dd>{h(label(order.supplier_name, lang))}</dd></div>
    <div><dt>{h(t(lang, "arrival"))}</dt><dd>{round(order.lead_hours)} {h(t(lang, "hour"))}</dd></div>
    <div><dt>{h(t(lang, "value"))}</dt><dd>{h(money(order.value, lang))}</dd></div>
  </dl>
</article>"""
            for order in result.orders
        )
    approve_button = f"""
<form method="post" action="/approve">
  <button class="primary" type="submit">{h(t(lang, "approve_orders"))}</button>
</form>""" if result.orders else ""
    return f"""<section class="panel"><div class="panel-head"><h2>{h(t(lang, "orders"))}</h2><span class="badge">{len(result.orders)}</span></div><div class="stack">{rows}</div>{approve_button}</section>"""


def render_data_help(lang: str, state: AppState, result: AnalysisResult) -> str:
    summary = t(
        lang,
        "profile_summary",
        business=label(result.profile.name, lang),
        city=label(result.profile.city, lang),
        items=len(result.profile.items),
    )
    items = "".join(
        f"<li>{h(t(lang, key))}</li>"
        for key in ["help_stock", "help_daily", "help_delivery", "help_reorder", "help_importance"]
    )
    return f"""<section class="panel"><h2>{h(t(lang, "data_help"))}</h2><p>{h(summary)}</p><ul class="help-list">{items}</ul><p class="note">{h(t(lang, "python_version_note"))}</p></section>"""


def render_add_item_form(lang: str) -> str:
    category_options = "".join(
        f'<option value="{h(key)}">{h(label(value, lang))}</option>'
        for key, value in CATEGORIES.items()
        if key != "custom"
    )
    return f"""
<section class="panel">
  <h2>{h(t(lang, "add_item"))}</h2>
  <form class="add-grid" method="post" action="/add-item">
    <label>{h(t(lang, "item_name"))}<input name="name" required /></label>
    <label>{h(t(lang, "category"))}<select name="category_key">{category_options}</select></label>
    <label>{h(t(lang, "unit"))}<input name="unit" value="{'كرتون' if lang == 'ar' else 'case'}" required /></label>
    <label>{h(t(lang, "stock"))}<input type="number" name="stock" value="50" min="0" required /></label>
    <label>{h(t(lang, "daily_need"))}<input type="number" name="daily_demand" value="10" min="1" required /></label>
    <label>{h(t(lang, "delivery_time"))}<input type="number" name="lead_time_hours" value="12" min="1" required /></label>
    <label>{h(t(lang, "shelf_life"))}<input type="number" name="shelf_life_days" value="30" min="1" required /></label>
    <label>{h(t(lang, "reorder_point"))}<input type="number" name="reorder_point" value="25" min="1" required /></label>
    <label>{h(t(lang, "unit_cost"))}<input type="number" name="unit_cost" value="10" min="0" step="0.1" required /></label>
    <label>{h(t(lang, "importance"))}<input type="number" name="sale_impact" value="30" min="1" max="100" required /></label>
    <button class="primary" type="submit">{h(t(lang, "add_item"))}</button>
  </form>
  <form method="post" action="/clear-items"><button class="ghost" type="submit">{h(t(lang, "clear_added"))}</button></form>
</section>"""


def render_inventory(lang: str, result: AnalysisResult) -> str:
    rows = "".join(render_inventory_row(lang, row) for row in result.items)
    return f"""
<section class="panel">
  <h2>{h(t(lang, "stock_list"))}</h2>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>{h(t(lang, "item"))}</th>
          <th>{h(t(lang, "category"))}</th>
          <th>{h(t(lang, "stock"))}</th>
          <th>{h(t(lang, "forecast_72h"))}</th>
          <th>{h(t(lang, "coverage"))}</th>
          <th>{h(t(lang, "status"))}</th>
          <th>{h(t(lang, "decision"))}</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  </div>
</section>"""


def render_inventory_row(lang: str, row: AnalyzedItem) -> str:
    category = CATEGORIES.get(row.item.category_key, CATEGORIES["custom"])
    decision = render_decision(lang, row)
    return f"""
<tr>
  <td><strong>{h(label(row.item.name, lang))}</strong></td>
  <td>{h(label(category, lang))}</td>
  <td>{round(row.item.stock):,} {h(label(row.item.unit, lang))}</td>
  <td>{round(row.seventy_two_hour_demand):,} {h(label(row.item.unit, lang))}</td>
  <td>{row.coverage_days:.1f} {h(t(lang, "day"))}</td>
  <td><span class="pill {h(row.status)}">{h(t(lang, row.status))}</span></td>
  <td>{decision}</td>
</tr>"""


def render_decision(lang: str, row: AnalyzedItem) -> str:
    if row.decision_key == "decision_buy" and row.supplier:
        return h(
            t(
                lang,
                "decision_buy",
                qty=f"{row.reorder_qty:,}",
                unit=label(row.item.unit, lang),
                supplier=label(row.supplier.name, lang),
            )
        )
    return h(t(lang, row.decision_key))


def render_agent_paths(lang: str) -> str:
    base = Path("python_app")
    rows = "".join(f"<li><strong>{h(name)}</strong><code>{h(str(base / path))}</code></li>" for name, path in AGENT_PATHS)
    return f"""<section class="panel"><h2>{h(t(lang, "agent_paths"))}</h2><ul class="path-list">{rows}</ul></section>"""
