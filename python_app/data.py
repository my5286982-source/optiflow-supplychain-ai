from __future__ import annotations

from copy import deepcopy
from typing import Dict, List

from models import Item, Profile, Scenario, Supplier


def l(ar: str, en: str) -> dict:
    return {"ar": ar, "en": en}


CATEGORIES = {
    "meals": l("وجبات", "Meals"),
    "drinks": l("مشروبات", "Drinks"),
    "fast": l("سريع البيع", "Fast items"),
    "basics": l("أساسيات", "Basics"),
    "sweets": l("حلويات", "Sweets"),
    "cooling": l("تبريد", "Cold items"),
    "vegetables": l("خضار", "Vegetables"),
    "packaging": l("تغليف", "Packing"),
    "raw": l("مواد خام", "Raw material"),
    "production": l("إنتاج", "Production"),
    "safety": l("سلامة", "Safety"),
    "maintenance": l("صيانة", "Maintenance"),
    "custom": l("مخصص", "Custom"),
}


SUPPLIERS: Dict[str, Supplier] = {
    "s1": Supplier("s1", l("برودة نجد", "Najd Cold Supply"), l("تبريد", "Cold supply"), 0.94, 10, 1.06, 900, 18, 0.72),
    "s2": Supplier("s2", l("مزارع الوادي", "Valley Farms"), l("طازج", "Fresh food"), 0.88, 9, 0.94, 600, 24, 0.86),
    "s3": Supplier("s3", l("توزيع السدرة", "Sidra Distribution"), l("مشروبات وأساسي", "Drinks and basics"), 0.91, 12, 0.98, 800, 31, 0.68),
    "s4": Supplier("s4", l("أسواق الجملة الأولى", "First Wholesale"), l("مواد جافة", "Dry goods"), 0.84, 18, 0.89, 1200, 42, 0.63),
    "s5": Supplier("s5", l("سريع التبريد", "Fast Cold Delivery"), l("طوارئ", "Urgent delivery"), 0.97, 7, 1.18, 500, 14, 0.59),
    "s6": Supplier("s6", l("تعاونية الجنوب", "South Cooperative"), l("متنوع", "Mixed goods"), 0.86, 15, 0.93, 650, 28, 0.90),
    "s7": Supplier("s7", l("كيماويات الخليج", "Gulf Chemicals"), l("مواد خام", "Raw chemicals"), 0.90, 28, 1.02, 18000, 86, 0.66),
    "s8": Supplier("s8", l("لوجستيات الخرج الصناعية", "Kharj Industrial Logistics"), l("مصانع", "Factory supply"), 0.93, 18, 1.07, 12000, 16, 0.74),
    "s9": Supplier("s9", l("تعاونية المزارع", "Farmers Cooperative"), l("أسمدة وزراعة", "Farming goods"), 0.87, 24, 0.95, 9000, 38, 0.91),
}


SCENARIOS: List[Scenario] = [
    Scenario("match-night", l("ليلة مباراة", "Match night"), ["restaurant"], 0.36, ["meals", "drinks", "fast"], ["chicken", "rice", "cola", "water", "bread"], 0.08, l("طلب أعلى على الوجبات والمشروبات خلال ساعات قليلة.", "More demand for meals and drinks in a short time.")),
    Scenario("viral-dish", l("ترند وصفة", "Food trend"), ["restaurant"], 0.42, ["meals", "vegetables", "basics"], ["rice", "chicken", "tomato", "spices"], 0.05, l("ترند محلي يرفع الطلب على مكونات محددة.", "A local trend increases demand for specific ingredients.")),
    Scenario("restaurant-delivery-rush", l("حملة تطبيقات التوصيل", "Delivery app rush"), ["restaurant"], 0.31, ["meals", "packaging", "drinks"], ["packaging", "water", "cola", "chicken", "rice"], 0.06, l("خصم في تطبيقات التوصيل يرفع الطلب على الوجبات والتغليف.", "A delivery app offer increases demand for meals and packing.")),
    Scenario("restaurant-chilled-delay", l("تأخر مواد مبردة", "Cold item delay"), ["restaurant"], 0.10, ["cooling", "meals", "vegetables"], ["chicken", "yogurt", "tomato"], 0.30, l("تأخر مورد المواد المبردة؛ يجب تأمين بديل سريع.", "Cold supply is late; prepare a fast backup supplier.")),
    Scenario("grocery-salary-week", l("أسبوع الرواتب", "Salary week"), ["grocery"], 0.24, ["basics", "sweets", "drinks"], ["milk", "eggs", "coffee", "dates", "water-g"], 0.03, l("زيادة شراء العائلات للمواد الأساسية والحلويات.", "Families buy more basics, sweets, and drinks.")),
    Scenario("grocery-school-week", l("عودة المدارس", "School week"), ["grocery"], 0.28, ["fast", "basics", "drinks"], ["bread", "milk", "eggs", "water-g"], 0.04, l("عودة المدارس ترفع طلب الإفطار السريع والمياه.", "School week increases demand for quick breakfast and water.")),
    Scenario("grocery-heat-wave", l("موجة حر", "Hot weather"), ["grocery"], 0.30, ["drinks", "cooling"], ["water-g", "milk"], 0.09, l("الحرارة ترفع طلب المياه والمنتجات المبردة.", "Hot weather increases water and cold item demand.")),
    Scenario("grocery-dairy-delay", l("تأخر مورد الألبان", "Dairy delay"), ["grocery"], 0.08, ["cooling", "basics"], ["milk", "eggs"], 0.28, l("تأخر مورد الألبان والبيض؛ النظام يرفع هامش الأمان.", "Milk and egg supply is late, so the system adds safety stock.")),
    Scenario("farm-season", l("موسم زراعة", "Farm season"), ["fertilizerFactory"], 0.38, ["raw", "production", "packaging"], ["urea", "npk", "bags", "pallets"], 0.07, l("المزارع تطلب أسمدة أكثر قبل موسم الزراعة.", "Farms need more fertilizer before planting season.")),
    Scenario("raw-material-delay", l("تأخر خامات", "Material delay"), ["fertilizerFactory"], 0.12, ["raw", "production"], ["ammonia", "phosphate", "potassium"], 0.35, l("تأخر مواد خام؛ يجب تأمين بدائل قبل توقف الخط.", "Raw material is late; secure backup before the line stops.")),
    Scenario("factory-maintenance", l("توقف صيانة قريب", "Maintenance stop"), ["fertilizerFactory"], 0.18, ["maintenance", "safety", "packaging"], ["pallets", "safety-masks", "bags"], 0.18, l("صيانة قريبة قد تؤخر التعبئة؛ يجب تجهيز التغليف والسلامة.", "Upcoming maintenance may slow packing; prepare packing and safety items.")),
    Scenario("factory-bulk-order", l("طلب مزارع كبير", "Large farm order"), ["fertilizerFactory"], 0.44, ["production", "packaging"], ["urea", "npk", "bags", "pallets"], 0.05, l("طلب كبير من مزارع المنطقة يرفع احتياج الإنتاج والتغليف.", "A large farm order increases production and packing needs.")),
]


def item(
    id_: str,
    ar: str,
    en: str,
    category_key: str,
    unit_ar: str,
    unit_en: str,
    stock: float,
    daily: float,
    lead: float,
    shelf: float,
    reorder: float,
    cost: float,
    impact: float,
    suppliers: List[str],
) -> Item:
    return Item(id_, l(ar, en), category_key, l(unit_ar, unit_en), stock, daily, lead, shelf, reorder, cost, impact, suppliers)


PROFILES: Dict[str, Profile] = {
    "restaurant": Profile(
        "restaurant",
        l("مطعم رز وبهارات", "Rice & Spice Restaurant"),
        l("الرياض", "Riyadh"),
        1280,
        0.61,
        ["s3", "s6"],
        [
            item("chicken", "دجاج مبرد", "Chilled chicken", "meals", "كجم", "kg", 186, 72, 18, 4, 150, 18, 42, ["s1", "s2", "s5"]),
            item("rice", "أرز بسمتي", "Basmati rice", "basics", "كجم", "kg", 340, 94, 16, 90, 260, 7, 24, ["s3", "s4"]),
            item("tomato", "طماطم", "Tomato", "vegetables", "كجم", "kg", 112, 38, 12, 3, 90, 5, 15, ["s2", "s6"]),
            item("spices", "بهارات كبسة", "Kabsa spices", "basics", "كجم", "kg", 28, 7, 20, 160, 24, 31, 18, ["s4", "s6"]),
            item("yogurt", "لبن", "Laban", "cooling", "لتر", "liter", 140, 34, 14, 5, 92, 4.2, 11, ["s1", "s5"]),
            item("water", "مياه", "Water", "drinks", "كرتون", "case", 92, 40, 10, 180, 120, 9, 13, ["s3", "s6"]),
            item("cola", "مشروبات غازية", "Soft drinks", "drinks", "كرتون", "case", 76, 29, 15, 150, 84, 22, 17, ["s3", "s5"]),
            item("packaging", "عبوات سفري", "Takeaway boxes", "packaging", "حزمة", "pack", 210, 72, 22, 365, 180, 12, 10, ["s4", "s6"]),
        ],
    ),
    "grocery": Profile(
        "grocery",
        l("بقالة الحي الذكية", "Smart Corner Grocery"),
        l("الخرج", "Al Kharj"),
        1680,
        0.56,
        ["s3", "s6"],
        [
            item("milk", "حليب طازج", "Fresh milk", "cooling", "كرتون", "case", 96, 44, 12, 5, 110, 21, 19, ["s1", "s5"]),
            item("bread", "خبز برجر", "Burger bread", "fast", "كيس", "bag", 88, 36, 8, 3, 76, 3, 9, ["s2", "s6"]),
            item("eggs", "بيض", "Eggs", "basics", "طبق", "tray", 140, 42, 14, 14, 118, 15, 15, ["s1", "s3"]),
            item("water-g", "مياه", "Water", "drinks", "كرتون", "case", 130, 55, 10, 180, 150, 9, 11, ["s3", "s6"]),
            item("dates", "تمر سكري", "Dates", "sweets", "علبة", "box", 74, 18, 24, 120, 70, 18, 20, ["s4", "s6"]),
            item("rice-g", "أرز بسمتي", "Basmati rice", "basics", "كيس", "bag", 80, 19, 18, 180, 82, 31, 18, ["s3", "s4"]),
            item("coffee", "قهوة عربية", "Arabic coffee", "sweets", "علبة", "tin", 52, 12, 20, 220, 42, 23, 22, ["s4", "s6"]),
            item("cleaners", "منظفات", "Cleaners", "basics", "كرتون", "case", 44, 8, 26, 365, 34, 38, 12, ["s4", "s6"]),
        ],
    ),
    "fertilizerFactory": Profile(
        "fertilizerFactory",
        l("مصنع أسمدة الخرج", "Al Kharj Fertilizer Plant"),
        l("الخرج", "Al Kharj"),
        30000,
        0.68,
        ["s7", "s8", "s9"],
        [
            item("ammonia", "أمونيا", "Ammonia", "raw", "طن", "ton", 260, 95, 26, 365, 240, 1800, 70, ["s7", "s8"]),
            item("phosphate", "صخر فوسفات", "Phosphate rock", "raw", "طن", "ton", 340, 110, 36, 720, 320, 620, 55, ["s7", "s9"]),
            item("potassium", "كلوريد بوتاسيوم", "Potassium chloride", "raw", "طن", "ton", 180, 58, 30, 720, 170, 940, 44, ["s7", "s8"]),
            item("urea", "يوريا محببة", "Urea bags", "production", "طن", "ton", 420, 135, 18, 365, 390, 1350, 65, ["s8", "s9"]),
            item("npk", "سماد NPK", "NPK fertilizer", "production", "طن", "ton", 260, 96, 22, 365, 250, 1560, 62, ["s8", "s9"]),
            item("bags", "أكياس تعبئة", "Packing bags", "packaging", "كيس", "bag", 18500, 7200, 20, 365, 16000, 1.4, 38, ["s6", "s8"]),
            item("pallets", "طبليات تحميل", "Pallets", "packaging", "منصة", "pallet", 520, 170, 18, 365, 480, 38, 25, ["s6", "s8"]),
            item("safety-masks", "كمامات سلامة", "Safety masks", "safety", "صندوق", "box", 44, 9, 12, 365, 38, 90, 22, ["s8", "s9"]),
        ],
    ),
}


def fresh_profiles() -> Dict[str, Profile]:
    return deepcopy(PROFILES)


def scenarios_for_profile(profile_key: str) -> List[Scenario]:
    return [scenario for scenario in SCENARIOS if profile_key in scenario.profile_keys]


def scenario_by_id(profile_key: str, scenario_id: str) -> Scenario:
    choices = scenarios_for_profile(profile_key)
    for scenario in choices:
        if scenario.id == scenario_id:
            return scenario
    return choices[0]
