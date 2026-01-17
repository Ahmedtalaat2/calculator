// ==========================================
// حاسبة الستائر الاحترافية - الفارس للديكور
// كود الجافا سكريبت الكامل (Calculators Logic)
// ==========================================

let curtainCounter = 1;

// ============================================================
// 1. منطق حاسبة الستائر (Curtain Logic)
// ============================================================

// وظيفة إضافة ستارة جديدة
function addCurtain() {
  curtainCounter++;
  const wrapper = document.getElementById("curtains-wrapper");
  // تم إضافة data-lang-ph عشان الترجمة تشتغل في العناصر الجديدة
  const newCurtain = `
        <div class="curtain-card" data-curtain-id="${curtainCounter}">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3>ستارة رقم ${curtainCounter}</h3>
                <button class="danger-btn" onclick="this.closest('.curtain-card').remove()">حذف الستارة ×</button>
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
                    <h4>طبقة 1</h4>
                    <div class="inputs-grid">
                        <input type="text" class="l-name" required data-lang-ph="ph_layer_name" placeholder="اسم الطبقة">
                        <input type="number" class="l-fab-width" required data-lang-ph="ph_fab_width" placeholder="عرض القماش (سم)">
                        <input type="number" class="l-fab-price" required data-lang-ph="ph_fab_price" placeholder="سعر متر القماش">
                        <input type="number" class="l-gather" required data-lang-ph="ph_gather" placeholder="الكرمشة">
                    </div>
                    <div class="inputs-grid">
                        <select class="l-rail-type" required>
                            <option value="">نوع الريل</option>
                            <option>ريل عادي</option><option>ريل ويفي</option><option>ريل امريكي</option>
                            <option>ريل روماني</option><option>ريل استيل</option><option>ريل خشب</option>
                        </select>
                        <input type="number" class="l-rail-price" required data-lang-ph="ph_rail_price" placeholder="سعر متر الريل">
                    </div>
                    <div class="layer-actions">
                        <button class="secondary-btn" onclick="addLayer('${curtainCounter}')">إضافة طبقة</button>
                        <button class="danger-btn" onclick="removeLayer(this)">حذف الطبقة</button>
                    </div>
                </div>
            </div>
        </div>`;
  wrapper.insertAdjacentHTML("beforeend", newCurtain);
  // إعادة تطبيق اللغة (لو موجودة)
  if (typeof applyLanguage === "function")
    applyLanguage(localStorage.getItem("lang") || "ar");
}

// وظيفة إضافة طبقة
function addLayer(curtainId) {
  const curtainCard = document.querySelector(
    `.curtain-card[data-curtain-id="${curtainId}"]`,
  );
  const layersWrapper = curtainCard.querySelector(".layers-wrapper");
  const layerId = layersWrapper.children.length + 1;

  const layerHtml = `
        <div class="layer-card" data-layer-id="${layerId}">
            <h4>طبقة ${layerId}</h4>
            <div class="inputs-grid">
                <input type="text" class="l-name" required data-lang-ph="ph_layer_name" placeholder="اسم الطبقة">
                <input type="number" class="l-fab-width" required data-lang-ph="ph_fab_width" placeholder="عرض القماش (سم)">
                <input type="number" class="l-fab-price" required data-lang-ph="ph_fab_price" placeholder="سعر متر القماش">
                <input type="number" class="l-gather" required data-lang-ph="ph_gather" placeholder="الكرمشة">
            </div>
            <div class="inputs-grid">
                <select class="l-rail-type" required><option value="">نوع الريل</option><option>ريل عادي</option><option>ريل ويفي</option><option>ريل امريكي</option><option>ريل روماني</option><option>ريل استيل</option><option>ريل خشب</option></select>
                <input type="number" class="l-rail-price" required data-lang-ph="ph_rail_price" placeholder="سعر متر الريل">
            </div>
            <div class="layer-actions">
                <button class="danger-btn" onclick="removeLayer(this)">حذف الطبقة</button>
            </div>
        </div>`;
  layersWrapper.insertAdjacentHTML("beforeend", layerHtml);
  if (typeof applyLanguage === "function")
    applyLanguage(localStorage.getItem("lang") || "ar");
}

// وظيفة حذف طبقة
function removeLayer(btn) {
  const layers = btn.closest(".layers-wrapper");
  if (layers.children.length > 1) {
    btn.closest(".layer-card").remove();
  } else {
    alert("يجب وجود طبقة واحدة على الأقل!");
  }
}

// دالة حساب الستائر (تم التصحيح هنا ✅)
function calculateCurtains() {
  let orderGrandTotal = 0;
  const allCurtains = document.querySelectorAll(".curtain-card");
  const previewBody = document.getElementById("preview-body");
  const previewArea = document.getElementById("quick-preview-area");
  if (previewBody) previewBody.innerHTML = "";

  allCurtains.forEach((curtain) => {
    // 🔥 التصحيح: استخدام Class Name بدلاً من Placeholder
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
      // 🔥 التصحيح: استخدام Class Name للطبقات أيضاً
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
    let tasselLen = Math.ceil(((height * 2) / 100) * 2) / 2;
    const tasselCost = tasselLen * tasselPrice;

    const totalBeforeTax =
      curtainSubTotal + sewingCost + tasselCost + sideHold + hook;
    const finalCurtainTotal = totalBeforeTax * 1.05;

    orderGrandTotal += finalCurtainTotal;

    if (previewBody) {
      const row = `
                <tr>
                    <td>ستارة رقم ${curtain.dataset.curtainId || "1"}</td>
                    <td>${layers.length} طبقات</td>
                    <td style="text-align: right;">${layersDetailsHtml}</td>
                    <td style="font-weight:bold; color:#d3bb60;">${finalCurtainTotal.toFixed(2)} د.إ</td>
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
  if (salesEl) salesEl.innerText = orderGrandTotal.toFixed(2) + " د.إ";

  const linkingArea = document.getElementById("customer-linking-area");
  if (linkingArea) {
    linkingArea.style.display = "block";
    if (typeof currentTransactionState !== "undefined") {
      currentTransactionState.totalAmount = orderGrandTotal;
    }
    linkingArea.scrollIntoView({ behavior: "smooth" });
  }
}

// ============================================================
// 2. منطق البحث وربط العميل (مشترك للكل)
// ============================================================

let currentTransactionState = {
  selectedClient: null,
  totalAmount: 0,
  details: "تفصيل ستائر",
};

// البحث برقم الهاتف
function handlePhoneSearch(query) {
  const dropdown = document.getElementById("search-results-dropdown");
  dropdown.innerHTML = "";
  const cleanNumber = query.replace(/[^0-9]/g, "");

  if (cleanNumber.length < 3) {
    dropdown.style.display = "none";
    return;
  }

  const matches =
    typeof customers !== "undefined"
      ? customers.filter((c) => String(c.phone).includes(cleanNumber))
      : [];
  dropdown.style.display = "block";

  if (matches.length > 0) {
    matches.forEach((c) => {
      const item = document.createElement("div");
      item.className = "dropdown-item";
      item.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center;"><strong style="color:#d3bb60;">${c.phone}</strong><span>${c.name}</span></div>`;
      item.onclick = () => selectClient(c);
      dropdown.appendChild(item);
    });
  } else {
    dropdown.innerHTML = `<div class="dropdown-item add-new" onclick="openQuickAddWithPhone('${cleanNumber}')" style="cursor:pointer; color:#2ecc71; font-weight:bold;"><i class="fas fa-plus-circle"></i> رقم جديد؟ إضافة <span dir="ltr">${cleanNumber}</span></div>`;
  }
}

// ============================================================
// 3. دوال المودال وإضافة العميل السريع
// ============================================================

// تم نقل دوال المودال لتعمل بشكل سليم
// (openQuickAddWithPhone, closeQuickAdd, saveQuickClient موجودة في script.js وتعمل بشكل مشترك)

// اختيار العميل للستائر
function selectClient(client) {
  currentTransactionState.selectedClient = client;
  document.getElementById("search-box-container").style.display = "none";
  document.getElementById("search-results-dropdown").style.display = "none";
  const card = document.getElementById("selected-client-card");
  document.getElementById("selected-client-name").innerText = client.name;
  document.getElementById("selected-client-phone").innerText = client.phone;
  card.style.display = "flex";
  const saveBtn = document.getElementById("btn-save-transaction");
  if (saveBtn) {
    saveBtn.disabled = false;
    saveBtn.classList.add("pulse-anim");
  }
}

function resetClientSelection() {
  currentTransactionState.selectedClient = null;
  document.getElementById("selected-client-card").style.display = "none";
  document.getElementById("search-box-container").style.display = "block";
  const searchInput = document.getElementById("client-search-input");
  searchInput.value = "";
  searchInput.focus();
  document.getElementById("btn-save-transaction").disabled = true;
}

function saveTransactionToSheet() {
  const client = currentTransactionState.selectedClient;
  const amount = currentTransactionState.totalAmount;

  if (!client || amount <= 0) {
    alert("⚠️ تأكد من اختيار عميل وحساب الستائر أولاً!");
    return;
  }

  const btn = document.getElementById("btn-save-transaction");
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...';
  btn.disabled = true;

  // استدعاء دالة التتبع من script.js لتوليد الرقم المسلسل
  let trackingInfo = {
    id: Date.now(),
    date: new Date().toLocaleDateString("en-GB"),
  };
  if (typeof addNewOrderToTracking === "function") {
    trackingInfo = addNewOrderToTracking(
      client.name,
      client.phone,
      client.address,
      "تفصيل ستائر",
      amount,
    );
  }

  const transactionData = {
    type: "transaction",
    id: trackingInfo.id,
    date: trackingInfo.date,
    clientName: client.name,
    clientPhone: client.clientPhone || client.phone,
    clientAddress: client.address || "استلام من المعرض",
    serviceType: "تفصيل ستائر",
    total: amount,
  };

  if (typeof scriptURL !== "undefined") {
    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(transactionData),
    })
      .then(() => {
        alert(`✅ تم حفظ الفاتورة بنجاح للعميل: ${client.name}`);
        btn.innerHTML = '<i class="fas fa-check"></i> تم الحفظ';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 3000);
      })
      .catch((err) => {
        alert("❌ حدث خطأ أثناء الحفظ");
        btn.innerHTML = originalText;
        btn.disabled = false;
      });
  }
}

// وظيفة التنقل بين التابات
function openTab(evt, tabName) {
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }
  const tabLinks = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove("active");
  }
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.style.display = "block";
  }
  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add("active");
  }
}

// ============================================================
// 4. منطق حاسبة السجاد (Carpet Logic)
// ============================================================

let carpetRooms = [];
let carpetSelectedClient = null;

function addCarpetRoom() {
  const nameInput = document.getElementById("carpet-room-name");
  const widthInput = document.getElementById("carpet-width");
  const lengthInput = document.getElementById("carpet-length");
  const priceInput = document.getElementById("carpet-price");

  const name = nameInput.value.trim();
  const width = parseFloat(widthInput.value);
  const length = parseFloat(lengthInput.value);
  const price = parseFloat(priceInput.value);

  if (!name || isNaN(width) || isNaN(length) || isNaN(price) || width <= 0) {
    alert("⚠️ بيانات غير مكتملة");
    return;
  }

  const area = width * length;
  const finalPrice = area * price * 1.05;

  carpetRooms.push({
    id: Date.now(),
    name: name,
    area: area.toFixed(2),
    price: price.toFixed(2),
    final: finalPrice.toFixed(2),
  });

  renderCarpetTable();
  nameInput.value = "";
  widthInput.value = "";
  lengthInput.value = "";
  priceInput.value = "";
  nameInput.focus();
}

function renderCarpetTable() {
  const tbody = document.getElementById("carpet-body");
  const previewArea = document.getElementById("carpet-preview-area");
  const linkingArea = document.getElementById("carpet-linking-area");
  const grandTotalEl = document.getElementById("carpet-grand-total");

  tbody.innerHTML = "";
  let totalSum = 0;

  if (carpetRooms.length === 0) {
    previewArea.style.display = "none";
    linkingArea.style.display = "none";
    return;
  }

  previewArea.style.display = "block";
  linkingArea.style.display = "block";

  carpetRooms.forEach((room, index) => {
    totalSum += parseFloat(room.final);
    const tr = `
            <tr>
                <td>${index + 1}</td>
                <td>${room.name}</td>
                <td dir="ltr">${room.area} m²</td>
                <td>${room.price}</td>
                <td style="font-weight:bold; color:var(--gold);">${room.final} د.إ</td>
                <td><button onclick="removeCarpetRoom(${room.id})" style="color:#e74c3c; background:none; border:none; cursor:pointer;"><i class="fas fa-trash-alt"></i></button></td>
            </tr>`;
    tbody.insertAdjacentHTML("beforeend", tr);
  });

  grandTotalEl.innerText = totalSum.toFixed(2);
  previewArea.scrollIntoView({ behavior: "smooth" });
}

function removeCarpetRoom(id) {
  if (confirm("حذف الغرفة؟")) {
    carpetRooms = carpetRooms.filter((r) => r.id !== id);
    renderCarpetTable();
  }
}

function handleCarpetSearch(query) {
  const dropdown = document.getElementById("carpet-search-results");
  dropdown.innerHTML = "";
  const cleanNumber = query.replace(/[^0-9]/g, "");

  if (cleanNumber.length < 3) {
    dropdown.style.display = "none";
    return;
  }

  const matches =
    typeof customers !== "undefined"
      ? customers.filter((c) => String(c.phone).includes(cleanNumber))
      : [];
  dropdown.style.display = "block";

  if (matches.length > 0) {
    matches.forEach((c) => {
      const item = document.createElement("div");
      item.className = "dropdown-item";
      item.innerHTML = `<div style="display:flex; justify-content:space-between;"><strong style="color:#d3bb60;">${c.phone}</strong><span>${c.name}</span></div>`;
      item.onclick = () => selectCarpetClient(c);
      dropdown.appendChild(item);
    });
  } else {
    dropdown.innerHTML = `<div class="dropdown-item" onclick="openQuickAddWithPhone('${cleanNumber}')" style="color:#2ecc71; font-weight:bold;">+ إضافة ${cleanNumber}</div>`;
  }
}

function selectCarpetClient(client) {
  carpetSelectedClient = client;
  document.getElementById("carpet-search-box-container").style.display = "none";
  document.getElementById("carpet-search-results").style.display = "none";
  document.getElementById("carpet-client-name").innerText = client.name;
  document.getElementById("carpet-client-phone").innerText = client.phone;
  document.getElementById("carpet-selected-client-card").style.display = "flex";
  document.getElementById("btn-save-carpet").disabled = false;
}

function resetCarpetClientSelection() {
  carpetSelectedClient = null;
  document.getElementById("carpet-selected-client-card").style.display = "none";
  document.getElementById("carpet-search-box-container").style.display =
    "block";
  document.getElementById("carpet-search-input").value = "";
  document.getElementById("btn-save-carpet").disabled = true;
}

function saveCarpetTransaction() {
  const totalAmount = parseFloat(
    document.getElementById("carpet-grand-total").innerText,
  );
  if (!carpetSelectedClient || totalAmount <= 0) {
    alert("بيانات ناقصة");
    return;
  }

  const btn = document.getElementById("btn-save-carpet");
  const originalText = btn.innerHTML;
  btn.innerHTML = "جاري الحفظ...";
  btn.disabled = true;

  // استدعاء دالة التتبع
  let trackingInfo = {
    id: Date.now(),
    date: new Date().toLocaleDateString("en-GB"),
  };
  if (typeof addNewOrderToTracking === "function") {
    trackingInfo = addNewOrderToTracking(
      carpetSelectedClient.name,
      carpetSelectedClient.phone,
      carpetSelectedClient.address,
      "بيع سجاد",
      totalAmount,
    );
  }

  const transactionData = {
    type: "transaction",
    id: trackingInfo.id,
    date: trackingInfo.date,
    clientName: carpetSelectedClient.name,
    clientPhone: carpetSelectedClient.phone,
    clientAddress: carpetSelectedClient.address || "استلام من المعرض",
    serviceType: "بيع سجاد",
    total: totalAmount,
  };

  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(transactionData),
  }).then(() => {
    alert(`✅ تم الحفظ للعميل: ${carpetSelectedClient.name}`);
    btn.innerHTML = "تم الحفظ";
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 3000);
  });
}

function exportCarpetPDF() {
  const element = document.getElementById("carpet-preview-area");
  if (element.style.display === "none") {
    alert("لا توجد بيانات");
    return;
  }
  html2pdf()
    .set({
      margin: 0.5,
      filename: "عرض_سعر_سجاد.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4" },
    })
    .from(element)
    .save();
}

// ============================================================
// 5. منطق حاسبة ورق الجدران (Wallpaper Logic)
// ============================================================

let wallpaperRooms = [];
let wallSelectedClient = null;

function addWallInput() {
  const container = document.getElementById("walls-container");
  const count = container.children.length + 1;
  const div = document.createElement("div");
  div.className = "wall-row inputs-grid";
  div.innerHTML = `<input type="text" class="wall-name" placeholder="اسم الجدار" value="جدار ${count}"><input type="number" class="wall-width" placeholder="عرض الجدار (سم) *"><button class="danger-btn remove-wall-btn" onclick="removeWallInput(this)">×</button>`;
  container.appendChild(div);
}

function removeWallInput(btn) {
  btn.parentElement.remove();
}

function calculateWallpaperRoom() {
  const roomName = document.getElementById("wall-room-name").value.trim();
  const wallHeight = parseFloat(document.getElementById("wall-height").value);
  const rollWidth = parseFloat(document.getElementById("roll-width").value);
  const rollLength = parseFloat(document.getElementById("roll-length").value);
  const rollRepeat =
    parseFloat(document.getElementById("roll-repeat").value) || 0;
  const rollPrice = parseFloat(document.getElementById("roll-price").value);

  if (
    !roomName ||
    isNaN(wallHeight) ||
    isNaN(rollWidth) ||
    isNaN(rollLength) ||
    isNaN(rollPrice)
  ) {
    alert("بيانات ناقصة");
    return;
  }

  let totalWallsWidth = 0;
  let wallsCount = 0;
  document.querySelectorAll(".wall-width").forEach((input) => {
    const val = parseFloat(input.value);
    if (!isNaN(val) && val > 0) {
      totalWallsWidth += val;
      wallsCount++;
    }
  });

  if (wallsCount === 0) {
    alert("أضف جداراً واحداً على الأقل");
    return;
  }

  const stripLength = wallHeight + 10 + rollRepeat;
  if (rollLength < stripLength) {
    alert("طول الرول لا يكفي!");
    return;
  }

  const stripsNeeded = Math.ceil(totalWallsWidth / rollWidth);
  const stripsPerRoll = Math.floor(rollLength / stripLength);
  const rollsNeeded = Math.ceil(stripsNeeded / stripsPerRoll);
  const finalPrice = rollsNeeded * rollPrice * 1.05;

  wallpaperRooms.push({
    id: Date.now(),
    name: roomName,
    wallsCount,
    totalWidth: totalWallsWidth,
    rolls: rollsNeeded,
    final: finalPrice.toFixed(2),
  });
  renderWallTable();
}

function renderWallTable() {
  const tbody = document.getElementById("wall-body");
  const previewArea = document.getElementById("wall-preview-area");
  const linkingArea = document.getElementById("wall-linking-area");
  tbody.innerHTML = "";
  let totalRolls = 0;
  let totalMoney = 0;

  if (wallpaperRooms.length === 0) {
    previewArea.style.display = "none";
    linkingArea.style.display = "none";
    return;
  }

  previewArea.style.display = "block";
  linkingArea.style.display = "block";

  wallpaperRooms.forEach((room) => {
    totalRolls += room.rolls;
    totalMoney += parseFloat(room.final);
    tbody.insertAdjacentHTML(
      "beforeend",
      `<tr><td>-</td><td>${room.name}</td><td>${room.wallsCount}</td><td>${room.totalWidth}</td><td>${room.rolls}</td><td>${room.final}</td><td><button onclick="removeWallRoom(${room.id})" style="color:red;border:none;background:none;">×</button></td></tr>`,
    );
  });

  document.getElementById("wall-total-rolls").innerText = totalRolls;
  document.getElementById("wall-grand-total").innerText = totalMoney.toFixed(2);
  previewArea.scrollIntoView({ behavior: "smooth" });
}

function removeWallRoom(id) {
  if (confirm("حذف؟")) {
    wallpaperRooms = wallpaperRooms.filter((r) => r.id !== id);
    renderWallTable();
  }
}

function handleWallSearch(query) {
  const dropdown = document.getElementById("wall-search-results");
  dropdown.innerHTML = "";
  const cleanNumber = query.replace(/[^0-9]/g, "");
  if (cleanNumber.length < 3) {
    dropdown.style.display = "none";
    return;
  }
  const matches =
    typeof customers !== "undefined"
      ? customers.filter((c) => String(c.phone).includes(cleanNumber))
      : [];
  dropdown.style.display = "block";
  if (matches.length > 0) {
    matches.forEach((c) => {
      const item = document.createElement("div");
      item.className = "dropdown-item";
      item.innerHTML = `<strong>${c.phone}</strong> ${c.name}`;
      item.onclick = () => selectWallClient(c);
      dropdown.appendChild(item);
    });
  } else {
    dropdown.innerHTML = `<div class="dropdown-item" onclick="openQuickAddWithPhone('${cleanNumber}')">+ إضافة</div>`;
  }
}

function selectWallClient(c) {
  wallSelectedClient = c;
  document.getElementById("wall-search-box-container").style.display = "none";
  document.getElementById("wall-search-results").style.display = "none";
  document.getElementById("wall-client-name").innerText = c.name;
  document.getElementById("wall-client-phone").innerText = c.phone;
  document.getElementById("wall-selected-client-card").style.display = "flex";
  document.getElementById("btn-save-wall").disabled = false;
}

function resetWallClientSelection() {
  wallSelectedClient = null;
  document.getElementById("wall-selected-client-card").style.display = "none";
  document.getElementById("wall-search-box-container").style.display = "block";
  document.getElementById("wall-search-input").value = "";
  document.getElementById("btn-save-wall").disabled = true;
}

function saveWallTransaction() {
  const totalAmount = parseFloat(
    document.getElementById("wall-grand-total").innerText,
  );
  if (!wallSelectedClient || totalAmount <= 0) {
    alert("بيانات ناقصة");
    return;
  }
  const btn = document.getElementById("btn-save-wall");
  btn.innerHTML = "جاري الحفظ...";
  btn.disabled = true;

  // استدعاء دالة التتبع
  let trackingInfo = {
    id: Date.now(),
    date: new Date().toLocaleDateString("en-GB"),
  };
  if (typeof addNewOrderToTracking === "function") {
    trackingInfo = addNewOrderToTracking(
      wallSelectedClient.name,
      wallSelectedClient.phone,
      wallSelectedClient.address,
      "ورق جدران",
      totalAmount,
    );
  }

  const data = {
    type: "transaction",
    id: trackingInfo.id,
    date: trackingInfo.date,
    clientName: wallSelectedClient.name,
    clientPhone: wallSelectedClient.phone,
    clientAddress: wallSelectedClient.address || "استلام من المعرض",
    serviceType: "ورق جدران",
    total: totalAmount,
  };
  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  }).then(() => {
    alert("تم الحفظ");
    btn.innerHTML = "تم";
    setTimeout(() => {
      btn.disabled = false;
    }, 3000);
  });
}

function exportWallPDF() {
  const element = document.getElementById("wall-preview-area");
  if (element.style.display === "none") {
    alert("لا توجد بيانات");
    return;
  }
  html2pdf()
    .set({
      margin: 0.5,
      filename: "عرض_سعر_ورق.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4" },
    })
    .from(element)
    .save();
}

// ============================================================
// 🖨️ نظام توليد الفواتير (الإصلاح النهائي للصفحة البيضاء)
// ============================================================

function generateProInvoice(type) {
  if (typeof html2pdf === "undefined") {
    alert("⚠️ مكتبة الطباعة غير موجودة! تأكد من الاتصال بالإنترنت.");
    return;
  }

  let items = [];
  let grandTotalAED = 0;
  let client = null;
  let titleText = "QUOTATION";

  // --- (أ) تجميع البيانات ---

  // 1. السجاد
  if (type === "carpet") {
    if (!carpetSelectedClient) {
      alert("⚠️ اختر عميل للسجاد أولاً!");
      return;
    }
    if (carpetRooms.length === 0) {
      alert("⚠️ جدول السجاد فارغ!");
      return;
    }

    client = carpetSelectedClient;
    grandTotalAED = parseFloat(
      document.getElementById("carpet-grand-total").innerText,
    );
    titleText = "CARPET QUOTATION";

    carpetRooms.forEach((r, i) => {
      let gross = parseFloat(r.final);
      let amountBefore = gross / 1.05;
      let taxVal = gross - amountBefore;

      items.push({
        no: i + 1,
        desc: `Carpet: ${r.name}`,
        size: `${r.area} m²`,
        unit: "Job",
        qty: 1,
        price: parseFloat(r.price).toFixed(2),
        amount: amountBefore.toFixed(2),
        tax: taxVal.toFixed(2),
        gross: gross.toFixed(2),
      });
    });
  }
  // 2. ورق الجدران
  else if (type === "wall") {
    if (!wallSelectedClient) {
      alert("⚠️ اختر عميل للورق أولاً!");
      return;
    }
    if (wallpaperRooms.length === 0) {
      alert("⚠️ جدول الورق فارغ!");
      return;
    }

    client = wallSelectedClient;
    grandTotalAED = parseFloat(
      document.getElementById("wall-grand-total").innerText,
    );
    titleText = "WALLPAPER QUOTATION";

    wallpaperRooms.forEach((r, i) => {
      let gross = parseFloat(r.final);
      let amountBefore = gross / 1.05;
      let taxVal = gross - amountBefore;
      let unitPrice = (amountBefore / r.rolls).toFixed(2);

      items.push({
        no: i + 1,
        desc: `Wallpaper: ${r.name} (${r.wallsCount} Walls)`,
        size: "Roll",
        unit: "Pcs",
        qty: r.rolls,
        price: unitPrice,
        amount: amountBefore.toFixed(2),
        tax: taxVal.toFixed(2),
        gross: gross.toFixed(2),
      });
    });
  }
  // 3. الستائر
  else if (type === "curtain") {
    if (
      typeof currentTransactionState === "undefined" ||
      !currentTransactionState.selectedClient
    ) {
      alert("⚠️ اختر عميل للستائر واحسب السعر أولاً!");
      return;
    }
    client = currentTransactionState.selectedClient;
    grandTotalAED = parseFloat(
      document.getElementById("preview-grand-total").innerText,
    );
    titleText = "CURTAINS QUOTATION";

    const rows = document.querySelectorAll("#preview-body tr");
    rows.forEach((row, i) => {
      const cols = row.querySelectorAll("td");
      if (cols.length > 0) {
        // محاولة استخراج القيمة الرقمية النظيفة من نص السعر (إزالة " د.إ")
        let grossText = cols[3].innerText.replace(/[^0-9.]/g, "");
        let gross = parseFloat(grossText);
        let amountBefore = gross / 1.05;
        let taxVal = gross - amountBefore;
        items.push({
          no: i + 1,
          desc: `Curtain Item #${i + 1}`,
          size: "Custom",
          unit: "Pcs",
          qty: 1,
          price: amountBefore.toFixed(2),
          amount: amountBefore.toFixed(2),
          tax: taxVal.toFixed(2),
          gross: gross.toFixed(2),
        });
      }
    });
  }

  // --- (ب) ملء الفاتورة (DOM) ---

  document.getElementById("inv-type-title").innerText = titleText;
  document.getElementById("inv-no").innerText =
    "QT-" + Date.now().toString().slice(-6);
  document.getElementById("inv-date").innerText = new Date().toLocaleDateString(
    "en-GB",
  );

  if (client) {
    document.getElementById("inv-client-name").innerText = client.name;
    document.getElementById("inv-client-phone").innerText = client.phone;
    document.getElementById("inv-client-addr").innerText =
      client.address || "Dubai, UAE";
    const sigField =
      document.getElementById("inv-sig-client") ||
      document.getElementById("inv-sig-client-name");
    if (sigField) sigField.innerText = client.name;
  }

  const tbody = document.getElementById("inv-table-body");
  tbody.innerHTML = "";

  items.forEach((item) => {
    tbody.innerHTML += `
            <tr>
                <td>${item.no}</td>
                <td style="text-align:left;">${item.desc}</td>
                <td>${item.size}</td>
                <td>${item.unit}</td>
                <td>${item.qty}</td>
                <td>${item.price}</td>
                <td>${item.amount}</td>
                <td>${item.tax}</td>
                <td style="font-weight:bold;">${item.gross}</td>
            </tr>`;
  });

  let finalBefore = (grandTotalAED / 1.05).toFixed(2);
  let finalTax = (grandTotalAED - finalBefore).toFixed(2);

  document.getElementById("inv-total-before").innerText = finalBefore;
  document.getElementById("inv-total-tax").innerText = finalTax;
  document.getElementById("inv-grand-total").innerText =
    grandTotalAED.toFixed(2);
  document.getElementById("inv-words").innerText =
    `Total: ${grandTotalAED.toFixed(2)} AED (Inclusive of 5% VAT)`;

  // --- (ج) عملية الطباعة (Fix) ---

  const element = document.getElementById("invoice-template");
  element.style.display = "block";
  element.style.position = "absolute";
  element.style.top = "0";
  element.style.left = "0";
  element.style.zIndex = "99999";
  element.style.background = "white";

  const opt = {
    margin: 10,
    filename: `${titleText}_${client.name}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  setTimeout(() => {
    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        element.style.display = "none";
      })
      .catch((err) => {
        console.error(err);
        element.style.display = "none";
      });
  }, 500);
}
