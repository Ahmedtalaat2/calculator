// ============================================================
// 1. 🌍 إعدادات اللغة والترجمة (القاموس الشامل)
// ============================================================
const translations = {
  ar: {
    app_title: "نظام الفارس للديكور | CRM",
    company_name: " الفــارس ",
    loading: "جاري التحميل...",
    error: "خطأ في الاتصال",
    no_results: "لا توجد نتائج",
    currency: "د.إ",
    nav_dashboard: "الإحصائيات",
    nav_clients: "إدارة العملاء",
    nav_calc: "الحاسبة الذكية",
    nav_tracking: "المتابعة",
    total_sales: "إجمالي المبيعات",
    clients_count: "عدد العملاء",
    chart_orders: "مخطط الطلبات الشهري",
    chart_services: "توزيع الخدمات",
    recent_clients: "🕒 أحدث 5 عملاء",
    search_ph: "ابحث بالاسم أو رقم الهاتف...",
    client_name_ph: "اسم العميل *",
    client_phone_ph: "رقم الهاتف",
    client_addr_ph: "العنوان (اختياري)",
    client_notes_ph: "ملاحظات",
    add_client_btn: "إضافة عميل جديد",
    th_date: "التاريخ",
    th_name: "الاسم",
    th_phone: "الهاتف",
    th_addr: "العنوان",
    tab_curtain: "حاسبة الستائر",
    tab_carpet: "حاسبة السجاد",
    tab_wall: "حاسبة ورق الجدران",
    title_curtain: "تفاصيل الستائر",
    btn_add_curtain: "إضافة ستارة",
    curtain_num: "ستارة رقم",
    ph_width: "العرض (سم)",
    ph_height: "الارتفاع (سم)",
    ph_sewing: "سعر الخياطة",
    ph_tassel: "سعر الطربوش",
    ph_sidehold: "سعر المسكة",
    ph_hook: "سعر المربط",
    ph_layer_name: "اسم الطبقة",
    ph_fab_width: "عرض القماش",
    ph_fab_price: "سعر القماش",
    ph_gather: "الكرمشة (×)",
    sel_rail_type: "نوع الريل *",
    ph_rail_price: "سعر الريل",
    btn_add_layer: "إضافة طبقة",
    btn_del_layer: "حذف الطبقة",
    layer_1: "طبقة 1",
    th_total_fab: "إجمالي القماش",
    title_carpet: "تفاصيل السجاد",
    add_carpet_room: "إضافة غرفة / سجادة",
    ph_room_name: "اسم الغرفة",
    ph_length: "الطول (م)",
    ph_meter_price: "سعر المتر",
    btn_calc_add: "حساب وإضافة",
    room_details: "تفاصيل الغرف",
    th_room: "الغرفة",
    th_area: "المساحة",
    th_m_price: "سعر المتر",
    btn_add_measure: "إضافة قياس",
    title_wall: "تفاصيل ورق الجدران",
    room_roll_data: "بيانات الغرفة والرول",
    ph_wall_height: "ارتفاع الجدار",
    ph_roll_width: "عرض الرول",
    ph_roll_length: "طول الرول",
    ph_roll_repeat: "التكرار (Repeat)",
    ph_roll_price: "سعر الرول",
    walls_measure: "قياسات الجدران",
    ph_wall_width: "عرض الجدار",
    btn_add_wall: "+ جدار آخر",
    btn_calc_roll: "حساب الرولات",
    th_walls_count: "عدد الجدران",
    th_total_width: "إجمالي العرض",
    th_rolls_count: "عدد الرولات",
    total_rolls_label: "إجمالي الرولات:",
    btn_new_room: "غرفة جديدة",
    quick_preview: "معاينة الحساب",
    th_curtain: "الستارة",
    th_layers: "الطبقات",
    th_price_tax: "السعر (مع الضريبة)",
    th_total: "الإجمالي",
    th_action: "حذف",
    total_label: "الإجمالي الكلي:",
    search_client_label: "👤 لمن هذه الفاتورة؟",
    btn_change: "تغيير",
    btn_save_sheet: "حفظ في ملف العميل",
    btn_save_select: "حفظ واختيار العميل",
    btn_calc: "احسب السعر",
    btn_download: "تنزيل الكوتيشن",
    quick_add_title: "⚡ إضافة عميل جديد",
    filter_all: "الكل",
    filter_pending: "⏳ قيد التنفيذ",
    filter_completed: "✅ مكتمل",
    th_id: "رقم المسلسل",
    th_type: "الخدمة",
    th_paid: "المدفوع",
    th_status: "الحالة",
    status_completed: "مكتمل",
    status_pending: "قيد التنفيذ",
    enter_name: "يرجى كتابة الاسم",
    saving: "جاري الحفظ...",
    saved: "✅ تم الحفظ",
    saved_client: "✅ تم تسجيل العميل",
    invalid_num: "❌ رقم غير صحيح",
    valid_num: "✅ رقم صحيح",
    no_orders: "لا توجد طلبات 📭",
    confirm_status: "هل تريد تغيير حالة الطلب؟",
    months: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
    services: ["ستائر", "سجاد", "ورق جدران", "أخرى"],
  },
  en: {
    app_title: "Al Faris Decor | CRM",
    company_name: "Alfaris  ",
    loading: "Loading...",
    error: "Connection Error",
    no_results: "No results found",
    currency: "AED",
    nav_dashboard: "Dashboard",
    nav_clients: "Clients",
    nav_calc: "Calculator",
    nav_tracking: "Tracking",
    total_sales: "Total Sales",
    clients_count: "Active Clients",
    chart_orders: "Monthly Orders",
    chart_services: "Services Distribution",
    recent_clients: "🕒 Recent Clients",
    search_ph: "Search name or phone...",
    client_name_ph: "Client Name *",
    client_phone_ph: "Phone Number",
    client_addr_ph: "Address (Optional)",
    client_notes_ph: "Notes",
    add_client_btn: "Add New Client",
    th_date: "Date",
    th_name: "Name",
    th_phone: "Phone",
    th_addr: "Address",
    tab_curtain: "Curtains",
    tab_carpet: "Carpets",
    tab_wall: "Wallpaper",
    title_curtain: "Curtain Details",
    btn_add_curtain: "Add Curtain",
    curtain_num: "Curtain #",
    ph_width: "Width (cm)",
    ph_height: "Height (cm)",
    ph_sewing: "Sewing Price",
    ph_tassel: "Tassel Price",
    ph_sidehold: "Side Hold Price",
    ph_hook: "Hook Price",
    ph_layer_name: "Layer Name",
    ph_fab_width: "Fabric Width",
    ph_fab_price: "Fabric Price",
    ph_gather: "Gather (x)",
    sel_rail_type: "Rail Type *",
    ph_rail_price: "Rail Price",
    btn_add_layer: "Add Layer",
    btn_del_layer: "Remove Layer",
    layer_1: "Layer 1",
    th_total_fab: "Total Fabric",
    title_carpet: "Carpet Details",
    add_carpet_room: "Add Room / Carpet",
    ph_room_name: "Room Name",
    ph_length: "Length (m)",
    ph_meter_price: "Meter Price",
    btn_calc_add: "Calculate & Add",
    room_details: "Room Details",
    th_room: "Room",
    th_area: "Area",
    th_m_price: "Meter Price",
    btn_add_measure: "Add Measure",
    title_wall: "Wallpaper Details",
    room_roll_data: "Room & Roll Data",
    ph_wall_height: "Wall Height",
    ph_roll_width: "Roll Width",
    ph_roll_length: "Roll Length",
    ph_roll_repeat: "Repeat",
    ph_roll_price: "Roll Price",
    walls_measure: "Walls Measurements",
    ph_wall_width: "Wall Width",
    btn_add_wall: "+ Add Wall",
    btn_calc_roll: "Calc Rolls",
    th_walls_count: "Walls Count",
    th_total_width: "Total Width",
    th_rolls_count: "Rolls Count",
    total_rolls_label: "Total Rolls:",
    btn_new_room: "New Room",
    quick_preview: "Quick Preview",
    th_curtain: "Item",
    th_layers: "Layers",
    th_price_tax: "Price (inc. VAT)",
    th_total: "Total",
    th_action: "Action",
    total_label: "Grand Total:",
    search_client_label: "👤 Select Client",
    btn_change: "Change",
    btn_save_sheet: "Save to Sheet",
    btn_save_select: "Save & Select",
    btn_calc: "Calculate",
    btn_download: "Download Quotation",
    quick_add_title: "⚡ Add New Client",
    filter_all: "All",
    filter_pending: "⏳ Pending",
    filter_completed: "✅ Completed",
    th_id: "Order ID",
    th_type: "Service",
    th_paid: "Paid",
    th_status: "Status",
    status_completed: "Completed",
    status_pending: "Pending",
    enter_name: "Please enter name",
    saving: "Saving...",
    saved: "✅ Saved",
    saved_client: "✅ Client Registered",
    invalid_num: "❌ Invalid Number",
    valid_num: "✅ Valid",
    no_orders: "No orders found 📭",
    confirm_status: "Change order status?",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    services: ["Curtains", "Carpets", "Wallpaper", "Other"],
  },
};

let currentLang = localStorage.getItem("lang") || "ar";

function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  applyLanguage(lang);
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (translations[lang][key]) el.innerText = translations[lang][key];
  });
  document.querySelectorAll("[data-lang-ph]").forEach((el) => {
    const key = el.getAttribute("data-lang-ph");
    if (translations[lang][key]) el.placeholder = translations[lang][key];
  });
  const titleKey = document.querySelector("title").getAttribute("data-lang");
  if (translations[lang][titleKey]) document.title = translations[lang][titleKey];

  if (typeof renderOrdersTable === "function") renderOrdersTable();
  if (typeof updateDashboardUI === "function") updateDashboardUI();
  if (typeof initCharts === "function" && orders.length > 0) initCharts();
}

function t(key) { return translations[currentLang][key] || key; }

// ============================================================
// 2. المتغيرات والاتصال بالسيرفر
// ============================================================
let customers = [];
let orders = [];
let CURRENT_PASSWORD = "";

// ⚠️ الرابط الوحيد والأساسي للاتصال بـ Google Apps Script
const scriptURL = "https://script.google.com/macros/s/AKfycbyTLqEGFUy_aMhfHUhxkmqLicO-xRX1oLkYIO-CPb3I5AZjnQRl4XlNyq8CZ5msty6T/exec";

document.addEventListener("DOMContentLoaded", function () {
  applyLanguage(currentLang);

  const savedPass = sessionStorage.getItem("app_pass");
  if (savedPass) {
    const passField = document.getElementById("admin-pass");
    if (passField) passField.value = savedPass;
    checkLogin();
  } else {
    const overlay = document.getElementById("login-overlay");
    if (overlay) overlay.style.display = "flex";
  }

  initModalListener();
});

// ============================================================
// 3. 🔐 نظام تسجيل الدخول (Unified)
// ============================================================
function checkLogin() {
  const input = document.getElementById("admin-pass").value;
  const errorMsg = document.getElementById("login-error");
  const btn = document.querySelector("#login-overlay button");

  if (!input) return;

  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الاتصال...';
  btn.disabled = true;
  if (errorMsg) errorMsg.style.display = "none";

  // إرسال الباسورد للسيرفر. إذا نجح سيعيد البيانات، إذا فشل سيعيد خطأ.
  fetch(`${scriptURL}?pass=${encodeURIComponent(input)}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        throw new Error("Wrong Password");
      }

      // ✅ الدخول ناجح
      CURRENT_PASSWORD = input;
      sessionStorage.setItem("app_pass", input);

      const overlay = document.getElementById("login-overlay");
      overlay.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      overlay.style.opacity = "0";
      overlay.style.transform = "scale(1.1)";
      setTimeout(() => overlay.style.display = "none", 500);

      // 🚀 استخراج البيانات (الطلبات والعملاء) من الرد
      processDataFromSheet(data);
    })
    .catch((err) => {
      console.error(err);
      if (errorMsg) {
        errorMsg.style.display = "block";
        errorMsg.innerText = "❌ فشل الاتصال بالسيرفر";
      }
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
}

function processDataFromSheet(data) {
  orders = [];
  customers = [];
  let uniquePhones = new Set();

  // Backend Array Structure:
  // [ID, Date, Client Name, Phone, Address, Service Type, Details, Total Amount, Status]

  if (Array.isArray(data) && data.length > 1) {
    // Skip Header Row (slice 1)
    orders = data.slice(1).map((row) => {
      const orderId = String(row[0]).replace(/'/g, ""); // Remove ' if present
      const orderDate = row[1];
      const cName = row[2];
      const cPhone = String(row[3]).replace(/[^0-9]/g, ""); // Clean phone
      const cAddress = row[4];
      const sType = row[5];
      const sDetails = row[6];
      const total = row[7];
      const status = row[8];

      // بناء قائمة العملاء تلقائياً
      if (cName && cPhone.length > 5 && !uniquePhones.has(cPhone)) {
        uniquePhones.add(cPhone);
        customers.push({
          id: Date.now() + Math.random(), // Local ID for UI only
          date: orderDate,
          name: cName,
          phone: cPhone,
          address: cAddress || "---",
          notes: ""
        });
      }

      return {
        id: orderId,
        date: orderDate,
        client: cName,
        phone: cPhone,
        address: cAddress,
        type: sType,
        details: sDetails,
        total: total,
        status: status || "pending",
        paid: 0 // Currently not tracked in simple sheet
      };
    });
  }

  // الترتيب: الأحدث أولاً
  orders.sort((a, b) => String(b.id).localeCompare(String(a.id)));

  updateDashboardUI();
  renderOrdersTable();
  calculateTotalSales();
  initCharts();
}

function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString("en-GB");
}

// ============================================================
// 4. تحديث الداشبورد والرسوم
// ============================================================
function updateDashboardUI() {
  const mainBody = document.getElementById("customers-body");
  const recentBody = document.getElementById("recent-customers-body");
  const counter = document.getElementById("active-clients-dash");

  if (mainBody) {
    if (customers.length === 0) {
      mainBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">${t("no_results")}</td></tr>`;
    } else {
      mainBody.innerHTML = [...customers].reverse().map((c, i) => `
        <tr onclick="openCustomerProfile(${c.id})" title="اضغط لعرض البروفايل" style="cursor:pointer;">
            <td>${customers.length - i}</td>
            <td>${c.date}</td>
            <td>${c.name}</td>
            <td dir="ltr" style="text-align:center; font-weight:bold;">${c.phone}</td>
            <td>${c.address}</td>
        </tr>`).join("");
    }
  }

  if (recentBody) {
    recentBody.innerHTML = [...customers].reverse().slice(0, 5).map((c) => `
        <tr><td>${c.date}</td><td>${c.name}</td><td dir="ltr" style="text-align:center;">${c.phone}</td><td>${c.address}</td></tr>
    `).join("");
  }

  if (counter) counter.innerText = customers.length;
}

function calculateTotalSales() {
  const salesEl = document.getElementById("total-sales-dash");
  if (!salesEl) return;
  let total = 0;
  orders.forEach((o) => {
    let val = parseFloat(String(o.total).replace(/[^0-9.]/g, "")) || 0;
    total += val;
  });
  salesEl.innerHTML = `${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style="font-size:0.6em">${t("currency")}</span>`;
}

// ============================================================
// 5. قسم المتابعة (Tracking) و إرسال البيانات
// ============================================================
function addNewOrderToTracking(clientName, clientPhone, clientAddress, type, amount, details) {
  const now = new Date();
  const prefix = `${String(now.getFullYear()).slice(-2)}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const count = orders.filter((o) => String(o.id).startsWith(prefix)).length + 1;
  const smartID = `${prefix}${String(count).padStart(3, "0")}`;

  const newOrder = {
    id: smartID,
    date: now.toLocaleDateString("en-GB"),
    client: clientName,
    phone: clientPhone,
    address: clientAddress,
    type: type,
    details: details || "---",
    total: amount,
    paid: 0,
    status: "pending"
  };

  // تحديث الواجهة فوراً
  orders.unshift(newOrder);
  renderOrdersTable();
  calculateTotalSales();
  initCharts();

  // إرسال البيانات لجوجل شيت (لا ننتظر الرد بسبب no-cors)
  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({
      type: "transaction",
      id: smartID,
      date: newOrder.date,
      clientName: clientName,
      clientPhone: clientPhone,
      clientAddress: clientAddress,
      serviceType: type,
      details: details,
      total: amount,
      password: CURRENT_PASSWORD
    })
  }).catch(err => console.error(err));

  return { id: smartID, date: newOrder.date };
}

function renderOrdersTable(filter = "all") {
  const tbody = document.getElementById("orders-body");
  if (!tbody) return;
  tbody.innerHTML = "";

  const filtered = orders.filter((o) => filter === "all" ? true : o.status === filter);

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:20px;">${t("no_orders")}</td></tr>`;
    return;
  }

  filtered.forEach((order) => {
    let statusBadge = "";
    const statusText = order.status === "completed" ? t("status_completed") : t("status_pending");

    if (order.status === "completed") {
      statusBadge = `<span class="status-badge status-completed" onclick="toggleOrderStatus('${order.id}')" title="Change">${statusText} <i class="fas fa-check"></i></span>`;
    } else {
      statusBadge = `<span class="status-badge status-pending" onclick="toggleOrderStatus('${order.id}')" title="Change">${statusText} <i class="fas fa-clock"></i></span>`;
    }

    let formattedPrice = parseFloat(order.total).toFixed(2);

    const row = `
        <tr>
            <td style="font-family:monospace; font-weight:bold; letter-spacing:1px; direction:ltr; color:#d3bb60;">${order.id}</td>
            <td>${order.client}</td>
            <td dir="ltr" style="text-align:center;">${order.phone}</td>
            <td>${order.address}</td>
            <td>${order.type}</td>
            <td>${order.paid || 0}</td>
            <td style="color:var(--gold); font-weight:bold;">${formattedPrice}</td>
            <td>${statusBadge}</td>
        </tr>`;
    tbody.insertAdjacentHTML("beforeend", row);
  });
}

function toggleOrderStatus(id) {
  const order = orders.find((o) => o.id == id);
  if (order) {
    order.status = order.status === "pending" ? "completed" : "pending";

    const currentFilterBtn = document.querySelector(".filter-btn.active");
    const currentFilter = currentFilterBtn ? currentFilterBtn.getAttribute("onclick").match(/'([^']+)'/)[1] : "all";
    renderOrdersTable(currentFilter);

    // إرسال التحديث لـ Google Sheets
    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        type: "updateStatus",
        id: id,
        newStatus: order.status,
        password: CURRENT_PASSWORD
      }),
    }).catch((err) => console.error(err));
  }
}

function filterOrders(type) {
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  event.target.classList.add("active");
  renderOrdersTable(type);
}

// ============================================================
// 6. الرسوم البيانية
// ============================================================
let ordersChartInstance = null;
let servicesChartInstance = null;

function initCharts() {
  const monthlyCounts = new Array(12).fill(0);
  orders.forEach((order) => {
    if (order.id && order.id.length >= 4) {
      let monthStr = order.id.substring(2, 4);
      let monthIndex = parseInt(monthStr) - 1;
      if (monthIndex >= 0 && monthIndex < 12) monthlyCounts[monthIndex]++;
    }
  });

  let servicesCounts = [0, 0, 0, 0];
  orders.forEach((order) => {
    let type = (order.type || "").toLowerCase();
    if (type.includes("ستائر") || type.includes("curtain")) servicesCounts[0]++;
    else if (type.includes("سجاد") || type.includes("carpet")) servicesCounts[1]++;
    else if (type.includes("ورق") || type.includes("wall")) servicesCounts[2]++;
    else servicesCounts[3]++;
  });

  const ctx1 = document.getElementById("ordersChart");
  if (ctx1) {
    if (ordersChartInstance) ordersChartInstance.destroy();
    ordersChartInstance = new Chart(ctx1, {
      type: "line",
      data: {
        labels: translations[currentLang].months,
        datasets: [{
          label: currentLang === "ar" ? "عدد الطلبات" : "Orders Count",
          data: monthlyCounts,
          borderColor: "#d3bb60",
          backgroundColor: "rgba(211, 187, 96, 0.1)",
          tension: 0.4,
          fill: true,
          pointBackgroundColor: "#314e52",
          pointBorderColor: "#d3bb60",
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: "#fff", font: { family: "Cairo" } } } },
        scales: {
          x: { ticks: { color: "#bbb", font: { family: "Cairo" } }, grid: { color: "rgba(255,255,255,0.05)" } },
          y: { ticks: { color: "#bbb", stepSize: 1 }, grid: { color: "rgba(255,255,255,0.05)" }, beginAtZero: true },
        },
      },
    });
  }

  const ctx2 = document.getElementById("servicesChart");
  if (ctx2) {
    if (servicesChartInstance) servicesChartInstance.destroy();
    servicesChartInstance = new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: translations[currentLang].services,
        datasets: [{
          data: servicesCounts,
          backgroundColor: ["#d3bb60", "#314e52", "#e7e6e1", "#555"],
          borderWidth: 0,
          hoverOffset: 4,
        }],
      },
      options: {
        plugins: { legend: { position: "bottom", labels: { color: "#fff", font: { family: "Cairo" } } } },
      },
    });
  }
}

// ============================================================
// 7. إدارة العملاء
// ============================================================
function showSection(id, el) {
  document.querySelectorAll(".page-section").forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelectorAll(".side-nav a").forEach((a) => a.classList.remove("active"));
  el.classList.add("active");
}

function openTab(evt, tabName) {
  document.querySelectorAll(".tab-content").forEach((c) => (c.style.display = "none"));
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
  document.getElementById(tabName).style.display = "block";
  if (evt && evt.currentTarget) evt.currentTarget.classList.add("active");
}

function searchCustomers() {
  const term = document.getElementById("search-input").value.toLowerCase().trim();
  const filtered = customers.filter(c => c.name.toLowerCase().includes(term) || String(c.phone).includes(term));
  const mainBody = document.getElementById("customers-body");

  if (mainBody) {
    if (filtered.length === 0) {
      mainBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">${t("no_results")}</td></tr>`;
    } else {
      mainBody.innerHTML = [...filtered].reverse().map((c, i) => `
        <tr onclick="openCustomerProfile(${c.id})" title="اضغط لعرض البروفايل" style="cursor:pointer;">
            <td>${filtered.length - i}</td><td>${c.date}</td><td>${c.name}</td><td dir="ltr" style="text-align:center;">${c.phone}</td><td>${c.address}</td>
        </tr>`).join("");
    }
  }
}

function saveCustomerLocal() {
  const nameInput = document.getElementById("cust-name");
  const phoneInput = document.getElementById("cust-phone");
  const addrInput = document.getElementById("cust-address");
  const notesInput = document.getElementById("cust-notes");
  const btn = document.getElementById("btn-save-cust");

  if (!nameInput.value.trim()) { alert(t("enter_name")); return; }

  const originalText = btn.innerText;
  btn.innerText = t("saving");
  btn.disabled = true;

  const newClient = {
    name: nameInput.value.trim(),
    phone: phoneInput.value,
    address: addrInput.value.trim() || "---",
    notes: notesInput.value.trim() || ""
  };

  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({
      type: "transaction", // حفظ كمعاملة فارغة لضمان التسجيل
      id: generateSmartID(),
      date: new Date().toLocaleDateString("en-GB"),
      clientName: newClient.name,
      clientPhone: newClient.phone,
      clientAddress: newClient.address,
      serviceType: "عميل جديد",
      details: newClient.notes,
      total: 0,
      password: CURRENT_PASSWORD
    }),
  }).then(() => {
    alert(t("saved"));
    customers.push({ ...newClient, id: Date.now(), date: new Date().toLocaleDateString("en-GB") });
    updateDashboardUI();
    nameInput.value = ""; phoneInput.value = ""; addrInput.value = ""; notesInput.value = "";
    btn.innerText = originalText; btn.disabled = true;
  }).catch(() => {
    alert(t("error"));
    btn.innerText = originalText; btn.disabled = false;
  });
}

function initModalListener() {
  const quickPhoneInput = document.getElementById("quick-phone");
  const quickFeedback = document.querySelector("#quick-add-modal #phone-feedback");
  const quickSaveBtn = document.querySelector("#quick-add-modal .one");

  if (quickPhoneInput && quickSaveBtn) {
    quickPhoneInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "");
      const val = this.value;
      let isValid = (val.startsWith("05") && val.length === 10) || (val.startsWith("04") && val.length === 9);
      if (val.length === 0) {
        if (quickFeedback) quickFeedback.innerText = "";
        quickSaveBtn.disabled = true; quickSaveBtn.style.opacity = "0.5";
      } else if (!isValid) {
        if (quickFeedback) { quickFeedback.innerText = t("invalid_num"); quickFeedback.style.color = "red"; }
        quickSaveBtn.disabled = true; quickSaveBtn.style.opacity = "0.5";
      } else {
        if (quickFeedback) { quickFeedback.innerText = t("valid_num"); quickFeedback.style.color = "#2ecc71"; }
        quickSaveBtn.disabled = false; quickSaveBtn.style.opacity = "1"; quickSaveBtn.style.cursor = "pointer";
      }
    });
  }

  const mainPhone = document.getElementById("cust-phone");
  const mainBtn = document.getElementById("btn-save-cust");
  const mainFeedback = document.getElementById("phone-feedback");

  if (mainPhone && mainBtn) {
    mainPhone.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "");
      const val = this.value;
      let isValid = (val.startsWith("05") && val.length === 10) || (val.startsWith("04") && val.length === 9);
      if (val.length === 0) {
        mainFeedback.innerText = ""; mainBtn.disabled = true;
      } else if (!isValid) {
        mainFeedback.innerText = t("invalid_num"); mainFeedback.style.color = "red"; mainBtn.disabled = true;
      } else {
        mainFeedback.innerText = t("valid_num"); mainFeedback.style.color = "#2ecc71"; mainBtn.disabled = false;
      }
    });
  }
}

function saveQuickClient() {
  const nameInput = document.getElementById("quick-name");
  const phoneInput = document.getElementById("quick-phone");
  const addrInput = document.getElementById("quick-address");
  const btn = document.querySelector("#quick-add-modal .one");

  if (!nameInput.value.trim()) return;

  btn.innerText = t("saving");
  btn.disabled = true;

  const newClient = {
    name: nameInput.value.trim(),
    phone: phoneInput.value,
    address: addrInput.value || "استلام من المعرض"
  };

  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({
      type: "transaction",
      id: generateSmartID(),
      date: new Date().toLocaleDateString("en-GB"),
      clientName: newClient.name,
      clientPhone: newClient.phone,
      clientAddress: newClient.address,
      serviceType: "عميل سريع",
      details: "---",
      total: 0,
      password: CURRENT_PASSWORD
    })
  }).catch((err) => console.error(err));

  customers.push({ ...newClient, id: Date.now(), date: new Date().toLocaleDateString("en-GB") });
  updateDashboardUI();

  if (typeof selectClient === "function") selectClient(newClient); // يربط العميل فوراً بالفاتورة المفتوحة
  closeQuickAdd();

  nameInput.value = ""; phoneInput.value = ""; addrInput.value = "";
  btn.innerText = "حفظ واختيار العميل";
  btn.disabled = true; btn.style.opacity = "0.5";
  alert(t("saved_client"));
}

function openQuickAddWithPhone(p) {
  const modal = document.getElementById("quick-add-modal");
  modal.style.display = "block";
  const phoneInput = document.getElementById("quick-phone");
  phoneInput.value = p;
  phoneInput.dispatchEvent(new Event("input"));
  document.getElementById("quick-name").focus();
}

function closeQuickAdd() {
  document.getElementById("quick-add-modal").style.display = "none";
}

// ============================================================
// 9. بروفايل العميل
// ============================================================
function openCustomerProfile(clientId) {
  const client = customers.find((c) => c.id === clientId);
  if (!client) return;

  const cleanClientPhone = String(client.phone).replace(/[^0-9]/g, "");
  const clientOrders = orders.filter((o) => {
    const orderPhoneClean = String(o.phone).replace(/[^0-9]/g, "");
    return (o.client === client.name || (cleanClientPhone.length > 5 && orderPhoneClean.includes(cleanClientPhone)));
  });

  let totalSpent = 0; let totalPaid = 0;
  clientOrders.forEach(o => { totalSpent += parseFloat(o.total) || 0; totalPaid += parseFloat(o.paid) || 0; });
  const totalDue = totalSpent - totalPaid;

  const modalHTML = `
    <div id="profile-modal" class="modal" style="display:block;">
      <div id="profile-content-box" class="modal-content">
        <button class="close-modal-btn no-print" onclick="closeProfileModal()"><i class="fas fa-times"></i></button>
        <div class="profile-header">
            <div class="profile-avatar"><i class="fas fa-user"></i></div>
            <h2 class="profile-name" id="p-name">${client.name}</h2>
            <div class="profile-meta">
                <span><i class="fas fa-phone"></i> ${client.phone}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${client.address || "---"}</span>
            </div>
        </div>
        <div class="profile-body">
            <div class="profile-stats-row" style="display:flex; justify-content:space-around; margin-bottom:20px;">
                <div class="p-stat-box" style="text-align:center;">
                    <div>إجمالي المبيعات</div>
                    <div id="p-total-spent" style="color:var(--gold); font-weight:bold; font-size:1.2rem;">${totalSpent.toLocaleString()}</div>
                </div>
                <div class="p-stat-box" style="text-align:center;">
                    <div>المدفوع</div>
                    <div id="p-total-paid" style="color:#2ecc71; font-weight:bold; font-size:1.2rem;">${totalPaid.toLocaleString()}</div>
                </div>
                <div class="p-stat-box" style="text-align:center;">
                    <div>المتبقي</div>
                    <div id="p-total-due" style="color:red; font-weight:bold; font-size:1.2rem;">${totalDue.toLocaleString()}</div>
                </div>
            </div>
            <div class="section-title"><span><i class="fas fa-history"></i> سجل التعاملات</span></div>
            <div class="table-container" style="max-height:300px; overflow-y:auto;">
                <table style="width:100%;">
                    <thead><tr><th>التاريخ</th><th>التفاصيل</th><th>الخدمة</th><th>المدفوع</th><th>الإجمالي</th><th>الحالة</th></tr></thead>
                    <tbody>${renderClientHistoryRows(clientOrders)}</tbody>
                </table>
            </div>
            <div class="profile-actions no-print" style="margin-top:25px; text-align:center;">
                <button class="primary-btn" onclick="downloadProfilePDF()"><i class="fas fa-file-pdf"></i> تحميل التقرير</button>
            </div>
        </div>
      </div>
    </div>
  `;

  const oldModal = document.getElementById("profile-modal");
  if (oldModal) oldModal.remove();
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function renderClientHistoryRows(ordersList) {
  if (ordersList.length === 0) return '<tr><td colspan="6" style="text-align:center;">لا توجد معاملات سابقة</td></tr>';
  return [...ordersList].reverse().map(order => {
    const amount = parseFloat(order.total) || 0;
    const paid = parseFloat(order.paid) || 0;
    const statusText = order.status === "completed" ? t("status_completed") : t("status_pending");
    return `<tr>
        <td>${order.date}</td><td>${order.details || "---"}</td><td>${order.type}</td>
        <td style="color:#2ecc71;">${paid.toFixed(2)}</td><td style="font-weight:bold; color:var(--gold);">${amount.toFixed(2)}</td>
        <td>${statusText}</td>
    </tr>`;
  }).join('');
}

function closeProfileModal() {
  const modal = document.getElementById("profile-modal");
  if (modal) modal.style.display = "none";
}

function downloadProfilePDF() {
  const element = document.getElementById("profile-content-box");
  const name = document.getElementById("p-name").innerText;
  const noPrint = element.querySelectorAll(".no-print");
  noPrint.forEach((el) => (el.style.display = "none"));

  const opt = { margin: 0.5, filename: `Profile_${name}.pdf`, image: { type: "jpeg", quality: 0.98 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: "in", format: "a4", orientation: "portrait" } };
  html2pdf().from(element).set(opt).save().then(() => {
    noPrint.forEach((el) => (el.style.display = "block"));
  });
}