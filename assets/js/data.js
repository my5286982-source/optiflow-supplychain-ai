window.OPTI_DATA = {
  categories: {
    meals: { ar: "وجبات", en: "Meals" },
    drinks: { ar: "مشروبات", en: "Drinks" },
    fast: { ar: "سريع البيع", en: "Fast items" },
    basics: { ar: "أساسيات", en: "Basics" },
    sweets: { ar: "حلويات", en: "Sweets" },
    cooling: { ar: "تبريد", en: "Cold items" },
    vegetables: { ar: "خضار", en: "Vegetables" },
    packaging: { ar: "تغليف", en: "Packing" },
    raw: { ar: "مواد خام", en: "Raw material" },
    production: { ar: "إنتاج", en: "Production" },
    safety: { ar: "سلامة", en: "Safety" },
    maintenance: { ar: "صيانة", en: "Maintenance" },
    custom: { ar: "مخصص", en: "Custom" }
  },
  scenarios: [
    {
      id: "match-night",
      name: { ar: "ليلة مباراة", en: "Match night" },
      profileKeys: ["restaurant"],
      demandLift: 0.36,
      affectedCategories: ["meals", "drinks", "fast"],
      affectedItemIds: ["chicken", "rice", "cola", "water", "bread"],
      disruption: 0.08,
      note: {
        ar: "طلب أعلى على الوجبات والمشروبات خلال ساعات قليلة.",
        en: "More demand for meals and drinks in a short time."
      }
    },
    {
      id: "viral-dish",
      name: { ar: "ترند وصفة", en: "Food trend" },
      profileKeys: ["restaurant"],
      demandLift: 0.42,
      affectedCategories: ["meals", "vegetables", "basics"],
      affectedItemIds: ["rice", "chicken", "tomato", "spices"],
      disruption: 0.05,
      note: {
        ar: "ترند محلي يرفع الطلب على مكونات محددة.",
        en: "A local trend increases demand for specific ingredients."
      }
    },
    {
      id: "restaurant-delivery-rush",
      name: { ar: "حملة تطبيقات التوصيل", en: "Delivery app rush" },
      profileKeys: ["restaurant"],
      demandLift: 0.31,
      affectedCategories: ["meals", "packaging", "drinks"],
      affectedItemIds: ["packaging", "water", "cola", "chicken", "rice"],
      disruption: 0.06,
      note: {
        ar: "خصم في تطبيقات التوصيل يرفع الطلب على الوجبات والتغليف.",
        en: "A delivery app offer increases demand for meals and packing."
      }
    },
    {
      id: "restaurant-chilled-delay",
      name: { ar: "تأخر مواد مبردة", en: "Cold item delay" },
      profileKeys: ["restaurant"],
      demandLift: 0.1,
      affectedCategories: ["cooling", "meals", "vegetables"],
      affectedItemIds: ["chicken", "yogurt", "tomato"],
      disruption: 0.3,
      note: {
        ar: "تأخر مورد المواد المبردة؛ يجب تأمين بديل سريع.",
        en: "Cold supply is late; prepare a fast backup supplier."
      }
    },
    {
      id: "grocery-salary-week",
      name: { ar: "أسبوع الرواتب", en: "Salary week" },
      profileKeys: ["grocery"],
      demandLift: 0.24,
      affectedCategories: ["basics", "sweets", "drinks"],
      affectedItemIds: ["milk", "eggs", "coffee", "dates", "water-g"],
      disruption: 0.03,
      note: {
        ar: "زيادة شراء العائلات للمواد الأساسية والحلويات.",
        en: "Families buy more basics, sweets, and drinks."
      }
    },
    {
      id: "grocery-school-week",
      name: { ar: "عودة المدارس", en: "School week" },
      profileKeys: ["grocery"],
      demandLift: 0.28,
      affectedCategories: ["fast", "basics", "drinks"],
      affectedItemIds: ["bread", "milk", "eggs", "water-g"],
      disruption: 0.04,
      note: {
        ar: "عودة المدارس ترفع طلب الإفطار السريع والمياه.",
        en: "School week increases demand for quick breakfast and water."
      }
    },
    {
      id: "grocery-heat-wave",
      name: { ar: "موجة حر", en: "Hot weather" },
      profileKeys: ["grocery"],
      demandLift: 0.3,
      affectedCategories: ["drinks", "cooling"],
      affectedItemIds: ["water-g", "milk"],
      disruption: 0.09,
      note: {
        ar: "الحرارة ترفع طلب المياه والمنتجات المبردة.",
        en: "Hot weather increases water and cold item demand."
      }
    },
    {
      id: "grocery-dairy-delay",
      name: { ar: "تأخر مورد الألبان", en: "Dairy delay" },
      profileKeys: ["grocery"],
      demandLift: 0.08,
      affectedCategories: ["cooling", "basics"],
      affectedItemIds: ["milk", "eggs"],
      disruption: 0.28,
      note: {
        ar: "تأخر مورد الألبان والبيض؛ النظام يرفع هامش الأمان.",
        en: "Milk and egg supply is late, so the system adds safety stock."
      }
    },
    {
      id: "farm-season",
      name: { ar: "موسم زراعة", en: "Farm season" },
      profileKeys: ["fertilizerFactory"],
      demandLift: 0.38,
      affectedCategories: ["raw", "production", "packaging"],
      affectedItemIds: ["urea", "npk", "bags", "pallets"],
      disruption: 0.07,
      note: {
        ar: "المزارع تطلب أسمدة أكثر قبل موسم الزراعة.",
        en: "Farms need more fertilizer before planting season."
      }
    },
    {
      id: "raw-material-delay",
      name: { ar: "تأخر خامات", en: "Material delay" },
      profileKeys: ["fertilizerFactory"],
      demandLift: 0.12,
      affectedCategories: ["raw", "production"],
      affectedItemIds: ["ammonia", "phosphate", "potassium"],
      disruption: 0.35,
      note: {
        ar: "تأخر مواد خام؛ يجب تأمين بدائل قبل توقف الخط.",
        en: "Raw material is late; secure backup before the line stops."
      }
    },
    {
      id: "factory-maintenance",
      name: { ar: "توقف صيانة قريب", en: "Maintenance stop" },
      profileKeys: ["fertilizerFactory"],
      demandLift: 0.18,
      affectedCategories: ["maintenance", "safety", "packaging"],
      affectedItemIds: ["pallets", "safety-masks", "bags"],
      disruption: 0.18,
      note: {
        ar: "صيانة قريبة قد تؤخر التعبئة؛ يجب تجهيز التغليف والسلامة.",
        en: "Upcoming maintenance may slow packing; prepare packing and safety items."
      }
    },
    {
      id: "factory-bulk-order",
      name: { ar: "طلب مزارع كبير", en: "Large farm order" },
      profileKeys: ["fertilizerFactory"],
      demandLift: 0.44,
      affectedCategories: ["production", "packaging"],
      affectedItemIds: ["urea", "npk", "bags", "pallets"],
      disruption: 0.05,
      note: {
        ar: "طلب كبير من مزارع المنطقة يرفع احتياج الإنتاج والتغليف.",
        en: "A large farm order increases production and packing needs."
      }
    }
  ],
  profiles: {
    restaurant: {
      name: { ar: "مطعم رز وبهارات", en: "Rice & Spice Restaurant" },
      city: { ar: "الرياض", en: "Riyadh" },
      capacityUnits: 1280,
      baselineStorageUse: 0.61,
      defaultSuppliers: ["s3", "s6"],
      items: [
        {
          id: "chicken",
          name: { ar: "دجاج مبرد", en: "Chilled chicken" },
          categoryKey: "meals",
          unit: { ar: "كجم", en: "kg" },
          stock: 186,
          dailyDemand: 72,
          leadTimeHours: 18,
          shelfLifeDays: 4,
          reorderPoint: 150,
          unitCost: 18,
          saleImpact: 42,
          suppliers: ["s1", "s2", "s5"]
        },
        {
          id: "rice",
          name: { ar: "أرز بسمتي", en: "Basmati rice" },
          categoryKey: "basics",
          unit: { ar: "كجم", en: "kg" },
          stock: 340,
          dailyDemand: 94,
          leadTimeHours: 16,
          shelfLifeDays: 90,
          reorderPoint: 260,
          unitCost: 7,
          saleImpact: 24,
          suppliers: ["s3", "s4"]
        },
        {
          id: "tomato",
          name: { ar: "طماطم", en: "Tomato" },
          categoryKey: "vegetables",
          unit: { ar: "كجم", en: "kg" },
          stock: 112,
          dailyDemand: 38,
          leadTimeHours: 12,
          shelfLifeDays: 3,
          reorderPoint: 90,
          unitCost: 5,
          saleImpact: 15,
          suppliers: ["s2", "s6"]
        },
        {
          id: "spices",
          name: { ar: "بهارات كبسة", en: "Kabsa spices" },
          categoryKey: "basics",
          unit: { ar: "كجم", en: "kg" },
          stock: 28,
          dailyDemand: 7,
          leadTimeHours: 20,
          shelfLifeDays: 160,
          reorderPoint: 24,
          unitCost: 31,
          saleImpact: 18,
          suppliers: ["s4", "s6"]
        },
        {
          id: "yogurt",
          name: { ar: "لبن", en: "Laban" },
          categoryKey: "cooling",
          unit: { ar: "لتر", en: "liter" },
          stock: 140,
          dailyDemand: 34,
          leadTimeHours: 14,
          shelfLifeDays: 5,
          reorderPoint: 92,
          unitCost: 4.2,
          saleImpact: 11,
          suppliers: ["s1", "s5"]
        },
        {
          id: "water",
          name: { ar: "مياه", en: "Water" },
          categoryKey: "drinks",
          unit: { ar: "كرتون", en: "case" },
          stock: 92,
          dailyDemand: 40,
          leadTimeHours: 10,
          shelfLifeDays: 180,
          reorderPoint: 120,
          unitCost: 9,
          saleImpact: 13,
          suppliers: ["s3", "s6"]
        },
        {
          id: "cola",
          name: { ar: "مشروبات غازية", en: "Soft drinks" },
          categoryKey: "drinks",
          unit: { ar: "كرتون", en: "case" },
          stock: 76,
          dailyDemand: 29,
          leadTimeHours: 15,
          shelfLifeDays: 150,
          reorderPoint: 84,
          unitCost: 22,
          saleImpact: 17,
          suppliers: ["s3", "s5"]
        },
        {
          id: "packaging",
          name: { ar: "عبوات سفري", en: "Takeaway boxes" },
          categoryKey: "packaging",
          unit: { ar: "حزمة", en: "pack" },
          stock: 210,
          dailyDemand: 72,
          leadTimeHours: 22,
          shelfLifeDays: 365,
          reorderPoint: 180,
          unitCost: 12,
          saleImpact: 10,
          suppliers: ["s4", "s6"]
        }
      ]
    },
    grocery: {
      name: { ar: "بقالة الحي الذكية", en: "Smart Corner Grocery" },
      city: { ar: "الخرج", en: "Al Kharj" },
      capacityUnits: 1680,
      baselineStorageUse: 0.56,
      defaultSuppliers: ["s3", "s6"],
      items: [
        {
          id: "milk",
          name: { ar: "حليب طازج", en: "Fresh milk" },
          categoryKey: "cooling",
          unit: { ar: "كرتون", en: "case" },
          stock: 96,
          dailyDemand: 44,
          leadTimeHours: 12,
          shelfLifeDays: 5,
          reorderPoint: 110,
          unitCost: 21,
          saleImpact: 19,
          suppliers: ["s1", "s5"]
        },
        {
          id: "bread",
          name: { ar: "خبز برجر", en: "Burger bread" },
          categoryKey: "fast",
          unit: { ar: "كيس", en: "bag" },
          stock: 88,
          dailyDemand: 36,
          leadTimeHours: 8,
          shelfLifeDays: 3,
          reorderPoint: 76,
          unitCost: 3,
          saleImpact: 9,
          suppliers: ["s2", "s6"]
        },
        {
          id: "eggs",
          name: { ar: "بيض", en: "Eggs" },
          categoryKey: "basics",
          unit: { ar: "طبق", en: "tray" },
          stock: 140,
          dailyDemand: 42,
          leadTimeHours: 14,
          shelfLifeDays: 14,
          reorderPoint: 118,
          unitCost: 15,
          saleImpact: 15,
          suppliers: ["s1", "s3"]
        },
        {
          id: "water-g",
          name: { ar: "مياه", en: "Water" },
          categoryKey: "drinks",
          unit: { ar: "كرتون", en: "case" },
          stock: 130,
          dailyDemand: 55,
          leadTimeHours: 10,
          shelfLifeDays: 180,
          reorderPoint: 150,
          unitCost: 9,
          saleImpact: 11,
          suppliers: ["s3", "s6"]
        },
        {
          id: "dates",
          name: { ar: "تمر سكري", en: "Dates" },
          categoryKey: "sweets",
          unit: { ar: "علبة", en: "box" },
          stock: 74,
          dailyDemand: 18,
          leadTimeHours: 24,
          shelfLifeDays: 120,
          reorderPoint: 70,
          unitCost: 18,
          saleImpact: 20,
          suppliers: ["s4", "s6"]
        },
        {
          id: "rice-g",
          name: { ar: "أرز بسمتي", en: "Basmati rice" },
          categoryKey: "basics",
          unit: { ar: "كيس", en: "bag" },
          stock: 80,
          dailyDemand: 19,
          leadTimeHours: 18,
          shelfLifeDays: 180,
          reorderPoint: 82,
          unitCost: 31,
          saleImpact: 18,
          suppliers: ["s3", "s4"]
        },
        {
          id: "coffee",
          name: { ar: "قهوة عربية", en: "Arabic coffee" },
          categoryKey: "sweets",
          unit: { ar: "علبة", en: "tin" },
          stock: 52,
          dailyDemand: 12,
          leadTimeHours: 20,
          shelfLifeDays: 220,
          reorderPoint: 42,
          unitCost: 23,
          saleImpact: 22,
          suppliers: ["s4", "s6"]
        },
        {
          id: "cleaners",
          name: { ar: "منظفات", en: "Cleaners" },
          categoryKey: "basics",
          unit: { ar: "كرتون", en: "case" },
          stock: 44,
          dailyDemand: 8,
          leadTimeHours: 26,
          shelfLifeDays: 365,
          reorderPoint: 34,
          unitCost: 38,
          saleImpact: 12,
          suppliers: ["s4", "s6"]
        }
      ]
    },
    fertilizerFactory: {
      name: { ar: "مصنع أسمدة الخرج", en: "Al Kharj Fertilizer Plant" },
      city: { ar: "الخرج", en: "Al Kharj" },
      capacityUnits: 30000,
      baselineStorageUse: 0.68,
      defaultSuppliers: ["s7", "s8", "s9"],
      items: [
        {
          id: "ammonia",
          name: { ar: "أمونيا", en: "Ammonia" },
          categoryKey: "raw",
          unit: { ar: "طن", en: "ton" },
          stock: 260,
          dailyDemand: 95,
          leadTimeHours: 26,
          shelfLifeDays: 365,
          reorderPoint: 240,
          unitCost: 1800,
          saleImpact: 70,
          suppliers: ["s7", "s8"]
        },
        {
          id: "phosphate",
          name: { ar: "صخر فوسفات", en: "Phosphate rock" },
          categoryKey: "raw",
          unit: { ar: "طن", en: "ton" },
          stock: 340,
          dailyDemand: 110,
          leadTimeHours: 36,
          shelfLifeDays: 720,
          reorderPoint: 320,
          unitCost: 620,
          saleImpact: 55,
          suppliers: ["s7", "s9"]
        },
        {
          id: "potassium",
          name: { ar: "كلوريد بوتاسيوم", en: "Potassium chloride" },
          categoryKey: "raw",
          unit: { ar: "طن", en: "ton" },
          stock: 180,
          dailyDemand: 58,
          leadTimeHours: 30,
          shelfLifeDays: 720,
          reorderPoint: 170,
          unitCost: 940,
          saleImpact: 44,
          suppliers: ["s7", "s8"]
        },
        {
          id: "urea",
          name: { ar: "يوريا محببة", en: "Urea bags" },
          categoryKey: "production",
          unit: { ar: "طن", en: "ton" },
          stock: 420,
          dailyDemand: 135,
          leadTimeHours: 18,
          shelfLifeDays: 365,
          reorderPoint: 390,
          unitCost: 1350,
          saleImpact: 65,
          suppliers: ["s8", "s9"]
        },
        {
          id: "npk",
          name: { ar: "سماد NPK", en: "NPK fertilizer" },
          categoryKey: "production",
          unit: { ar: "طن", en: "ton" },
          stock: 260,
          dailyDemand: 96,
          leadTimeHours: 22,
          shelfLifeDays: 365,
          reorderPoint: 250,
          unitCost: 1560,
          saleImpact: 62,
          suppliers: ["s8", "s9"]
        },
        {
          id: "bags",
          name: { ar: "أكياس تعبئة", en: "Packing bags" },
          categoryKey: "packaging",
          unit: { ar: "كيس", en: "bag" },
          stock: 18500,
          dailyDemand: 7200,
          leadTimeHours: 20,
          shelfLifeDays: 365,
          reorderPoint: 16000,
          unitCost: 1.4,
          saleImpact: 38,
          suppliers: ["s6", "s8"]
        },
        {
          id: "pallets",
          name: { ar: "طبليات تحميل", en: "Pallets" },
          categoryKey: "packaging",
          unit: { ar: "منصة", en: "pallet" },
          stock: 520,
          dailyDemand: 170,
          leadTimeHours: 18,
          shelfLifeDays: 365,
          reorderPoint: 480,
          unitCost: 38,
          saleImpact: 25,
          suppliers: ["s6", "s8"]
        },
        {
          id: "safety-masks",
          name: { ar: "كمامات سلامة", en: "Safety masks" },
          categoryKey: "safety",
          unit: { ar: "صندوق", en: "box" },
          stock: 44,
          dailyDemand: 9,
          leadTimeHours: 12,
          shelfLifeDays: 365,
          reorderPoint: 38,
          unitCost: 90,
          saleImpact: 22,
          suppliers: ["s8", "s9"]
        }
      ]
    }
  },
  suppliers: {
    s1: {
      name: { ar: "برودة نجد", en: "Najd Cold Supply" },
      specialty: { ar: "تبريد", en: "Cold supply" },
      reliability: 0.94,
      baseLeadHours: 10,
      priceIndex: 1.06,
      minOrder: 900,
      distanceKm: 18,
      sustainability: 0.72
    },
    s2: {
      name: { ar: "مزارع الوادي", en: "Valley Farms" },
      specialty: { ar: "طازج", en: "Fresh food" },
      reliability: 0.88,
      baseLeadHours: 9,
      priceIndex: 0.94,
      minOrder: 600,
      distanceKm: 24,
      sustainability: 0.86
    },
    s3: {
      name: { ar: "توزيع السدرة", en: "Sidra Distribution" },
      specialty: { ar: "مشروبات وأساسي", en: "Drinks and basics" },
      reliability: 0.91,
      baseLeadHours: 12,
      priceIndex: 0.98,
      minOrder: 800,
      distanceKm: 31,
      sustainability: 0.68
    },
    s4: {
      name: { ar: "أسواق الجملة الأولى", en: "First Wholesale" },
      specialty: { ar: "مواد جافة", en: "Dry goods" },
      reliability: 0.84,
      baseLeadHours: 18,
      priceIndex: 0.89,
      minOrder: 1200,
      distanceKm: 42,
      sustainability: 0.63
    },
    s5: {
      name: { ar: "سريع التبريد", en: "Fast Cold Delivery" },
      specialty: { ar: "طوارئ", en: "Urgent delivery" },
      reliability: 0.97,
      baseLeadHours: 7,
      priceIndex: 1.18,
      minOrder: 500,
      distanceKm: 14,
      sustainability: 0.59
    },
    s6: {
      name: { ar: "تعاونية الجنوب", en: "South Cooperative" },
      specialty: { ar: "متنوع", en: "Mixed goods" },
      reliability: 0.86,
      baseLeadHours: 15,
      priceIndex: 0.93,
      minOrder: 650,
      distanceKm: 28,
      sustainability: 0.9
    },
    s7: {
      name: { ar: "كيماويات الخليج", en: "Gulf Chemicals" },
      specialty: { ar: "مواد خام", en: "Raw chemicals" },
      reliability: 0.9,
      baseLeadHours: 28,
      priceIndex: 1.02,
      minOrder: 18000,
      distanceKm: 86,
      sustainability: 0.66
    },
    s8: {
      name: { ar: "لوجستيات الخرج الصناعية", en: "Kharj Industrial Logistics" },
      specialty: { ar: "مصانع", en: "Factory supply" },
      reliability: 0.93,
      baseLeadHours: 18,
      priceIndex: 1.07,
      minOrder: 12000,
      distanceKm: 16,
      sustainability: 0.74
    },
    s9: {
      name: { ar: "تعاونية المزارع", en: "Farmers Cooperative" },
      specialty: { ar: "أسمدة وزراعة", en: "Farming goods" },
      reliability: 0.87,
      baseLeadHours: 24,
      priceIndex: 0.95,
      minOrder: 9000,
      distanceKm: 38,
      sustainability: 0.91
    }
  }
};
