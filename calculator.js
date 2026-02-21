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
      layersDetailsHtml += `<div style="font-size: 0.9em; margin-bottom: 2px;">${lName}: <strong>${fabricMeters.toLocaleString('en-US', { maximumFractionDigits: 2 })} م</strong></div>`;
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
                    <td style="font-weight:bold; color:#d3bb60;">${finalCurtainTotal.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                </tr>`;
      previewBody.insertAdjacentHTML("beforeend", row);
    }
  });

  if (previewArea) {
    previewArea.style.display = "block";
    document.getElementById("preview-grand-total").innerText =
      orderGrandTotal.toLocaleString('en-US', { maximumFractionDigits: 2 });
    previewArea.scrollIntoView({ behavior: "smooth" });
  }

  const salesEl = document.getElementById("total-sales-dash");
  if (salesEl)
    salesEl.innerHTML =
      orderGrandTotal.toLocaleString('en-US', { maximumFractionDigits: 2 }) +
      ' <span style="font-size:0.6em">' + (typeof t === "function" ? t("currency") : "AED") + '</span>';

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
      curtainPrice = parseFloat(previewRow.cells[3].innerText.replace(/,/g, '')) || 0;

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
// 4. الطباعة (PDF) - بناء الجدول التفصيلي مطابق لملف الـ Excel 🛠️
// ============================================================
function generateProInvoice(type) {
  if (typeof html2pdf === "undefined") {
    alert("Error: PDF Library missing");
    return;
  }

  let client = null, grandTotalBefore = 0, itemsHtml = "";

  if (type === "curtain") {
    client = currentTransactionState.selectedClient;
    document.getElementById("inv-desc-title").innerText = "تفصيل وتركيب ستائر";

    const allCurtains = document.querySelectorAll(".curtain-card");
    let curtainIndex = 65; // يبدأ بحرف 'A'

    allCurtains.forEach((curtain) => {
      const roomName = curtain.querySelector(".c-room-name").value || `Opening size`;
      const wCm = parseFloat(curtain.querySelector(".c-width").value) || 0;
      const hCm = parseFloat(curtain.querySelector(".c-height").value) || 0;
      const sewingPrice = parseFloat(curtain.querySelector(".c-sewing-price").value) || 0;

      const wMtr = wCm / 100;
      const hMtr = hCm / 100;
      const charIndex = String.fromCharCode(curtainIndex);

      let curtainTotalBefore = 0;
      let subRowsHtml = "";

      // حساب الطبقات (قماش، شيفون، ريل)
      const layers = curtain.querySelectorAll(".layer-card");
      layers.forEach((layer, lIndex) => {
        const lName = layer.querySelector(".l-name").value || "Similar Fabric";
        const fabWidth = parseFloat(layer.querySelector(".l-fab-width").value) || 1;
        const fabPrice = parseFloat(layer.querySelector(".l-fab-price").value) || 0;
        const gather = parseFloat(layer.querySelector(".l-gather").value) || 1;
        const railType = layer.querySelector(".l-rail-type").value || "Weave";
        const railPrice = parseFloat(layer.querySelector(".l-rail-price").value) || 0;

        // معادلات حساب القماش
        const actualW = wCm + 20;
        const gatheredW = actualW * gather;
        const pieces = Math.ceil(gatheredW / fabWidth);
        const actualH = (hCm + 20) / 100;
        const fabricQty = pieces * actualH;

        // سطر القماش (Fabric or Sheer)
        let fabAmt = fabricQty * fabPrice;
        curtainTotalBefore += fabAmt;
        let layerLabel = lIndex === 0 ? 'Fabric Item :' : 'Sheer Item :';
        subRowsHtml += `
          <tr>
            <td></td><td class="desc-col">${layerLabel} ${lName}</td>
            <td>${fabricQty.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td><td></td><td>Mtr</td>
            <td>${fabricQty.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td><td>${fabPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
            <td>${fabAmt.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td><td>0.05</td>
            <td>${(fabAmt * 0.05).toLocaleString('en-US', { maximumFractionDigits: 3 })}</td><td style="font-weight:bold;">${(fabAmt * 1.05).toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
          </tr>`;

        // سطر الريل (Rail)
        if (railPrice > 0) {
          let railAmt = wMtr * railPrice;
          curtainTotalBefore += railAmt;
          let railLabel = lIndex === 0 ? 'Rail Fabric :' : 'Rail Sheer :';
          subRowsHtml += `
            <tr>
              <td></td><td class="desc-col">${railLabel} ${railType}</td>
              <td></td><td></td><td>Mtr</td>
              <td>${wMtr.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td><td>${railPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
              <td>${railAmt.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td><td>0.05</td>
              <td>${(railAmt * 0.05).toLocaleString('en-US', { maximumFractionDigits: 3 })}</td><td style="font-weight:bold;">${(railAmt * 1.05).toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
            </tr>`;
        }
      });

      // سطر الخياطة (Stitching)
      if (sewingPrice > 0) {
        let sewAmt = wMtr * sewingPrice;
        curtainTotalBefore += sewAmt;
        subRowsHtml += `
          <tr>
            <td></td><td class="desc-col">Stitching and Fixed</td>
            <td></td><td></td><td>Mtr</td>
            <td>${wMtr.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td><td>${sewingPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
            <td>${sewAmt.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td><td>0.05</td>
            <td>${(sewAmt * 0.05).toLocaleString('en-US', { maximumFractionDigits: 3 })}</td><td style="font-weight:bold;">${(sewAmt * 1.05).toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
          </tr>`;
      }

      // سطر الإكسسوارات (إن وجدت)
      const tassel = parseFloat(curtain.querySelector(".c-tassel-price").value) || 0;
      const hook = parseFloat(curtain.querySelector(".c-hook").value) || 0;
      const accAmt = tassel + hook;
      if (accAmt > 0) {
        curtainTotalBefore += accAmt;
        subRowsHtml += `
          <tr>
            <td></td><td class="desc-col">Accessories</td>
            <td></td><td></td><td>Set</td>
            <td>1</td><td>${accAmt.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
            <td>${accAmt.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td><td>0.05</td>
            <td>${(accAmt * 0.05).toLocaleString('en-US', { maximumFractionDigits: 3 })}</td><td style="font-weight:bold;">${(accAmt * 1.05).toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
          </tr>`;
      }

      // السطر الرئيسي للستارة (يحمل الإجمالي)
      let curtainTax = curtainTotalBefore * 0.05;
      let curtainGross = curtainTotalBefore + curtainTax;
      grandTotalBefore += curtainTotalBefore;

      itemsHtml += `
        <tr style="background-color: #f9f9f9; font-weight: bold;">
          <td>${charIndex}</td>
          <td class="desc-col">${roomName}</td>
          <td>${wMtr.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td><td>${hMtr.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
          <td>Mtr</td><td>1</td><td></td>
          <td>${curtainTotalBefore.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td><td>0.05</td>
          <td>${curtainTax.toLocaleString('en-US', { maximumFractionDigits: 3 })}</td><td>${curtainGross.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
        </tr>
      ` + subRowsHtml + `<tr><td colspan="11" style="height:10px; border:none;"></td></tr>`; // مسافة بين كل ستارة

      curtainIndex++;
    });

  } else if (type === "carpet") {
    client = carpetSelectedClient;
    document.getElementById("inv-desc-title").innerText = "Carpet Supply";
    carpetRooms.forEach((r, i) => {
      let gross = parseFloat(r.final);
      let valBefore = gross / 1.05;
      grandTotalBefore += valBefore;
      itemsHtml += `<tr><td>${i + 1}</td><td class="desc-col" style="text-align:left;">Carpet: ${r.name}</td><td>${r.area}</td><td></td><td>Sqm</td><td>1</td><td>${parseFloat(r.price).toLocaleString('en-US', { maximumFractionDigits: 2 })}</td><td>${valBefore.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td><td>0.05</td><td>${(gross - valBefore).toLocaleString('en-US', { maximumFractionDigits: 3 })}</td><td style="font-weight:bold;">${gross.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td></tr>`;
    });
  } else {
    client = wallSelectedClient;
    document.getElementById("inv-desc-title").innerText = "Wallpaper Supply";
    wallpaperRooms.forEach((r, i) => {
      let gross = parseFloat(r.final);
      let valBefore = gross / 1.05;
      grandTotalBefore += valBefore;
      let pricePerRoll = valBefore / r.rolls;
      itemsHtml += `<tr><td>${i + 1}</td><td class="desc-col" style="text-align:left;">Wallpaper: ${r.name}</td><td>Rolls</td><td></td><td>Pcs</td><td>${r.rolls}</td><td>${pricePerRoll.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td><td>${valBefore.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td><td>0.05</td><td>${(gross - valBefore).toLocaleString('en-US', { maximumFractionDigits: 3 })}</td><td style="font-weight:bold;">${gross.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td></tr>`;
    });
  }

  if (!client) {
    alert("برجاء اختيار عميل أولاً");
    return;
  }

  // ملء بيانات العميل والتواريخ
  document.getElementById("inv-no").innerText = "QT-" + Date.now().toString().slice(-6);
  document.getElementById("inv-date").innerText = new Date().toLocaleDateString("en-GB");
  document.getElementById("inv-client-name").innerText = client.name;
  document.getElementById("inv-client-phone").innerText = client.phone;
  document.getElementById("inv-client-addr").innerText = client.address || "";

  const clientSig = document.getElementById("inv-sig-client");
  if (clientSig) clientSig.innerText = client.name;

  document.getElementById("inv-table-body").innerHTML = itemsHtml;

  // الحسابات النهائية أسفل الفاتورة
  let finalTax = grandTotalBefore * 0.05;
  let finalGross = grandTotalBefore + finalTax;
  document.getElementById("inv-total-before").innerText = grandTotalBefore.toLocaleString('en-US', { maximumFractionDigits: 2 });
  document.getElementById("inv-total-tax").innerText = finalTax.toLocaleString('en-US', { maximumFractionDigits: 3 });
  document.getElementById("inv-grand-total").innerText = finalGross.toLocaleString('en-US', { maximumFractionDigits: 2 });

  // إظهار والطباعة
  const element = document.getElementById("invoice-template");
  element.style.display = "block";

  const opt = {
    margin: 0,
    filename: `Quotation_${client.name}.pdf`,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 2.5, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  setTimeout(() => {
    html2pdf().set(opt).from(element).save().then(() => {
      element.style.display = "none";
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
    area: area.toLocaleString('en-US', { maximumFractionDigits: 2 }),
    price: p,
    final: finalPrice.toFixed(2), // بنخليها 2 عشان الحسابات وتتفرمت بس في العرض
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
      `<tr><td>${index + 1}</td><td>${room.name}</td><td dir="ltr">${room.area} m²</td><td>${parseFloat(room.price).toLocaleString('en-US', { maximumFractionDigits: 2 })}</td><td style="font-weight:bold; color:var(--gold);">${parseFloat(room.final).toLocaleString('en-US', { maximumFractionDigits: 2 })}</td><td><button onclick="removeCarpetRoom(${room.id})" style="color:red;background:none;border:none;">×</button></td></tr>`,
    );
  });

  document.getElementById("carpet-grand-total").innerText = totalSum.toLocaleString('en-US', { maximumFractionDigits: 2 });
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
      `<tr><td>-</td><td>${r.name}</td><td>-</td><td>${r.totalWidth}</td><td>${r.rolls}</td><td>${parseFloat(r.final).toLocaleString('en-US', { maximumFractionDigits: 2 })}</td><td><button onclick="removeWallRoom(${r.id})" style="color:red;background:none;border:none;">×</button></td></tr>`,
    );
  });

  document.getElementById("wall-grand-total").innerText = total.toLocaleString('en-US', { maximumFractionDigits: 2 });
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