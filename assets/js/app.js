(function () {
  "use strict";

  var data = window.OPTI_DATA;
  var ITEM_STORAGE_KEY = "optiflow-added-items-v2";
  var LANG_STORAGE_KEY = "optiflow-language";

  var I18N = {
    ar: {
      docTitle: "OptiFlow AI | إدارة مخزون ذكية",
      docDescription: "لوحة بسيطة لإدارة المخزون والمشتريات باستخدام وكلاء ذكاء اصطناعي.",
      liveMode: "نظام يعمل الآن",
      languageLabel: "اللغة",
      profileLabel: "النشاط",
      scenarioLabel: "حالة السوق",
      autonomyLabel: "قوة القرار",
      trendLabel: "قوة الطلب",
      budgetLabel: "ميزانية الشراء",
      storageLabel: "سعة التخزين",
      runDecision: "احسب القرار",
      approveOrders: "اعتمد الطلبات",
      reset: "إعادة ضبط",
      riskTitle: "أصناف قد تنفد",
      purchaseTitle: "قيمة الشراء",
      wasteTitle: "هدر يمكن تفاديه",
      wasteMeta: "خصم أو استخدام بديل",
      serviceTitle: "جاهزية العمل",
      brainDefault: "ملخص القرار",
      confidence: "ثقة {{value}}%",
      flowTitle: "تدفق المورد والمخزون والطلب",
      supplierNode: "المورد",
      inventoryNode: "المخزون",
      demandNode: "الطلب",
      agentEyebrow: "وكلاء النظام",
      agentTitle: "ما الذي يحدث؟",
      ordersEyebrow: "طلبات شراء",
      ordersTitle: "جاهزة للمراجعة",
      forecastTitle: "توقع الطلب",
      coverageTitle: "أيام التغطية",
      dataEyebrow: "شرح البيانات",
      dataTitle: "ماذا تعني الأرقام؟",
      addEyebrow: "إضافة صنف",
      addTitle: "أدخل صنف جديد",
      addHelp: "سيتم حفظ الصنف في هذا المتصفح فقط، ويمكنك حذفه من زر مسح الأصناف المضافة.",
      addItem: "إضافة الصنف",
      clearAdded: "مسح الأصناف المضافة",
      itemName: "اسم الصنف",
      category: "الفئة",
      unit: "الوحدة",
      stock: "المخزون الحالي",
      dailyNeed: "الاحتياج اليومي",
      deliveryTime: "وقت التوريد بالساعة",
      shelfLife: "مدة الصلاحية بالأيام",
      reorderPoint: "حد إعادة الطلب",
      unitCost: "تكلفة الوحدة",
      saleImpact: "أهمية الصنف",
      inventoryEyebrow: "المخزون",
      inventoryTitle: "قائمة الأصناف",
      searchPlaceholder: "ابحث عن صنف",
      statusFilterLabel: "تصفية الحالة",
      allStatuses: "كل الحالات",
      tableItem: "الصنف",
      tableCategory: "الفئة",
      tableStock: "المخزون",
      tableForecast: "احتياج 72 ساعة",
      tableCoverage: "التغطية",
      tableStatus: "الحالة",
      tableDecision: "قرار النظام",
      logEyebrow: "سجل النظام",
      logTitle: "آخر الأحداث",
      critical: "حرج",
      watch: "انتبه",
      healthy: "مستقر",
      riskMeta: "{{count}} صنف يحتاج متابعة",
      budgetOk: "ضمن الميزانية",
      budgetHigh: "أعلى من الميزانية",
      serviceMeta: "ثقة القرار {{value}}%",
      brainSummary: "{{note}} القرار الأول الآن هو متابعة {{item}}. المساحة المتاحة تقريبا {{space}} وحدة.",
      agentTrendName: "Trend Monitor",
      agentInventoryName: "Inventory Watch",
      agentProcurementName: "Buyer Agent",
      agentWasteName: "Waste Saver",
      agentBrainName: "OptiFlow Brain",
      agentCoreName: "Control Agent",
      stateWatching: "يراقب",
      stateAlert: "تنبيه",
      stateStable: "مستقر",
      stateBuying: "يجهز شراء",
      stateWaiting: "ينتظر",
      stateSaving: "يوفر",
      stateControl: "ينسق",
      agentTrendBody: "توقع الطلب ارتفع {{value}}% بسبب {{scenario}}.",
      agentInventoryBody: "{{risk}} صنف حرج و {{watch}} صنف يحتاج متابعة.",
      agentProcurementBody: "{{count}} طلب شراء بقيمة {{value}}.",
      agentProcurementIdle: "لا توجد طلبات شراء عاجلة الآن.",
      agentWasteBody: "يمكن تقليل هدر بقيمة {{value}}.",
      agentCoreBody: "وازن بين الميزانية والسعة قبل اقتراح الشراء.",
      noOrders: "لا توجد طلبات شراء الآن.",
      orderReasonTrend: "بسبب ارتفاع الطلب",
      orderReasonSafety: "لرفع الأمان",
      qty: "الكمية",
      supplier: "المورد",
      arrival: "الوصول",
      value: "القيمة",
      decisionBuy: "اشتر {{qty}} {{unit}} من {{supplier}}",
      decisionWaste: "خصم أو استخدام بديل",
      decisionWatch: "راقب الصنف وجهز مورد بديل",
      decisionNone: "لا إجراء",
      demandNormal: "الطلب المعتاد",
      demandForecast: "توقع النظام",
      day: "يوم",
      hour: "ساعة",
      currency: "\u20C1",
      profileSummary: "{{business}} في {{city}} يحتوي على {{items}} أصناف. السعة المختارة تعني أكبر كمية يمكن تخزينها الآن.",
      helpStock: "المخزون الحالي: الكمية الموجودة لديك الآن.",
      helpDailyNeed: "الاحتياج اليومي: كم تتوقع أن تبيع أو تستهلك في يوم واحد.",
      helpDelivery: "وقت التوريد: كم ساعة يحتاج المورد حتى يوصل الصنف.",
      helpShelf: "مدة الصلاحية: بعد كم يوم قد يتلف الصنف أو يصبح غير مناسب.",
      helpReorder: "حد إعادة الطلب: إذا وصل المخزون لهذا الرقم يبدأ النظام بالتنبيه.",
      helpImpact: "أهمية الصنف: رقم من 1 إلى 100؛ كلما زاد الرقم كان توقفه مؤثرا أكثر.",
      logLoadedProfile: "تم اختيار النشاط: {{name}}.",
      logScenario: "تم اختيار حالة السوق: {{name}}.",
      logRun: "تم حساب القرار بناء على الطلب والمخزون والموردين.",
      logNoOrders: "لا توجد طلبات شراء تحتاج اعتمادا الآن.",
      logApproved: "تم اعتماد {{count}} طلب بقيمة {{value}}.",
      logInventoryUpdated: "تم تحديث المخزون بعد الاعتماد.",
      logItemAdded: "تمت إضافة صنف: {{name}}.",
      logItemsCleared: "تم مسح الأصناف المضافة لهذا النشاط.",
      logTrendConnected: "تم ربط حالة السوق مع المخزون.",
      logInventoryChecked: "تم فحص كل الأصناف.",
      logReady: "النظام جاهز."
    },
    en: {
      docTitle: "OptiFlow AI | Simple Stock Planner",
      docDescription: "A simple dashboard for stock and buying decisions using AI agents.",
      liveMode: "System is running",
      languageLabel: "Language",
      profileLabel: "Business",
      scenarioLabel: "Market case",
      autonomyLabel: "Decision power",
      trendLabel: "Demand power",
      budgetLabel: "Buying budget",
      storageLabel: "Storage space",
      runDecision: "Check decision",
      approveOrders: "Approve orders",
      reset: "Reset",
      riskTitle: "Items at risk",
      purchaseTitle: "Buying value",
      wasteTitle: "Waste saved",
      wasteMeta: "Discount or use elsewhere",
      serviceTitle: "Work readiness",
      brainDefault: "Decision summary",
      confidence: "{{value}}% confidence",
      flowTitle: "Supplier, stock, and demand flow",
      supplierNode: "Supplier",
      inventoryNode: "Stock",
      demandNode: "Demand",
      agentEyebrow: "System agents",
      agentTitle: "What is happening?",
      ordersEyebrow: "Buy orders",
      ordersTitle: "Ready to review",
      forecastTitle: "Demand forecast",
      coverageTitle: "Stock days",
      dataEyebrow: "Data help",
      dataTitle: "What do the numbers mean?",
      addEyebrow: "Add item",
      addTitle: "Add a new item",
      addHelp: "The item is saved in this browser only. You can remove added items with the clear button.",
      addItem: "Add item",
      clearAdded: "Clear added items",
      itemName: "Item name",
      category: "Group",
      unit: "Unit",
      stock: "Stock now",
      dailyNeed: "Daily need",
      deliveryTime: "Delivery time in hours",
      shelfLife: "Shelf life in days",
      reorderPoint: "Reorder level",
      unitCost: "Unit cost",
      saleImpact: "Item importance",
      inventoryEyebrow: "Stock",
      inventoryTitle: "Items list",
      searchPlaceholder: "Search item",
      statusFilterLabel: "Filter status",
      allStatuses: "All statuses",
      tableItem: "Item",
      tableCategory: "Group",
      tableStock: "Stock",
      tableForecast: "72h need",
      tableCoverage: "Days left",
      tableStatus: "Status",
      tableDecision: "System action",
      logEyebrow: "System log",
      logTitle: "Latest events",
      critical: "Risk",
      watch: "Watch",
      healthy: "OK",
      riskMeta: "{{count}} items need watching",
      budgetOk: "Inside budget",
      budgetHigh: "Over budget",
      serviceMeta: "{{value}}% decision confidence",
      brainSummary: "{{note}} First action now is to watch {{item}}. Free space is about {{space}} units.",
      agentTrendName: "Trend Monitor",
      agentInventoryName: "Inventory Watch",
      agentProcurementName: "Buyer Agent",
      agentWasteName: "Waste Saver",
      agentBrainName: "OptiFlow Brain",
      agentCoreName: "Control Agent",
      stateWatching: "watching",
      stateAlert: "alert",
      stateStable: "ok",
      stateBuying: "buying",
      stateWaiting: "waiting",
      stateSaving: "saving",
      stateControl: "control",
      agentTrendBody: "Demand is up {{value}}% because of {{scenario}}.",
      agentInventoryBody: "{{risk}} risk items and {{watch}} watch items.",
      agentProcurementBody: "{{count}} buy orders worth {{value}}.",
      agentProcurementIdle: "No urgent buy orders now.",
      agentWasteBody: "Possible waste saving: {{value}}.",
      agentCoreBody: "Checked budget and space before suggesting orders.",
      noOrders: "No buy orders now.",
      orderReasonTrend: "Demand is higher",
      orderReasonSafety: "Safety stock",
      qty: "Qty",
      supplier: "Supplier",
      arrival: "Arrival",
      value: "Value",
      decisionBuy: "Buy {{qty}} {{unit}} from {{supplier}}",
      decisionWaste: "Discount or use elsewhere",
      decisionWatch: "Watch and prepare backup supplier",
      decisionNone: "No action",
      demandNormal: "Normal demand",
      demandForecast: "System forecast",
      day: "days",
      hour: "hours",
      currency: "\u20C1",
      profileSummary: "{{business}} in {{city}} has {{items}} items. Storage space means the max amount you can keep now.",
      helpStock: "Stock now: the quantity you have today.",
      helpDailyNeed: "Daily need: how much you sell or use in one day.",
      helpDelivery: "Delivery time: how many hours the supplier needs to deliver.",
      helpShelf: "Shelf life: after how many days the item may expire or become unusable.",
      helpReorder: "Reorder level: when stock reaches this number, the system warns you.",
      helpImpact: "Item importance: a number from 1 to 100; higher means more business impact.",
      logLoadedProfile: "Business selected: {{name}}.",
      logScenario: "Market case selected: {{name}}.",
      logRun: "Decision checked using demand, stock, and suppliers.",
      logNoOrders: "No buy orders need approval now.",
      logApproved: "Approved {{count}} orders worth {{value}}.",
      logInventoryUpdated: "Stock updated after approval.",
      logItemAdded: "Added item: {{name}}.",
      logItemsCleared: "Added items cleared for this business.",
      logTrendConnected: "Market case connected to stock.",
      logInventoryChecked: "All items checked.",
      logReady: "System ready."
    }
  };

  var state = {
    profile: "restaurant",
    scenario: "match-night",
    lang: readStorage(LANG_STORAGE_KEY) || "ar",
    autonomy: 70,
    trend: 68,
    budget: 24000,
    storage: 78,
    approvedValue: 0,
    log: []
  };

  if (state.lang !== "ar" && state.lang !== "en") {
    state.lang = "ar";
  }

  var els = {};

  document.addEventListener("DOMContentLoaded", function () {
    cacheElements();
    loadSavedItems();
    bindEvents();
    applyLanguage();
    hydrateProfileOptions();
    hydrateScenarioOptions();
    hydrateCategoryOptions();
    applyBudgetDefaults(true);
    resetLog();
    render();
    window.setInterval(tickClock, 1000);
    window.setInterval(function () {
      var drift = Math.round(Math.sin(Date.now() / 9000) * 3);
      state.trend = clamp(Number(els.trendRange.value) + drift, 0, 100);
      els.trendValue.textContent = String(state.trend);
      render(false);
    }, 9000);
  });

  function cacheElements() {
    [
      "languageSelect",
      "profileSelect",
      "scenarioSelect",
      "autonomyRange",
      "trendRange",
      "budgetRange",
      "storageRange",
      "runBtn",
      "approveBtn",
      "resetBtn",
      "businessName",
      "clockText",
      "autonomyValue",
      "trendValue",
      "budgetValue",
      "storageValue",
      "riskKpi",
      "riskMeta",
      "purchaseKpi",
      "budgetMeta",
      "wasteKpi",
      "serviceKpi",
      "serviceMeta",
      "brainTitle",
      "brainSummary",
      "confidenceBadge",
      "flowTitle",
      "supplierNodeLabel",
      "inventoryNodeLabel",
      "demandNodeLabel",
      "supplierFlowText",
      "inventoryFlowText",
      "demandFlowText",
      "agentList",
      "orderList",
      "orderCount",
      "profileSummary",
      "dataHelpList",
      "addItemForm",
      "newItemName",
      "newItemCategory",
      "newItemUnit",
      "newItemStock",
      "newItemDailyDemand",
      "newItemLeadTime",
      "newItemShelfLife",
      "newItemReorderPoint",
      "newItemUnitCost",
      "newItemImpact",
      "clearAddedBtn",
      "searchInput",
      "statusFilter",
      "inventoryBody",
      "activityLog",
      "demandCanvas",
      "coverageCanvas"
    ].forEach(function (id) {
      els[id] = document.getElementById(id);
    });
  }

  function bindEvents() {
    els.languageSelect.addEventListener("change", function (event) {
      state.lang = event.target.value;
      writeStorage(LANG_STORAGE_KEY, state.lang);
      applyLanguage();
      hydrateProfileOptions();
      hydrateScenarioOptions();
      hydrateCategoryOptions();
      resetLog();
      render();
    });

    els.profileSelect.addEventListener("change", function (event) {
      state.profile = event.target.value;
      state.approvedValue = 0;
      applyBudgetDefaults(true);
      hydrateScenarioOptions();
      addLog("agentBrainName", t("logLoadedProfile", { name: label(activeProfile().name) }));
      render();
    });

    els.scenarioSelect.addEventListener("change", function (event) {
      state.scenario = event.target.value;
      addLog("agentTrendName", t("logScenario", { name: label(activeScenario().name) }));
      render();
    });

    [
      ["autonomyRange", "autonomy"],
      ["trendRange", "trend"],
      ["budgetRange", "budget"],
      ["storageRange", "storage"]
    ].forEach(function (pair) {
      els[pair[0]].addEventListener("input", function (event) {
        state[pair[1]] = Number(event.target.value);
        render(false);
      });
    });

    els.runBtn.addEventListener("click", function () {
      addLog("agentBrainName", t("logRun"));
      render();
    });

    els.approveBtn.addEventListener("click", approveOrders);

    els.resetBtn.addEventListener("click", function () {
      state.autonomy = 70;
      state.trend = 68;
      state.storage = 78;
      state.approvedValue = 0;
      els.autonomyRange.value = "70";
      els.trendRange.value = "68";
      els.storageRange.value = "78";
      applyBudgetDefaults(true);
      resetLog();
      render();
    });

    els.addItemForm.addEventListener("submit", addCustomItem);
    els.clearAddedBtn.addEventListener("click", clearCustomItems);

    els.searchInput.addEventListener("input", function () {
      renderInventory(analyze());
    });

    els.statusFilter.addEventListener("change", function () {
      renderInventory(analyze());
    });
  }

  function applyLanguage() {
    var isArabic = state.lang === "ar";
    document.documentElement.lang = state.lang;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.body.dataset.lang = state.lang;
    document.title = t("docTitle");
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("docDescription"));
    els.languageSelect.value = state.lang;

    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (node) {
      node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
    });
    document.querySelectorAll("[data-i18n-title]").forEach(function (node) {
      node.setAttribute("title", t(node.dataset.i18nTitle));
      node.setAttribute("aria-label", t(node.dataset.i18nTitle));
    });

    if (els.flowTitle) els.flowTitle.textContent = t("flowTitle");
    if (els.supplierNodeLabel) els.supplierNodeLabel.textContent = t("supplierNode");
    if (els.inventoryNodeLabel) els.inventoryNodeLabel.textContent = t("inventoryNode");
    if (els.demandNodeLabel) els.demandNodeLabel.textContent = t("demandNode");
    if (els.newItemUnit && (els.newItemUnit.value === "كرتون" || els.newItemUnit.value === "case")) {
      els.newItemUnit.value = state.lang === "ar" ? "كرتون" : "case";
    }
  }

  function hydrateProfileOptions() {
    els.profileSelect.innerHTML = "";
    Object.keys(data.profiles).forEach(function (key) {
      var option = document.createElement("option");
      option.value = key;
      option.textContent = label(data.profiles[key].name);
      els.profileSelect.appendChild(option);
    });
    els.profileSelect.value = state.profile;
  }

  function hydrateScenarioOptions() {
    els.scenarioSelect.innerHTML = "";
    var scenarios = availableScenarios();
    if (!scenarios.some(function (scenario) { return scenario.id === state.scenario; })) {
      state.scenario = scenarios[0] ? scenarios[0].id : "";
    }
    scenarios.forEach(function (scenario) {
      var option = document.createElement("option");
      option.value = scenario.id;
      option.textContent = label(scenario.name);
      els.scenarioSelect.appendChild(option);
    });
    els.scenarioSelect.value = state.scenario;
  }

  function hydrateCategoryOptions() {
    els.newItemCategory.innerHTML = "";
    Object.keys(data.categories).forEach(function (key) {
      if (key === "custom") return;
      var option = document.createElement("option");
      option.value = key;
      option.textContent = label(data.categories[key]);
      els.newItemCategory.appendChild(option);
    });
  }

  function activeProfile() {
    return data.profiles[state.profile];
  }

  function activeScenario() {
    var scenario = availableScenarios().find(function (candidate) {
      return candidate.id === state.scenario;
    });
    return scenario || availableScenarios()[0] || data.scenarios[0];
  }

  function availableScenarios() {
    return data.scenarios.filter(function (scenario) {
      return !scenario.profileKeys || scenario.profileKeys.indexOf(state.profile) >= 0;
    });
  }

  function applyBudgetDefaults(force) {
    var settings = budgetSettings();
    els.budgetRange.min = String(settings.min);
    els.budgetRange.max = String(settings.max);
    els.budgetRange.step = String(settings.step);
    if (force || state.budget < settings.min || state.budget > settings.max) {
      state.budget = settings.value;
      els.budgetRange.value = String(settings.value);
    }
  }

  function budgetSettings() {
    if (state.profile === "fertilizerFactory") {
      return { min: 50000, max: 850000, step: 10000, value: 360000 };
    }
    return { min: 8000, max: 45000, step: 1000, value: 24000 };
  }

  function analyze() {
    var profile = activeProfile();
    var scenario = activeScenario();
    var demandMultiplier = 1 + scenario.demandLift * (state.trend / 100);
    var storageLimit = profile.capacityUnits * (state.storage / 100);
    var currentUnits = sum(profile.items, function (item) {
      return item.stock;
    });
    var availableSpace = Math.max(0, storageLimit - currentUnits);

    var items = profile.items.map(function (item) {
      var itemAffected =
        scenario.affectedItemIds.indexOf(item.id) >= 0 ||
        scenario.affectedCategories.indexOf(item.categoryKey) >= 0;
      var adjustedDemand = item.dailyDemand * (itemAffected ? demandMultiplier : 1 + scenario.demandLift * 0.15);
      var leadDays = (item.leadTimeHours * (1 + scenario.disruption)) / 24;
      var targetDays = 2.6 + state.autonomy / 55;
      var targetStock = adjustedDemand * Math.max(targetDays, leadDays + 1.1);
      var coverageDays = item.stock / Math.max(adjustedDemand, 1);
      var shortage = Math.max(0, targetStock - item.stock);
      var reorderQty = Math.ceil(shortage);
      var supplier = bestSupplier(item, profile, scenario);
      var unitCost = item.unitCost * supplier.priceIndex;
      var orderValue = reorderQty * unitCost;
      var seventyTwoHourDemand = adjustedDemand * 3;
      var spoilageQty = Math.max(0, item.stock - adjustedDemand * item.shelfLifeDays * 0.82);
      var spoilageValue = spoilageQty * item.unitCost;
      var status = "healthy";

      if (coverageDays < leadDays + 0.65 || item.stock < item.reorderPoint * 0.82) {
        status = "critical";
      } else if (coverageDays < leadDays + 1.6 || item.stock < item.reorderPoint || spoilageValue > 350) {
        status = "watch";
      }

      return {
        item: item,
        itemAffected: itemAffected,
        adjustedDemand: adjustedDemand,
        leadDays: leadDays,
        targetStock: targetStock,
        coverageDays: coverageDays,
        reorderQty: reorderQty,
        supplier: supplier,
        unitCost: unitCost,
        orderValue: orderValue,
        seventyTwoHourDemand: seventyTwoHourDemand,
        spoilageQty: spoilageQty,
        spoilageValue: spoilageValue,
        status: status,
        decision: decisionForItem(status, reorderQty, spoilageValue, supplier, item)
      };
    });

    var purchaseItems = items
      .filter(function (row) {
        return row.reorderQty > 0 && row.status !== "healthy";
      })
      .sort(function (a, b) {
        return urgencyScore(b) - urgencyScore(a);
      });

    var orders = buildOrders(purchaseItems, availableSpace);
    var totalPurchase = sum(orders, function (order) {
      return order.value;
    });
    var totalWastePrevented = sum(items, function (row) {
      return wasteSaving(row);
    });
    var riskCount = items.filter(function (row) {
      return row.status === "critical";
    }).length;
    var watchCount = items.filter(function (row) {
      return row.status === "watch";
    }).length;
    var serviceReadiness = Math.round(
      clamp(
        100 -
          riskCount * 11 -
          watchCount * 4 +
          Math.min(12, state.autonomy / 8) -
          Math.max(0, (totalPurchase - state.budget) / 1800),
        38,
        99
      )
    );
    var confidence = Math.round(
      clamp(76 + state.autonomy / 6 - scenario.disruption * 24 - Math.max(0, riskCount - 1) * 3, 61, 96)
    );

    return {
      profile: profile,
      scenario: scenario,
      demandMultiplier: demandMultiplier,
      storageLimit: storageLimit,
      currentUnits: currentUnits,
      availableSpace: availableSpace,
      items: items,
      orders: orders,
      totalPurchase: totalPurchase,
      totalWastePrevented: totalWastePrevented,
      riskCount: riskCount,
      watchCount: watchCount,
      serviceReadiness: serviceReadiness,
      confidence: confidence
    };
  }

  function bestSupplier(item, profile, scenario) {
    var supplierIds = item.suppliers && item.suppliers.length ? item.suppliers : profile.defaultSuppliers;
    return supplierIds
      .map(function (id) {
        var supplier = data.suppliers[id] || data.suppliers[profile.defaultSuppliers[0]];
        var disruptedLead = supplier.baseLeadHours * (1 + scenario.disruption);
        var score =
          supplier.reliability * 42 +
          (1 / supplier.priceIndex) * 22 +
          (1 / (disruptedLead / 8)) * 18 +
          supplier.sustainability * 10 +
          (1 / (supplier.distanceKm / 18)) * 8;
        return Object.assign({ id: id, score: score, disruptedLead: disruptedLead }, supplier);
      })
      .sort(function (a, b) {
        return b.score - a.score;
      })[0];
  }

  function decisionForItem(status, reorderQty, spoilageValue, supplier, item) {
    if (status === "critical" && reorderQty > 0) {
      return t("decisionBuy", {
        qty: number(reorderQty),
        unit: unitLabel(item),
        supplier: label(supplier.name)
      });
    }
    if (spoilageValue > 350) return t("decisionWaste");
    if (status === "watch") return t("decisionWatch");
    return t("decisionNone");
  }

  function buildOrders(rows, availableSpace) {
    var remainingBudget = state.budget - state.approvedValue;
    var remainingSpace = availableSpace;
    var orders = [];

    rows.forEach(function (row) {
      if (remainingBudget <= 0 || remainingSpace <= 0) return;
      var affordableQty = Math.floor(remainingBudget / row.unitCost);
      var spaceQty = Math.floor(remainingSpace);
      var qty = Math.max(0, Math.min(row.reorderQty, affordableQty, spaceQty));
      if (qty < 1) return;
      var value = qty * row.unitCost;
      remainingBudget -= value;
      remainingSpace -= qty;
      orders.push({
        id: row.item.id,
        item: itemLabel(row.item),
        category: categoryLabel(row.item),
        qty: qty,
        unit: unitLabel(row.item),
        value: value,
        supplier: label(row.supplier.name),
        leadHours: row.supplier.disruptedLead,
        reasonKey: row.itemAffected ? "orderReasonTrend" : "orderReasonSafety",
        priority: row.status
      });
    });

    return orders;
  }

  function urgencyScore(row) {
    var shortageWeight = row.reorderQty * row.unitCost;
    var coverageWeight = Math.max(0, 6 - row.coverageDays) * 100;
    var impactWeight = row.item.saleImpact * 12;
    return shortageWeight + coverageWeight + impactWeight;
  }

  function wasteSaving(row) {
    if (row.spoilageValue <= 250) return 0;
    return row.spoilageValue * (state.autonomy / 100) * 0.68;
  }

  function addCustomItem(event) {
    event.preventDefault();
    var name = els.newItemName.value.trim();
    var unit = els.newItemUnit.value.trim();
    if (!name || !unit) return;

    var profile = activeProfile();
    var item = {
      id: "custom-" + Date.now(),
      name: { ar: name, en: name },
      categoryKey: els.newItemCategory.value || "custom",
      unit: { ar: unit, en: unit },
      stock: positiveNumber(els.newItemStock.value, 0),
      dailyDemand: Math.max(1, positiveNumber(els.newItemDailyDemand.value, 1)),
      leadTimeHours: Math.max(1, positiveNumber(els.newItemLeadTime.value, 8)),
      shelfLifeDays: Math.max(1, positiveNumber(els.newItemShelfLife.value, 30)),
      reorderPoint: Math.max(1, positiveNumber(els.newItemReorderPoint.value, 1)),
      unitCost: positiveNumber(els.newItemUnitCost.value, 1),
      saleImpact: clamp(positiveNumber(els.newItemImpact.value, 20), 1, 100),
      suppliers: profile.defaultSuppliers,
      custom: true
    };

    profile.items.push(item);
    saveCustomItems();
    els.addItemForm.reset();
    els.newItemCategory.value = Object.keys(data.categories)[0];
    addLog("agentInventoryName", t("logItemAdded", { name: itemLabel(item) }));
    render();
  }

  function clearCustomItems() {
    var profile = activeProfile();
    profile.items = profile.items.filter(function (item) {
      return !item.custom;
    });
    saveCustomItems();
    addLog("agentInventoryName", t("logItemsCleared"));
    render();
  }

  function approveOrders() {
    var result = analyze();
    if (!result.orders.length) {
      addLog("agentProcurementName", t("logNoOrders"));
      render();
      return;
    }

    result.orders.forEach(function (order) {
      var item = activeProfile().items.find(function (candidate) {
        return candidate.id === order.id;
      });
      if (item) item.stock += order.qty;
    });

    state.approvedValue += result.totalPurchase;
    saveCustomItems();
    addLog(
      "agentProcurementName",
      t("logApproved", { count: result.orders.length, value: money(result.totalPurchase) })
    );
    addLog("agentInventoryName", t("logInventoryUpdated"));
    render();
  }

  function render(announce) {
    var result = analyze();
    updateControlLabels();
    renderKpis(result);
    renderBrain(result);
    renderAgents(result);
    renderOrders(result);
    renderDataHelp(result);
    renderInventory(result);
    renderLog();
    drawDemandChart(result);
    drawCoverageChart(result);
    if (announce !== false) tickClock();
  }

  function updateControlLabels() {
    var profile = activeProfile();
    els.businessName.textContent = label(profile.name) + " - " + label(profile.city);
    els.autonomyValue.textContent = String(state.autonomy);
    els.trendValue.textContent = String(state.trend);
    els.budgetValue.textContent = number(state.budget);
    els.storageValue.textContent = String(state.storage);
  }

  function renderKpis(result) {
    els.riskKpi.textContent = String(result.riskCount);
    els.riskMeta.textContent = t("riskMeta", { count: result.watchCount });
    els.purchaseKpi.textContent = money(result.totalPurchase);
    els.budgetMeta.textContent = result.totalPurchase <= state.budget ? t("budgetOk") : t("budgetHigh");
    els.wasteKpi.textContent = money(result.totalWastePrevented);
    els.serviceKpi.textContent = result.serviceReadiness + "%";
    els.serviceMeta.textContent = t("serviceMeta", { value: result.confidence });
  }

  function renderBrain(result) {
    var topRisk = result.items
      .slice()
      .sort(function (a, b) {
        return urgencyScore(b) - urgencyScore(a);
      })[0];
    els.brainTitle.textContent = label(result.scenario.name);
    els.brainSummary.textContent = t("brainSummary", {
      note: label(result.scenario.note),
      item: topRisk ? itemLabel(topRisk.item) : "-",
      space: number(Math.round(result.availableSpace))
    });
    els.confidenceBadge.textContent = t("confidence", { value: result.confidence });
    els.supplierFlowText.textContent = number(result.orders.length);
    els.inventoryFlowText.textContent = Math.round((result.currentUnits / result.storageLimit) * 100) + "%";
    els.demandFlowText.textContent = "+" + Math.round((result.demandMultiplier - 1) * 100) + "%";
  }

  function renderAgents(result) {
    var demandLift = Math.round((result.demandMultiplier - 1) * 100);
    var agents = [
      {
        code: "TM",
        nameKey: "agentTrendName",
        stateKey: "stateWatching",
        body: t("agentTrendBody", { value: demandLift, scenario: label(result.scenario.name) })
      },
      {
        code: "IW",
        nameKey: "agentInventoryName",
        stateKey: result.riskCount ? "stateAlert" : "stateStable",
        body: t("agentInventoryBody", { risk: result.riskCount, watch: result.watchCount })
      },
      {
        code: "BA",
        nameKey: "agentProcurementName",
        stateKey: result.orders.length ? "stateBuying" : "stateWaiting",
        body: result.orders.length
          ? t("agentProcurementBody", { count: result.orders.length, value: money(result.totalPurchase) })
          : t("agentProcurementIdle")
      },
      {
        code: "WS",
        nameKey: "agentWasteName",
        stateKey: result.totalWastePrevented ? "stateSaving" : "stateWatching",
        body: t("agentWasteBody", { value: money(result.totalWastePrevented) })
      },
      {
        code: "CA",
        nameKey: "agentCoreName",
        stateKey: "stateControl",
        body: t("agentCoreBody")
      }
    ];

    els.agentList.innerHTML = "";
    agents.forEach(function (agent) {
      var row = document.createElement("article");
      row.className = "agent-row";
      row.innerHTML =
        '<div class="agent-code">' +
        agent.code +
        "</div>" +
        '<div class="agent-copy"><div><strong>' +
        t(agent.nameKey) +
        '</strong><span class="mini-badge">' +
        t(agent.stateKey) +
        "</span></div><p>" +
        agent.body +
        "</p></div>";
      els.agentList.appendChild(row);
    });
  }

  function renderOrders(result) {
    els.orderCount.textContent = String(result.orders.length);
    els.orderList.innerHTML = "";

    if (!result.orders.length) {
      var empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = t("noOrders");
      els.orderList.appendChild(empty);
      return;
    }

    result.orders.forEach(function (order) {
      var article = document.createElement("article");
      article.className = "order-row " + order.priority;
      article.innerHTML =
        '<div><strong>' +
        order.item +
        "</strong><span>" +
        t(order.reasonKey) +
        "</span></div>" +
        '<dl><div><dt>' +
        t("qty") +
        "</dt><dd>" +
        number(order.qty) +
        " " +
        order.unit +
        "</dd></div><div><dt>" +
        t("supplier") +
        "</dt><dd>" +
        order.supplier +
        "</dd></div><div><dt>" +
        t("arrival") +
        "</dt><dd>" +
        number(Math.round(order.leadHours)) +
        " " +
        t("hour") +
        "</dd></div><div><dt>" +
        t("value") +
        "</dt><dd>" +
        money(order.value) +
        "</dd></div></dl>";
      els.orderList.appendChild(article);
    });
  }

  function renderDataHelp(result) {
    els.profileSummary.textContent = t("profileSummary", {
      business: label(result.profile.name),
      city: label(result.profile.city),
      items: result.profile.items.length,
      capacity: number(result.profile.capacityUnits)
    });
    var keys = ["helpStock", "helpDailyNeed", "helpDelivery", "helpShelf", "helpReorder", "helpImpact"];
    els.dataHelpList.innerHTML = "";
    keys.forEach(function (key) {
      var li = document.createElement("li");
      li.textContent = t(key);
      els.dataHelpList.appendChild(li);
    });
  }

  function renderInventory(result) {
    var query = els.searchInput.value.trim().toLowerCase();
    var filter = els.statusFilter.value;
    var rows = result.items.filter(function (row) {
      var searchText = [itemLabel(row.item), categoryLabel(row.item), unitLabel(row.item)].join(" ").toLowerCase();
      var matchesText = searchText.indexOf(query) >= 0;
      var matchesFilter = filter === "all" || row.status === filter;
      return matchesText && matchesFilter;
    });

    els.inventoryBody.innerHTML = "";
    rows.forEach(function (row) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td><strong>" +
        itemLabel(row.item) +
        "</strong></td><td>" +
        categoryLabel(row.item) +
        "</td><td>" +
        number(Math.round(row.item.stock)) +
        " " +
        unitLabel(row.item) +
        "</td><td>" +
        number(Math.round(row.seventyTwoHourDemand)) +
        " " +
        unitLabel(row.item) +
        "</td><td>" +
        row.coverageDays.toFixed(1) +
        " " +
        t("day") +
        "</td><td>" +
        statusPill(row.status) +
        "</td><td>" +
        row.decision +
        "</td>";
      els.inventoryBody.appendChild(tr);
    });
  }

  function renderLog() {
    els.activityLog.innerHTML = "";
    state.log.slice(0, 6).forEach(function (event) {
      var li = document.createElement("li");
      li.innerHTML =
        "<strong>" +
        t(event.agentKey) +
        "</strong><span>" +
        event.text +
        "</span><time>" +
        event.time +
        "</time>";
      els.activityLog.appendChild(li);
    });
  }

  function drawDemandChart(result) {
    var canvas = els.demandCanvas;
    var ctx = canvas.getContext("2d");
    prepareCanvas(canvas, ctx);
    var labels = ["0", "+1", "+2", "+3", "+4", "+5"];
    var baseline = result.items.slice(0, 6).map(function (row, index) {
      return row.item.dailyDemand * (1 + index * 0.03);
    });
    var forecast = baseline.map(function (value, index) {
      return value * result.demandMultiplier * (1 + index * 0.025);
    });

    drawAxes(ctx, canvas);
    drawLine(ctx, baseline, "#6f7a84", 2, canvas);
    drawLine(ctx, forecast, "#00856f", 4, canvas);
    drawLegend(ctx, [
      [t("demandNormal"), "#6f7a84"],
      [t("demandForecast"), "#00856f"]
    ]);

    var chartHeight = canvas.getBoundingClientRect().height || canvas.height;
    labels.forEach(function (chartLabel, index) {
      ctx.fillStyle = "#66706a";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(chartLabel, xFor(index, labels.length, canvas), chartHeight - 18);
    });
  }

  function drawCoverageChart(result) {
    var canvas = els.coverageCanvas;
    var ctx = canvas.getContext("2d");
    prepareCanvas(canvas, ctx);
    drawAxes(ctx, canvas);

    var rows = result.items.slice().sort(function (a, b) {
      return a.coverageDays - b.coverageDays;
    });
    var maxDays = Math.max(
      8,
      Math.max.apply(
        null,
        rows.map(function (row) {
          return row.coverageDays;
        })
      )
    );
    var rect = canvas.getBoundingClientRect();
    var barArea = (rect.width || canvas.width) - 150;

    rows.slice(0, 7).forEach(function (row, index) {
      var y = 42 + index * 31;
      var width = (row.coverageDays / maxDays) * barArea;
      ctx.fillStyle = row.status === "critical" ? "#c84242" : row.status === "watch" ? "#b76e00" : "#00856f";
      roundRect(ctx, 96, y, width, 16, 5);
      ctx.fill();
      ctx.fillStyle = "#26302c";
      ctx.font = "12px Arial";
      ctx.textAlign = "right";
      ctx.fillText(itemLabel(row.item), 88, y + 13);
      ctx.textAlign = "left";
      ctx.fillText(row.coverageDays.toFixed(1) + " " + t("day"), 106 + width, y + 13);
    });
  }

  function prepareCanvas(canvas, ctx) {
    var pixelRatio = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    var cssWidth = rect.width || canvas.width;
    var cssHeight = rect.height || canvas.height;
    if (rect.width && rect.height) {
      canvas.width = Math.floor(rect.width * pixelRatio);
      canvas.height = Math.floor(rect.height * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }
    ctx.clearRect(0, 0, cssWidth, cssHeight);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cssWidth, cssHeight);
  }

  function drawAxes(ctx, canvas) {
    var width = canvas.getBoundingClientRect().width || canvas.width;
    var height = canvas.getBoundingClientRect().height || canvas.height;
    ctx.strokeStyle = "#d9dfd8";
    ctx.lineWidth = 1;
    for (var i = 0; i < 5; i += 1) {
      var y = 28 + i * ((height - 64) / 4);
      ctx.beginPath();
      ctx.moveTo(24, y);
      ctx.lineTo(width - 24, y);
      ctx.stroke();
    }
  }

  function drawLine(ctx, values, color, width, canvas) {
    var rect = canvas.getBoundingClientRect();
    var chartWidth = rect.width || canvas.width;
    var chartHeight = rect.height || canvas.height;
    var maxValue = Math.max.apply(null, values) * 1.18;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.beginPath();
    values.forEach(function (value, index) {
      var x = xFor(index, values.length, { width: chartWidth });
      var y = chartHeight - 42 - (value / maxValue) * (chartHeight - 82);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    values.forEach(function (value, index) {
      var x = xFor(index, values.length, { width: chartWidth });
      var y = chartHeight - 42 - (value / maxValue) * (chartHeight - 82);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawLegend(ctx, entries) {
    entries.forEach(function (entry, index) {
      var x = 30 + index * 146;
      ctx.fillStyle = entry[1];
      ctx.fillRect(x, 18, 18, 6);
      ctx.fillStyle = "#26302c";
      ctx.font = "12px Arial";
      ctx.textAlign = "left";
      ctx.fillText(entry[0], x + 26, 24);
    });
  }

  function xFor(index, length, canvas) {
    var width = canvas.getBoundingClientRect ? canvas.getBoundingClientRect().width || canvas.width : canvas.width;
    return 36 + index * ((width - 72) / Math.max(1, length - 1));
  }

  function tickClock() {
    var now = new Date();
    els.clockText.textContent = now.toLocaleTimeString(state.lang === "ar" ? "ar-SA" : "en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function resetLog() {
    state.log = [];
    addLog("agentTrendName", t("logTrendConnected"));
    addLog("agentInventoryName", t("logInventoryChecked"));
    addLog("agentBrainName", t("logReady"));
  }

  function addLog(agentKey, text) {
    state.log.unshift({
      agentKey: agentKey,
      text: text,
      time: new Date().toLocaleTimeString(state.lang === "ar" ? "ar-SA" : "en-US", {
        hour: "2-digit",
        minute: "2-digit"
      })
    });
    state.log = state.log.slice(0, 12);
  }

  function statusPill(status) {
    return '<span class="status-pill ' + status + '">' + t(status) + "</span>";
  }

  function itemLabel(item) {
    return label(item.name);
  }

  function unitLabel(item) {
    return label(item.unit);
  }

  function categoryLabel(item) {
    if (item.categoryName) return label(item.categoryName);
    if (data.categories[item.categoryKey]) return label(data.categories[item.categoryKey]);
    return label(data.categories.custom);
  }

  function label(value) {
    if (typeof value === "string") return value;
    if (!value) return "";
    return value[state.lang] || value.en || value.ar || "";
  }

  function t(key, vars) {
    var dictionary = I18N[state.lang] || I18N.ar;
    var template = dictionary[key] || I18N.ar[key] || key;
    if (!vars) return template;
    return template.replace(/\{\{(\w+)\}\}/g, function (_, name) {
      return vars[name] === undefined ? "" : String(vars[name]);
    });
  }

  function number(value) {
    return Math.round(value).toLocaleString(state.lang === "ar" ? "ar-SA" : "en-US");
  }

  function money(value) {
    return number(value) + " " + t("currency");
  }

  function sum(list, mapper) {
    return list.reduce(function (total, item) {
      return total + mapper(item);
    }, 0);
  }

  function positiveNumber(value, fallback) {
    var parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 0) return fallback;
    return parsed;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function roundRect(ctx, x, y, width, height, radius) {
    var r = Math.min(radius, height / 2, Math.max(0, width / 2));
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function loadSavedItems() {
    var saved = parseJson(readStorage(ITEM_STORAGE_KEY)) || {};
    Object.keys(saved).forEach(function (profileKey) {
      if (!data.profiles[profileKey] || !Array.isArray(saved[profileKey])) return;
      data.profiles[profileKey].items = data.profiles[profileKey].items.concat(saved[profileKey]);
    });
  }

  function saveCustomItems() {
    var saved = {};
    Object.keys(data.profiles).forEach(function (profileKey) {
      saved[profileKey] = data.profiles[profileKey].items.filter(function (item) {
        return item.custom;
      });
    });
    writeStorage(ITEM_STORAGE_KEY, JSON.stringify(saved));
  }

  function readStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      return false;
    }
    return true;
  }

  function parseJson(value) {
    try {
      return value ? JSON.parse(value) : null;
    } catch (error) {
      return null;
    }
  }
})();
