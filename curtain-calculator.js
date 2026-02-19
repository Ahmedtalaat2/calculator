// ==========================================
// 🧮 ملف منطق الحاسبة + الطباعة (Curtain Calculator & Invoice)
// ==========================================

// متغيرات عامة للحالة
let currentTransactionState = { selectedClient: null, totalAmount: 0 };
let carpetSelectedClient = null;
let wallSelectedClient = null;

// مصفوفات البيانات
let curtainData = { 1: { layers: [] } };
let carpetRooms = [];
let wallpaperRooms = [];
let curtainCounter = 1;

// ============================================================
// 🛠️ دالة مساعدة لتوليد الرقم المسلسل الذكي (YYMMDDxxx)
// ============================================================
function generateSmartID(offset = 0) {
  const now = new Date();
  const prefix = `${String(now.getFullYear()).slice(-2)}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  let count = 1;
  if (typeof orders !== "undefined" && Array.isArray(orders)) {
    count =
      orders.filter((o) => String(o.id).startsWith(prefix)).length + 1 + offset;
  }
  return `${prefix}${String(count).padStart(3, "0")}`;
}

// ============================================================
// 1. دوال البحث واختيار العميل
// ============================================================
function handlePhoneSearch(val) {
  genericSearch(val, "search-results-dropdown", selectClient);
}
function handleCarpetSearch(val) {
  genericSearch(val, "carpet-search-results", selectCarpetClient);
}
function handleWallSearch(val) {
  genericSearch(val, "wall-search-results", selectWallClient);
}

function genericSearch(val, dropdownId, selectCallback) {
  const list = document.getElementById(dropdownId);
  list.innerHTML = "";
  const cleanVal = val.replace(/[^0-9]/g, "");

  if (cleanVal.length < 2) {
    list.style.display = "none";
    return;
  }

  const matched = customers.filter((c) => String(c.phone).includes(cleanVal));

  if (matched.length > 0) {
    list.style.display = "block";
    matched.forEach((c) => {
      const item = document.createElement("div");
      item.className = "dropdown-item";
      item.innerHTML = `<span>${c.name}</span><span dir="ltr">${c.phone}</span>`;
      item.onclick = () => {
        selectCallback(c);
        list.style.display = "none";
      };
      list.appendChild(item);
    });
  } else {
    list.style.display = "block";
    const addText =
      typeof t === "function" ? t("quick_add_title") : "+ إضافة عميل جديد";
    list.innerHTML = `<div class="dropdown-item" onclick="openQuickAddWithPhone('${cleanVal}')" style="color:var(--gold); font-weight:bold; cursor:pointer;">${addText}</div>`;
  }
}

function selectClient(c) {
  currentTransactionState.selectedClient = c;
  updateClientCard(
    "selected-client-card",
    "search-box-container",
    "selected-client-name",
    "selected-client-phone",
    "btn-save-transaction",
    c,
  );
}
function selectCarpetClient(c) {
  carpetSelectedClient = c;
  updateClientCard(
    "carpet-selected-client-card",
    "carpet-search-box-container",
    "carpet-client-name",
    "carpet-client-phone",
    "btn-save-carpet",
    c,
  );
}
function selectWallClient(c) {
  wallSelectedClient = c;
  updateClientCard(
    "wall-selected-client-card",
    "wall-search-box-container",
    "wall-client-name",
    "wall-client-phone",
    "btn-save-wall",
    c,
  );
}

function updateClientCard(cardId, searchId, nameId, phoneId, btnId, c) {
  document.getElementById(searchId).style.display = "none";
  document.getElementById(cardId).style.display = "flex";
  document.getElementById(nameId).innerText = c.name;
  document.getElementById(phoneId).innerText = c.phone;
  const btn = document.getElementById(btnId);
  if (btn) btn.disabled = false;
}

function resetClientSelection() {
  genericReset(
    "selected-client-card",
    "search-box-container",
    "btn-save-transaction",
  );
  currentTransactionState.selectedClient = null;
}
function resetCarpetClientSelection() {
  genericReset(
    "carpet-selected-client-card",
    "carpet-search-box-container",
    "btn-save-carpet",
  );
  carpetSelectedClient = null;
}
function resetWallClientSelection() {
  genericReset(
    "wall-selected-client-card",
    "wall-search-box-container",
    "btn-save-wall",
  );
  wallSelectedClient = null;
}

function genericReset(cardId, searchId, btnId) {
  document.getElementById(cardId).style.display = "none";
  document.getElementById(searchId).style.display = "block";
  const btn = document.getElementById(btnId);
  if (btn) btn.disabled = true;
}

// ============================================================
// 2. منطق حاسبة الستائر
// ============================================================
function addCurtain() {
  curtainCounter++;
  const wrapper = document.getElementById("curtains-wrapper");

  const newCurtain = `
        <div class="curtain-card" data-curtain-id="${curtainCounter}">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3><span data-lang="curtain_num">ستارة رقم</span> ${curtainCounter}</h3>
                <button class="danger-btn" onclick="this.closest('.curtain-card').remove()">×</button>
            </div>
            
            <div class="inputs-grid" style="margin-bottom: 10px;">
                <input type="text" class="c-room-name" data-lang-ph="ph_room_name" placeholder="اسم الغرفة" style="border: 1px solid var(--gold); background: rgba(211, 187, 96, 0.1); width: 100%;">
            </div>

            <div class="inputs-grid">
                <input type="number" class="c-width" required data-lang-ph="ph_width" placeholder="عرض الستارة (سم)">
                <input type="number" class="c-height" required data-lang-ph="ph_height" placeholder="ارتفاع الستارة (سم)">
                <input type="number" class="c-sewing-price" required data-lang-ph="ph_sewing" placeholder="سعر متر الخياطة">
            </div>
            <div class="inputs-grid">
                <input type="number" class="c-tassel-price" data-lang-ph="ph_tassel" placeholder="سعر متر الطربوش">
                <input type="number" class="c-side-hold" data-lang-ph="ph_sidehold" placeholder="سعر المسكة الجانبية">
                <input type="number" class="c-hook" data-lang-ph="ph_hook" placeholder="سعر المربط">
            </div>
            <hr>
            <div class="layers-wrapper">
                <div class="layer-card" data-layer-id="1">
                    <h4 data-lang="layer_1">طبقة 1</h4>
                    <div class="inputs-grid">
                        <input type="text" class="l-name" required data-lang-ph="ph_layer_name" placeholder="اسم الطبقة">
                        <input type="number" class="l-fab-width" required data-lang-ph="ph_fab_width" placeholder="عرض القماش (سم)">
                        <input type="number" class="l-fab-price" required data-lang-ph="ph_fab_price" placeholder="سعر متر القماش">
                        <input type="number" class="l-gather" required data-lang-ph="ph_gather" placeholder="الكرمشة">
                    </div>
                    <div class="inputs-grid">
                        <select class="l-rail-type" required>
                            <option value="" data-lang="sel_rail_type">نوع الريل</option>
                            <option>ريل عادي</option><option>ريل ويفي</option><option>ريل امريكي</option><option>ريل روماني</option><option>ريل استيل</option><option>ريل خشب</option>
                        </select>
                        <input type="number" class="l-rail-price" required data-lang-ph="ph_rail_price" placeholder="سعر متر الريل">
                    </div>
                    <div class="layer-actions">
                        <button class="secondary-btn" onclick="addLayer('${curtainCounter}')" data-lang="btn_add_layer">إضافة طبقة</button>
                        <button class="danger-btn" onclick="removeLayer(this)" data-lang="btn_del_layer">حذف الطبقة</button>
                    </div>
                </div>
            </div>
        </div>`;

  wrapper.insertAdjacentHTML("beforeend", newCurtain);
  if (typeof applyLanguage === "function") applyLanguage(currentLang);
}

function addLayer(curtainId) {
  const curtainCard = document.querySelector(
    `.curtain-card[data-curtain-id="${curtainId}"]`,
  );
  const layersWrapper = curtainCard.querySelector(".layers-wrapper");
  const layerId = layersWrapper.children.length + 1;

  const layerHtml = `
        <div class="layer-card" data-layer-id="${layerId}">
            <h4><span data-lang="ph_layer_name">طبقة</span> ${layerId}</h4>
            <div class="inputs-grid">
                <input type="text" class="l-name" required data-lang-ph="ph_layer_name" placeholder="اسم الطبقة">
                <input type="number" class="l-fab-width" required data-lang-ph="ph_fab_width" placeholder="عرض القماش (سم)">
                <input type="number" class="l-fab-price" required data-lang-ph="ph_fab_price" placeholder="سعر متر القماش">
                <input type="number" class="l-gather" required data-lang-ph="ph_gather" placeholder="الكرمشة">
            </div>
            <div class="inputs-grid">
                <select class="l-rail-type" required>
                    <option value="" data-lang="sel_rail_type">نوع الريل</option>
                    <option>ريل عادي</option><option>ريل ويفي</option><option>ريل امريكي</option><option>ريل روماني</option><option>ريل استيل</option><option>ريل خشب</option>
                </select>
                <input type="number" class="l-rail-price" required data-lang-ph="ph_rail_price" placeholder="سعر متر الريل">
            </div>
            <div class="layer-actions">
                <button class="danger-btn" onclick="removeLayer(this)" data-lang="btn_del_layer">حذف الطبقة</button>
            </div>
        </div>`;

  layersWrapper.insertAdjacentHTML("beforeend", layerHtml);
  if (typeof applyLanguage === "function") applyLanguage(currentLang);
}

function removeLayer(btn) {
  const layers = btn.closest(".layers-wrapper");
  if (layers.children.length > 1) {
    btn.closest(".layer-card").remove();
  } else {
    alert(
      typeof t === "function"
        ? "Layer Required"
        : "يجب وجود طبقة واحدة على الأقل!",
    );
  }
}

function calculateCurtains() {
  let orderGrandTotal = 0;
  const allCurtains = document.querySelectorAll(".curtain-card");
  const previewBody = document.getElementById("preview-body");
  const previewArea = document.getElementById("quick-preview-area");
  if (previewBody) previewBody.innerHTML = "";

  allCurtains.forEach((curtain) => {
    const roomName =
      curtain.querySelector(".c-room-name").value ||
      `ستارة رقم ${curtain.dataset.curtainId || "1"}`;
    const width = parseFloat(curtain.querySelector(".c-width").value) || 0;
    const height = parseFloat(curtain.querySelector(".c-height").value) || 0;
    const sewingPrice =
      parseFloat(curtain.querySelector(".c-sewing-price").value) || 0;
    const tasselPrice =
      parseFloat(curtain.querySelector(".c-tassel-price").value) || 0;
    const sideHold =
      parseFloat(curtain.querySelector(".c-side-hold").value) || 0;
    const hook = parseFloat(curtain.querySelector(".c-hook").value) || 0;

    let curtainSubTotal = 0;
    let layersDetailsHtml = "";

    const layers = curtain.querySelectorAll(".layer-card");
    layers.forEach((layer) => {
      const lName = layer.querySelector(".l-name").value || "طبقة";
      const fabWidth =
        parseFloat(layer.querySelector(".l-fab-width").value) || 1;
      const fabPrice =
        parseFloat(layer.querySelector(".l-fab-price").value) || 0;
      const gather = parseFloat(layer.querySelector(".l-gather").value) || 1;
      const railPrice =
        parseFloat(layer.querySelector(".l-rail-price").value) || 0;

      const actualWidth = width + 20;
      const gatheredWidth = actualWidth * gather;
      const pieces = Math.ceil(gatheredWidth / fabWidth);
      const actualHeight = (height + 20) / 100;
      const fabricMeters = pieces * actualHeight;
      const fabricCost = fabricMeters * fabPrice;
      const railCost = (width / 100) * railPrice;

      curtainSubTotal += fabricCost + railCost;
      layersDetailsHtml += `<div style="font-size: 0.9em; margin-bottom: 2px;">${lName}: <strong>${fabricMeters.toFixed(2)} م</strong></div>`;
    });

    const sewingCost = (width / 100) * sewingPrice;
    const totalBeforeTax =
      curtainSubTotal + sewingCost + tasselPrice + sideHold + hook;
    const finalCurtainTotal = totalBeforeTax * 1.05;

    orderGrandTotal += finalCurtainTotal;

    if (previewBody) {
      const row = `
                <tr>
                    <td style="font-weight:bold; color:var(--gold);">${roomName}</td>
                    <td>${layers.length}</td>
                    <td style="text-align: right;">${layersDetailsHtml}</td>
                    <td style="font-weight:bold; color:#d3bb60;">${finalCurtainTotal.toFixed(2)}</td>
                </tr>`;
      previewBody.insertAdjacentHTML("beforeend", row);
    }
  });

  if (previewArea) {
    previewArea.style.display = "block";
    document.getElementById("preview-grand-total").innerText =
      orderGrandTotal.toFixed(2);
    previewArea.scrollIntoView({ behavior: "smooth" });
  }

  const salesEl = document.getElementById("total-sales-dash");
  if (salesEl)
    salesEl.innerText =
      orderGrandTotal.toFixed(2) +
      " " +
      (typeof t === "function" ? t("currency") : "AED");

  const linkingArea = document.getElementById("customer-linking-area");
  if (linkingArea) {
    linkingArea.style.display = "block";
    currentTransactionState.totalAmount = orderGrandTotal;
    linkingArea.scrollIntoView({ behavior: "smooth" });
  }
}

// ============================================================
// 3. 🔥 حفظ المعاملات
// ============================================================

// أ. حفظ الستائر
function saveTransactionToSheet() {
  const client = currentTransactionState.selectedClient;
  const allCurtains = document.querySelectorAll(".curtain-card");

  if (!client || allCurtains.length === 0) {
    alert(
      typeof t === "function"
        ? t("no_orders")
        : "تأكد من اختيار عميل وإضافة ستائر!",
    );
    return;
  }

  const btn = document.getElementById("btn-save-transaction");
  const originalText = btn.innerHTML;
  btn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> ' +
    (typeof t === "function" ? t("saving") : "جاري الحفظ...");
  btn.disabled = true;

  const fetchPromises = [];

  allCurtains.forEach((curtain, index) => {
    const roomName =
      curtain.querySelector(".c-room-name").value || `Curtain ${index + 1}`;
    const previewRow = document.querySelectorAll("#preview-body tr")[index];
    let curtainPrice = 0;
    if (previewRow)
      curtainPrice = parseFloat(previewRow.cells[3].innerText) || 0;

    if (curtainPrice > 0) {
      const smartID = generateSmartID(index);

      if (typeof addNewOrderToTracking === "function") {
        addNewOrderToTracking(
          client.name,
          client.phone,
          client.address,
          "Curtains",
          curtainPrice,
          roomName,
        );
      }

      const transactionData = {
        type: "transaction",
        id: smartID,
        date: new Date().toLocaleDateString("en-GB"),
        clientName: client.name,
        clientPhone: client.clientPhone || client.phone,
        clientAddress: client.address || "استلام من المعرض",
        serviceType: "تفصيل ستائر",
        total: curtainPrice,
        details: roomName,
        password: CURRENT_PASSWORD,
      };

      if (typeof scriptURL !== "undefined") {
        const p = fetch(scriptURL, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(transactionData),
        });
        fetchPromises.push(p);
      }
    }
  });

  Promise.all(fetchPromises)
    .then(() => {
      alert(typeof t === "function" ? t("saved") : "تم الحفظ بنجاح!");
      btn.innerHTML = "✅";
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 3000);
    })
    .catch(() => {
      alert(typeof t === "function" ? t("error") : "حدث خطأ");
      btn.disabled = false;
      btn.innerHTML = originalText;
    });
}

// ب. حفظ السجاد
function saveCarpetTransaction() {
  if (!carpetSelectedClient || carpetRooms.length === 0) {
    alert(typeof t === "function" ? t("error") : "بيانات ناقصة");
    return;
  }

  const btn = document.getElementById("btn-save-carpet");
  const originalText = btn.innerHTML;
  btn.innerHTML = typeof t === "function" ? t("saving") : "جاري الحفظ...";
  btn.disabled = true;

  const fetchPromises = [];

  carpetRooms.forEach((room, index) => {
    const smartID = generateSmartID(index);

    if (typeof addNewOrderToTracking === "function") {
      addNewOrderToTracking(
        carpetSelectedClient.name,
        carpetSelectedClient.phone,
        carpetSelectedClient.address,
        "Carpet",
        room.final,
        `${room.name} (${room.area}m²)`,
      );
    }

    const data = {
      type: "transaction",
      id: smartID,
      date: new Date().toLocaleDateString("en-GB"),
      clientName: carpetSelectedClient.name,
      clientPhone: carpetSelectedClient.phone,
      clientAddress: carpetSelectedClient.address || "استلام من المعرض",
      serviceType: "بيع سجاد",
      total: room.final,
      details: `${room.name} (${room.area}m²)`,
      password: CURRENT_PASSWORD,
    };

    const p = fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    });
    fetchPromises.push(p);
  });

  Promise.all(fetchPromises).then(() => {
    alert(typeof t === "function" ? t("saved") : "تم الحفظ");
    btn.innerHTML = "✅";
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 3000);
  });
}

// ج. حفظ ورق الجدران
function saveWallTransaction() {
  if (!wallSelectedClient || wallpaperRooms.length === 0) {
    alert(typeof t === "function" ? t("error") : "بيانات ناقصة");
    return;
  }
  const btn = document.getElementById("btn-save-wall");
  const originalText = btn.innerHTML;
  btn.innerHTML = typeof t === "function" ? t("saving") : "جاري الحفظ...";
  btn.disabled = true;

  const fetchPromises = [];

  wallpaperRooms.forEach((room, index) => {
    const smartID = generateSmartID(index);

    if (typeof addNewOrderToTracking === "function") {
      addNewOrderToTracking(
        wallSelectedClient.name,
        wallSelectedClient.phone,
        wallSelectedClient.address,
        "Wallpaper",
        room.final,
        `${room.name} (${room.rolls} rolls)`,
      );
    }

    const data = {
      type: "transaction",
      id: smartID,
      date: new Date().toLocaleDateString("en-GB"),
      clientName: wallSelectedClient.name,
      clientPhone: wallSelectedClient.phone,
      clientAddress: wallSelectedClient.address || "استلام من المعرض",
      serviceType: "ورق جدران",
      total: room.final,
      details: `${room.name} (${room.rolls} Rolls)`,
      password: CURRENT_PASSWORD,
    };

    const p = fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    });
    fetchPromises.push(p);
  });

  Promise.all(fetchPromises).then(() => {
    alert(typeof t === "function" ? t("saved") : "تم الحفظ");
    btn.innerHTML = "✅";
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 3000);
  });
}

// ============================================================
// 4. الطباعة (PDF) - 🛠️ تم التعديل لحل مشكلة الشاشة البيضاء
// ============================================================
// ============================================================
// 4. الطباعة (PDF QUOTATION ENGINE) - Corporate Version
// ============================================================
function generateProInvoice(type) {
  if (typeof html2pdf === "undefined") {
    alert("Error: PDF Library missing");
    return;
  }

  let client = null;
  let items = [];
  let grandTotal = 0;

  // 1. Curtain Logic - Detailed Breakdown
  if (type === "curtain") {
    client = currentTransactionState.selectedClient;
    if (!client) {
      alert(typeof t === "function" ? t("error") : "Select Client First");
      return;
    }

    document.getElementById("inv-desc-title").innerText = "Curtains & Upholstery Works";

    const allCurtains = document.querySelectorAll(".curtain-card");
    let serialNo = 1;

    allCurtains.forEach((curtain, idx) => {
      const roomName = curtain.querySelector(".c-room-name").value || `Curtain ${idx + 1}`;
      const wVal = parseFloat(curtain.querySelector(".c-width").value) || 0;
      const hVal = parseFloat(curtain.querySelector(".c-height").value) || 0;

      const wMtr = wVal / 100;
      const hMtr = hVal / 100;

      // --- Row 1: Header Row (Curtain Summary) ---
      // We need to calculate total gross for this curtain first to show it in the header?
      // Logic says: "Show the Total Gross Amount of the entire curtain here."
      // So we might need to calculate layers first then sum it up.

      let curtainItems = [];
      let curtainTotalGross = 0;

      // --- Layers (Fabric) ---
      const layers = curtain.querySelectorAll(".layer-card");
      layers.forEach((layer) => {
        const lName = layer.querySelector(".l-name").value || "Fabric Layer";
        const fabWidth = parseFloat(layer.querySelector(".l-fab-width").value) || 0;
        const fabPrice = parseFloat(layer.querySelector(".l-fab-price").value) || 0;
        const gather = parseFloat(layer.querySelector(".l-gather").value) || 1;
        const railPrice = parseFloat(layer.querySelector(".l-rail-price").value) || 0;
        const railType = layer.querySelector(".l-rail-type").value || "Normal Rail";

        // Fabric Calculation
        if (fabWidth > 0 && fabPrice > 0) {
          const actualW = wVal + 20;
          const gatheredW = actualW * gather;
          const pieces = Math.ceil(gatheredW / fabWidth);
          const actualH = (hVal + 20) / 100; // Meters
          const qtyMtrs = pieces * actualH;

          const amount = qtyMtrs * fabPrice;
          const tax = amount * 0.05;
          const gross = amount + tax;
          curtainTotalGross += gross;

          curtainItems.push({
            desc: `Fabric: ${lName} (Ratio: ${gather})`,
            sizeW: "-", sizeH: "-",
            unit: "Mtr",
            qty: qtyMtrs.toFixed(2),
            price: fabPrice.toFixed(2),
            amount: amount.toFixed(2),
            taxAmt: tax.toFixed(2),
            gross: gross.toFixed(2)
          });
        }

        // Rail Calculation (Per Layer?) -> Usually distinct but logic says "Row 3: Rail Layer"
        if (railPrice > 0) {
          const amount = wMtr * railPrice;
          const tax = amount * 0.05;
          const gross = amount + tax;
          curtainTotalGross += gross;

          curtainItems.push({
            desc: `Rail: ${railType}`,
            sizeW: wMtr.toFixed(2), sizeH: "-",
            unit: "Mtr",
            qty: wMtr.toFixed(2),
            price: railPrice.toFixed(2),
            amount: amount.toFixed(2),
            taxAmt: tax.toFixed(2),
            gross: gross.toFixed(2)
          });
        }
      });

      // --- Stitching (Sewing) ---
      const sewingPrice = parseFloat(curtain.querySelector(".c-sewing-price").value) || 0;
      if (sewingPrice > 0) {
        const amount = wMtr * sewingPrice;
        const tax = amount * 0.05;
        const gross = amount + tax;
        curtainTotalGross += gross;

        curtainItems.push({
          desc: "Stitching & Fixing",
          sizeW: wMtr.toFixed(2), sizeH: "-",
          unit: "Mtr",
          qty: wMtr.toFixed(2),
          price: sewingPrice.toFixed(2),
          amount: amount.toFixed(2),
          taxAmt: tax.toFixed(2),
          gross: gross.toFixed(2)
        });
      }

      // --- Accessories ---
      const tasselPrice = parseFloat(curtain.querySelector(".c-tassel-price").value) || 0;
      const sideHold = parseFloat(curtain.querySelector(".c-side-hold").value) || 0;
      const hook = parseFloat(curtain.querySelector(".c-hook").value) || 0;
      const accTotal = tasselPrice + sideHold + hook;

      if (accTotal > 0) {
        const amount = accTotal; // Assuming inputs are total price or unit? Logic says "Unit=Set, Qty=1"
        // If inputs are "price per meter", this logic changes. 
        // Previous code: totalBeforeTax = ... + tasselPrice + sideHold + hook; so they were treated as lump sums.
        const tax = amount * 0.05;
        const gross = amount + tax;
        curtainTotalGross += gross;

        curtainItems.push({
          desc: "Accessories (Tassel/Hooks)",
          sizeW: "-", sizeH: "-",
          unit: "Set",
          qty: "1.00",
          price: amount.toFixed(2),
          amount: amount.toFixed(2),
          taxAmt: tax.toFixed(2),
          gross: gross.toFixed(2)
        });
      }

      grandTotal += curtainTotalGross;

      // Push Header Row First
      items.push({
        no: serialNo++,
        desc: `<b>${roomName}</b> - Opening Size`,
        sizeW: wMtr.toFixed(2),
        sizeH: hMtr.toFixed(2),
        unit: "No",
        qty: "1.00",
        price: "-",
        amount: "-",
        taxAmt: "-",
        gross: `<b>${curtainTotalGross.toFixed(2)}</b>`,
        isHeader: true
      });

      // Push Details
      items.push(...curtainItems);
    });

  } else if (type === "carpet") {
    client = carpetSelectedClient;
    if (!client) { alert("Select Client"); return; }
    document.getElementById("inv-desc-title").innerText = "Carpet Works";

    // Simple mapping for carpet
    carpetRooms.forEach((r, i) => {
      // r.price is Unit Price, r.final is Gross
      const gross = parseFloat(r.final);
      const amount = gross / 1.05; // Back calc
      const tax = gross - amount;

      items.push({
        no: i + 1,
        desc: `Carpet: ${r.name}`,
        sizeW: "-", sizeH: "-",
        unit: "Sq.m",
        qty: r.area, // Area as Qty
        price: parseFloat(r.price).toFixed(2),
        amount: amount.toFixed(2),
        taxAmt: tax.toFixed(2),
        gross: gross.toFixed(2)
      });
      grandTotal += gross;
    });

  } else { // Wallpaper
    client = wallSelectedClient;
    if (!client) { alert("Select Client"); return; }
    document.getElementById("inv-desc-title").innerText = "Wallpaper Works";

    wallpaperRooms.forEach((r, i) => {
      const gross = parseFloat(r.final);
      const amount = gross / 1.05;
      const tax = gross - amount;

      items.push({
        no: i + 1,
        desc: `Wallpaper: ${r.name}`,
        sizeW: r.totalWidth, sizeH: "-", // Width logic varies
        unit: "Rolls",
        qty: r.rolls,
        price: (amount / r.rolls).toFixed(2), // Avg price per roll
        amount: amount.toFixed(2),
        taxAmt: tax.toFixed(2),
        gross: gross.toFixed(2)
      });
      grandTotal += gross;
    });
  }

  // --- Render to HTML ---
  const tbody = document.getElementById("inv-table-body");
  tbody.innerHTML = "";

  items.forEach(item => {
    const bgStyle = item.isHeader ? 'background-color:#f9f9f9;' : '';
    const fontStyle = item.isHeader ? 'font-weight:bold;' : '';

    tbody.innerHTML += `
        <tr style="${bgStyle}">
            <td style="text-align:center;">${item.no || '-'}</td>
            <td class="desc-col">${item.desc}</td>
            <td style="text-align:center;">${item.sizeW}</td>
            <td style="text-align:center;">${item.sizeH}</td>
            <td style="text-align:center;">${item.unit}</td>
            <td style="text-align:center;">${item.qty}</td>
            <td style="text-align:center;">${item.price}</td>
            <td style="text-align:center;">${item.amount}</td>
            <td style="text-align:center;">5%</td>
            <td style="text-align:center;">${item.taxAmt}</td>
            <td style="text-align:center; ${fontStyle}">${item.gross}</td>
        </tr>
      `;
  });

  // --- Header Data ---
  document.getElementById("inv-no").innerText = "QT-" + Date.now().toString().slice(-6);
  document.getElementById("inv-date").innerText = new Date().toLocaleDateString("en-GB");
  document.getElementById("inv-client-name").innerText = client.name;
  document.getElementById("inv-client-phone").innerText = client.phone;
  document.getElementById("inv-client-addr").innerText = client.address || "";

  // --- Totals ---
  const totalBefore = grandTotal / 1.05;
  const totalTax = grandTotal - totalBefore;

  document.getElementById("inv-total-before").innerText = totalBefore.toLocaleString(undefined, { minimumFractionDigits: 2 });
  document.getElementById("inv-total-tax").innerText = totalTax.toLocaleString(undefined, { minimumFractionDigits: 2 });
  document.getElementById("inv-grand-total").innerText = grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 });

  // --- Generate PDF ---
  const element = document.getElementById("invoice-template");
  element.style.display = "block"; // Show for rendering

  const opt = {
    margin: 0,
    filename: `Quotation_${client.name}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  setTimeout(() => {
    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        element.style.display = "none"; // Hide after save
      });
  }, 500);
}

// ============================================================
// 5. منطق حاسبة السجاد
// ============================================================
function addCarpetRoom() {
  const name = document.getElementById("carpet-room-name").value;
  const w = parseFloat(document.getElementById("carpet-width").value) || 0;
  const l = parseFloat(document.getElementById("carpet-length").value) || 0;
  const p = parseFloat(document.getElementById("carpet-price").value) || 0;

  if (!name || w === 0) {
    alert(typeof t === "function" ? t("error") : "Error");
    return;
  }

  const area = w * l;
  const finalPrice = area * p * 1.05;

  carpetRooms.push({
    id: Date.now(),
    name,
    area: area.toFixed(2),
    price: p,
    final: finalPrice.toFixed(2),
  });
  renderCarpetTable();

  document.getElementById("carpet-room-name").value = "";
  document.getElementById("carpet-width").value = "";
  document.getElementById("carpet-length").value = "";
  document.getElementById("carpet-price").value = "";
}

function renderCarpetTable() {
  const tbody = document.getElementById("carpet-body");
  tbody.innerHTML = "";
  let totalSum = 0;

  carpetRooms.forEach((room, index) => {
    totalSum += parseFloat(room.final);
    tbody.insertAdjacentHTML(
      "beforeend",
      `<tr><td>${index + 1}</td><td>${room.name}</td><td dir="ltr">${room.area} m²</td><td>${room.price}</td><td style="font-weight:bold; color:var(--gold);">${room.final}</td><td><button onclick="removeCarpetRoom(${room.id})" style="color:red;background:none;border:none;">×</button></td></tr>`,
    );
  });

  document.getElementById("carpet-grand-total").innerText = totalSum.toFixed(2);
  if (carpetRooms.length > 0) {
    document.getElementById("carpet-preview-area").style.display = "block";
    document.getElementById("carpet-linking-area").style.display = "block";
  }
}

function removeCarpetRoom(id) {
  if (confirm("Delete?")) {
    carpetRooms = carpetRooms.filter((r) => r.id !== id);
    renderCarpetTable();
  }
}

// ============================================================
// 6. منطق حاسبة ورق الجدران
// ============================================================
function addWallInput() {
  const container = document.getElementById("walls-container");
  const count = container.children.length + 1;
  const div = document.createElement("div");
  div.className = "wall-row inputs-grid";
  div.innerHTML = `<input type="text" class="wall-name" placeholder="Wall ${count}" value="Wall ${count}"><input type="number" class="wall-width" data-lang-ph="ph_wall_width" placeholder="عرض الجدار"><button class="danger-btn remove-wall-btn" onclick="this.parentElement.remove()">×</button>`;
  container.appendChild(div);

  if (typeof applyLanguage === "function") applyLanguage(currentLang);
}

function removeWallInput(btn) {
  btn.parentElement.remove();
}

function calculateWallpaperRoom() {
  const roomName = document.getElementById("wall-room-name").value;
  const h = parseFloat(document.getElementById("wall-height").value) || 0;
  const rW = parseFloat(document.getElementById("roll-width").value) || 0;
  const rL = parseFloat(document.getElementById("roll-length").value) || 0;
  const price = parseFloat(document.getElementById("roll-price").value) || 0;

  if (!roomName || h === 0 || rW === 0) {
    alert(typeof t === "function" ? t("error") : "Error");
    return;
  }

  let totalWidth = 0;
  document
    .querySelectorAll(".wall-width")
    .forEach((inp) => (totalWidth += parseFloat(inp.value) || 0));

  const strips = Math.ceil(totalWidth / rW);
  const stripsPerRoll = Math.floor(rL / h);
  const rolls = Math.ceil(strips / stripsPerRoll);
  const finalPrice = rolls * price * 1.05;

  wallpaperRooms.push({
    id: Date.now(),
    name: roomName,
    totalWidth,
    rolls,
    final: finalPrice.toFixed(2),
  });
  renderWallTable();
}

function renderWallTable() {
  const tbody = document.getElementById("wall-body");
  tbody.innerHTML = "";
  let total = 0,
    rolls = 0;

  wallpaperRooms.forEach((r) => {
    total += parseFloat(r.final);
    rolls += r.rolls;
    tbody.insertAdjacentHTML(
      "beforeend",
      `<tr><td>-</td><td>${r.name}</td><td>-</td><td>${r.totalWidth}</td><td>${r.rolls}</td><td>${r.final}</td><td><button onclick="removeWallRoom(${r.id})" style="color:red;background:none;border:none;">×</button></td></tr>`,
    );
  });

  document.getElementById("wall-grand-total").innerText = total.toFixed(2);
  document.getElementById("wall-total-rolls").innerText = rolls;
  if (wallpaperRooms.length > 0) {
    document.getElementById("wall-preview-area").style.display = "block";
    document.getElementById("wall-linking-area").style.display = "block";
  }
}

function removeWallRoom(id) {
  if (confirm("Delete?")) {
    wallpaperRooms = wallpaperRooms.filter((r) => r.id !== id);
    renderWallTable();
  }
}
