// ============================================================
// 1. 🌍 إعدادات اللغة والترجمة (القاموس الشامل)
// ============================================================
const translations = {
  ar: {
    // --- عام ---
    app_title: "نظام الفارس للديكور | CRM",
    company_name: "الفارس للمفروشات",
    loading: "جاري التحميل...",
    error: "خطأ في الاتصال",
    no_results: "لا توجد نتائج",
    currency: "د.إ",

    // --- القائمة الجانبية ---
    nav_dashboard: "الإحصائيات",
    nav_clients: "إدارة العملاء",
    nav_calc: "الحاسبة الذكية",
    nav_tracking: "المتابعة",

    // --- الداشبورد ---
    total_sales: "إجمالي المبيعات",
    clients_count: "عدد العملاء",
    chart_orders: "مخطط الطلبات الشهري",
    chart_services: "توزيع الخدمات",
    recent_clients: "🕒 أحدث 5 عملاء",

    // --- إدارة العملاء ---
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

    // --- الحاسبة (التابات) ---
    tab_curtain: "حاسبة الستائر",
    tab_carpet: "حاسبة السجاد",
    tab_wall: "حاسبة ورق الجدران",

    // --- حاسبة الستائر ---
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

    // --- حاسبة السجاد ---
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

    // --- حاسبة ورق الجدران ---
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

    // --- المعاينة والفواتير ---
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

    // --- المتابعة (Tracking) ---
    filter_all: "الكل",
    filter_pending: "⏳ قيد التنفيذ",
    filter_completed: "✅ مكتمل",
    th_id: "رقم المسلسل",
    th_type: "الخدمة",
    th_paid: "المدفوع",
    th_status: "الحالة",
    status_completed: "مكتمل",
    status_pending: "قيد التنفيذ",

    // --- الرسائل والتنبيهات ---
    enter_name: "يرجى كتابة الاسم",
    saving: "جاري الحفظ...",
    saved: "✅ تم الحفظ",
    saved_client: "✅ تم تسجيل العميل",
    invalid_num: "❌ رقم غير صحيح",
    valid_num: "✅ رقم صحيح",
    no_orders: "لا توجد طلبات 📭",
    confirm_status: "هل تريد تغيير حالة الطلب؟",

    // --- أخرى ---
    months: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    services: ["ستائر", "سجاد", "ورق جدران", "أخرى"],
  },

  en: {
    // --- General ---
    app_title: "Al Faris Decor | CRM",
    company_name: "Al Faris Furniture",
    loading: "Loading...",
    error: "Connection Error",
    no_results: "No results found",
    currency: "AED",

    // --- Sidebar ---
    nav_dashboard: "Dashboard",
    nav_clients: "Clients",
    nav_calc: "Calculator",
    nav_tracking: "Tracking",

    // --- Dashboard ---
    total_sales: "Total Sales",
    clients_count: "Active Clients",
    chart_orders: "Monthly Orders",
    chart_services: "Services Distribution",
    recent_clients: "🕒 Recent Clients",

    // --- Clients ---
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

    // --- Calculator Tabs ---
    tab_curtain: "Curtains",
    tab_carpet: "Carpets",
    tab_wall: "Wallpaper",

    // --- Curtain Calc ---
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

    // --- Carpet Calc ---
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

    // --- Wallpaper Calc ---
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

    // --- Preview & Invoice ---
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

    // --- Tracking ---
    filter_all: "All",
    filter_pending: "⏳ Pending",
    filter_completed: "✅ Completed",
    th_id: "Order ID",
    th_type: "Service",
    th_paid: "Paid",
    th_status: "Status",
    status_completed: "Completed",
    status_pending: "Pending",

    // --- Messages ---
    enter_name: "Please enter name",
    saving: "Saving...",
    saved: "✅ Saved",
    saved_client: "✅ Client Registered",
    invalid_num: "❌ Invalid Number",
    valid_num: "✅ Valid",
    no_orders: "No orders found 📭",
    confirm_status: "Change order status?",

    // --- Others ---
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
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
  // 1. إعدادات الصفحة
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  // 2. تحديث النصوص الثابتة
  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (translations[lang][key]) el.innerText = translations[lang][key];
  });

  // 3. تحديث نصوص الإدخال (Placeholders)
  document.querySelectorAll("[data-lang-ph]").forEach((el) => {
    const key = el.getAttribute("data-lang-ph");
    if (translations[lang][key]) el.placeholder = translations[lang][key];
  });

  // 4. تحديث العنوان في المتصفح
  const titleKey = document.querySelector("title").getAttribute("data-lang");
  if (translations[lang][titleKey])
    document.title = translations[lang][titleKey];

  // 5. تحديث الجداول والرسوم البيانية
  if (typeof renderOrdersTable === "function") renderOrdersTable();
  if (typeof updateDashboardUI === "function") updateDashboardUI();
  if (typeof initCharts === "function" && orders.length > 0) initCharts();
}

function t(key) {
  return translations[currentLang][key] || key;
}

// ============================================================
// 2. المتغيرات والاتصال بالسيرفر
// ============================================================
let customers = [];
let orders = [];
let CURRENT_PASSWORD = ""; // 🔥 متغير لتخزين الباسورد

// ⚠️ هام: تأكد من وضع رابط النشر الجديد هنا
const scriptURL =
  "https://script.google.com/macros/s/AKfycbyTLqEGFUy_aMhfHUhxkmqLicO-xRX1oLkYIO-CPb3I5AZjnQRl4XlNyq8CZ5msty6T/exec";

document.addEventListener("DOMContentLoaded", function () {
  applyLanguage(currentLang);

  // 🔥 التحقق من تسجيل الدخول (التعديل الجديد)
  const savedPass = sessionStorage.getItem("app_pass");
  if (savedPass) {
    // لو محفوظ، املأ الحقل وادخل تلقائي
    const passField = document.getElementById("admin-pass");
    if (passField) passField.value = savedPass;
    checkLogin();
  } else {
    // إظهار شاشة القفل
    const overlay = document.getElementById("login-overlay");
    if (overlay) overlay.style.display = "flex";
  }

  const defaultTab = document.getElementById("curtain-tab");
  if (defaultTab) defaultTab.style.display = "block";
  const defaultBtn = document.querySelector("button[onclick*='curtain-tab']");
  if (defaultBtn) defaultBtn.classList.add("active");

  initModalListener();
});

// ============================================================
// 🔐 دالة التحقق من الباسورد (جديد)
// ============================================================
function checkLogin() {
  const input = document.getElementById("admin-pass").value;
  const errorMsg = document.getElementById("login-error");
  const btn = document.querySelector("#login-overlay button");

  if (!input) return;

  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحقق...';
  btn.disabled = true;
  if (errorMsg) errorMsg.style.display = "none";

  // إرسال الباسورد للسيرفر للتأكد
  fetch(`${scriptURL}?type=login&pass=${encodeURIComponent(input)}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.result === "success") {
        // ✅ الباسورد صحيح
        CURRENT_PASSWORD = input;
        sessionStorage.setItem("app_pass", input);
        document.getElementById("login-overlay").style.display = "none";

        // 🚀 بدء تحميل البيانات الآن
        loadCustomersFromSheet();
        loadOrdersFromSheet();
      } else {
        throw new Error("Wrong Password");
      }
    })
    .catch((err) => {
      if (errorMsg) {
        errorMsg.style.display = "block";
        errorMsg.innerText = "❌ كلمة المرور خاطئة";
      }
      btn.innerHTML = originalText;
      btn.disabled = false;
      sessionStorage.removeItem("app_pass");
    });
}

// ============================================================
// 3. جلب البيانات (محدث لإرسال الباسورد)
// ============================================================
function loadCustomersFromSheet() {
  // 🔥 تم التعديل لإرسال الباسورد في الرابط
  fetch(`${scriptURL}?pass=${encodeURIComponent(CURRENT_PASSWORD)}`)
    .then((res) => res.json())
    .then((data) => {
      // لو السيرفر رجع خطأ في الباسورد
      if (data.error) {
        console.error("Auth Failed");
        return;
      }

      customers = [];
      if (Array.isArray(data)) {
        customers = data.slice(1).map((row, i) => ({
          id: i,
          date: formatDate(row[0]),
          name: row[1],
          phone: row[2],
          address: row[3] || "---",
          notes: row[4] || "",
        }));
      }
      updateDashboardUI();
    })
    .catch((err) => console.error(err));
}

function loadOrdersFromSheet() {
  const tbody = document.getElementById("orders-body");
  if (tbody)
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;">${t("loading")}</td></tr>`;

  // 🔥 تم التعديل لإرسال الباسورد في الرابط
  fetch(`${scriptURL}?type=orders&pass=${encodeURIComponent(CURRENT_PASSWORD)}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        console.error("Auth Failed");
        return;
      }

      orders = [];
      if (Array.isArray(data)) {
        // الترتيب: ID, Name, Phone, Address, Details, Service, Paid, Total, Status
        orders = data.slice(1).map((row) => ({
          id: String(row[0]),
          client: row[1],
          phone: row[2],
          address: row[3] || "---",
          details: row[4] || "---", // ✅ العمود الخامس: التفاصيل
          type: row[5],
          paid: row[6] || 0,
          total: row[7],
          status: row[8],
        }));
      }
      renderOrdersTable();
      calculateTotalSales();
      initCharts();
    })
    .catch((err) => console.error(err));
}

function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString("en-GB");
}

// ============================================================
// 4. تحديث الداشبورد
// ============================================================
function updateDashboardUI() {
  const mainBody = document.getElementById("customers-body");
  const recentBody = document.getElementById("recent-customers-body");
  const counter = document.getElementById("active-clients-dash");

  if (mainBody) {
    if (customers.length === 0) {
      mainBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">${t("no_results")}</td></tr>`;
    } else {
      mainBody.innerHTML = [...customers]
        .reverse()
        .map(
          (c, i) => `
                <tr onclick="openCustomerProfile(${c.id})" title="اضغط لعرض البروفايل" style="cursor:pointer;">
                    <td>${customers.length - i}</td>
                    <td>${c.date}</td>
                    <td>${c.name}</td>
                    <td dir="ltr" style="text-align:center; font-weight:bold;">${c.phone}</td>
                    <td>${c.address}</td>
                </tr>
            `,
        )
        .join("");
    }
  }

  if (recentBody) {
    recentBody.innerHTML = [...customers]
      .reverse()
      .slice(0, 5)
      .map(
        (c) => `
            <tr><td>${c.date}</td><td>${c.name}</td><td dir="ltr" style="text-align:center;">${c.phone}</td><td>${c.address}</td></tr>
        `,
      )
      .join("");
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
  salesEl.innerHTML = `${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style="font-size:0.6em">AED</span>`;
}

// ============================================================
// 5. قسم المتابعة (Tracking)
// ============================================================
function addNewOrderToTracking(
  clientName,
  clientPhone,
  clientAddress,
  type,
  amount,
  details, // ✅ استلام التفاصيل
) {
  const now = new Date();
  const prefix = `${String(now.getFullYear()).slice(-2)}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const count =
    orders.filter((o) => String(o.id).startsWith(prefix)).length + 1;
  const smartID = `${prefix}${String(count).padStart(3, "0")}`;

  const newOrder = {
    id: smartID,
    client: clientName,
    phone: clientPhone,
    address: clientAddress,
    type: type,
    paid: 0,
    total: amount,
    status: "pending",
    details: details || "---", // ✅ وضع التفاصيل
  };
  orders.unshift(newOrder);
  renderOrdersTable();
  calculateTotalSales();
  initCharts();
  return { id: smartID, date: now.toLocaleDateString("en-GB") };
}

function renderOrdersTable(filter = "all") {
  const tbody = document.getElementById("orders-body");
  if (!tbody) return;
  tbody.innerHTML = "";

  const filtered = orders.filter((o) =>
    filter === "all" ? true : o.status === filter,
  );

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:20px;">${t("no_orders")}</td></tr>`;
    return;
  }

  const displayOrders = [...filtered].reverse();

  displayOrders.forEach((order) => {
    let statusBadge = "";
    const statusText =
      order.status === "completed"
        ? t("status_completed")
        : t("status_pending");

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
                <td>${order.paid}</td>
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
    const currentFilter = currentFilterBtn
      ? currentFilterBtn.getAttribute("onclick").match(/'([^']+)'/)[1]
      : "all";
    renderOrdersTable(currentFilter);

    // 🔥 إرسال الباسورد مع التحديث
    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        type: "updateStatus",
        id: id,
        newStatus: order.status,
        password: CURRENT_PASSWORD, // ✅ إضافة الباسورد
      }),
    }).catch((err) => console.error(err));
  }
}

function filterOrders(type) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
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
    else if (type.includes("سجاد") || type.includes("carpet"))
      servicesCounts[1]++;
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
        datasets: [
          {
            label: currentLang === "ar" ? "عدد الطلبات" : "Orders Count",
            data: monthlyCounts,
            borderColor: "#d3bb60",
            backgroundColor: "rgba(211, 187, 96, 0.1)",
            tension: 0.4,
            fill: true,
            pointBackgroundColor: "#314e52",
            pointBorderColor: "#d3bb60",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: "#fff", font: { family: "Cairo" } } },
        },
        scales: {
          x: {
            ticks: { color: "#bbb", font: { family: "Cairo" } },
            grid: { color: "rgba(255,255,255,0.05)" },
          },
          y: {
            ticks: { color: "#bbb", stepSize: 1 },
            grid: { color: "rgba(255,255,255,0.05)" },
            beginAtZero: true,
          },
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
        datasets: [
          {
            data: servicesCounts,
            backgroundColor: ["#d3bb60", "#314e52", "#e7e6e1", "#555"],
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: "#fff", font: { family: "Cairo" } },
          },
        },
      },
    });
  }
}

// ============================================================
// 7. الدوال الأساسية والمودال
// ============================================================
function showSection(id, el) {
  document
    .querySelectorAll(".page-section")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document
    .querySelectorAll(".side-nav a")
    .forEach((a) => a.classList.remove("active"));
  el.classList.add("active");
}

function openTab(evt, tabName) {
  document
    .querySelectorAll(".tab-content")
    .forEach((c) => (c.style.display = "none"));
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById(tabName).style.display = "block";
  if (evt && evt.currentTarget) evt.currentTarget.classList.add("active");
}

function searchCustomers() {
  const term = document
    .getElementById("search-input")
    .value.toLowerCase()
    .trim();
  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(term) || String(c.phone).includes(term),
  );
  const mainBody = document.getElementById("customers-body");
  if (mainBody) {
    if (filtered.length === 0)
      mainBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">${t("no_results")}</td></tr>`;
    else
      mainBody.innerHTML = [...filtered]
        .reverse()
        .map(
          (c, i) => `
            <tr onclick="openCustomerProfile(${c.id})" title="اضغط لعرض البروفايل" style="cursor:pointer;">
                <td>${filtered.length - i}</td><td>${c.date}</td><td>${c.name}</td><td dir="ltr" style="text-align:center;">${c.phone}</td><td>${c.address}</td>
            </tr>`,
        )
        .join("");
  }
}

function saveCustomerLocal() {
  const nameInput = document.getElementById("cust-name");
  const phoneInput = document.getElementById("cust-phone");
  const addrInput = document.getElementById("cust-address");
  const notesInput = document.getElementById("cust-notes");
  const btn = document.getElementById("btn-save-cust");

  if (!nameInput.value.trim()) {
    alert(t("enter_name"));
    return;
  }

  const originalText = btn.innerText;
  btn.innerText = t("saving");
  btn.disabled = true;

  const newClient = {
    name: nameInput.value.trim(),
    phone: "'" + phoneInput.value,
    address: addrInput.value.trim() || "---",
    notes: notesInput.value.trim() || "",
    date: new Date(),
    password: CURRENT_PASSWORD, // ✅ إضافة الباسورد
  };

  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(newClient),
  })
    .then(() => {
      alert(t("saved"));
      customers.push({
        ...newClient,
        phone: newClient.phone.replace("'", ""),
        id: Date.now(),
        date: new Date().toLocaleDateString("en-GB"),
      });
      updateDashboardUI();
      nameInput.value = "";
      phoneInput.value = "";
      addrInput.value = "";
      notesInput.value = "";
      btn.innerText = originalText;
      btn.disabled = true;
    })
    .catch(() => {
      alert(t("error"));
      btn.innerText = originalText;
      btn.disabled = false;
    });
}

function initModalListener() {
  const quickPhoneInput = document.getElementById("quick-phone");
  const quickFeedback = document.querySelector(
    "#quick-add-modal #phone-feedback",
  );
  const quickSaveBtn = document.querySelector("#quick-add-modal .one");
  const mainPhone = document.getElementById("cust-phone");
  const mainBtn = document.getElementById("btn-save-cust");
  const mainFeedback = document.getElementById("phone-feedback");

  if (quickPhoneInput && quickSaveBtn) {
    quickPhoneInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "");
      const val = this.value;
      let isValid =
        (val.startsWith("05") && val.length === 10) ||
        (val.startsWith("04") && val.length === 9);
      if (val.length === 0) {
        if (quickFeedback) quickFeedback.innerText = "";
        quickSaveBtn.disabled = true;
        quickSaveBtn.style.opacity = "0.5";
      } else if (!isValid) {
        if (quickFeedback) {
          quickFeedback.innerText = t("invalid_num");
          quickFeedback.style.color = "red";
        }
        quickSaveBtn.disabled = true;
        quickSaveBtn.style.opacity = "0.5";
      } else {
        if (quickFeedback) {
          quickFeedback.innerText = t("valid_num");
          quickFeedback.style.color = "#2ecc71";
        }
        quickSaveBtn.disabled = false;
        quickSaveBtn.style.opacity = "1";
        quickSaveBtn.style.cursor = "pointer";
      }
    });
  }

  if (mainPhone && mainBtn) {
    mainPhone.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "");
      const val = this.value;
      let isValid =
        (val.startsWith("05") && val.length === 10) ||
        (val.startsWith("04") && val.length === 9);
      if (val.length === 0) {
        mainFeedback.innerText = "";
        mainBtn.disabled = true;
      } else if (!isValid) {
        mainFeedback.innerText = t("invalid_num");
        mainFeedback.style.color = "red";
        mainBtn.disabled = true;
      } else {
        mainFeedback.innerText = t("valid_num");
        mainFeedback.style.color = "#2ecc71";
        mainBtn.disabled = false;
      }
    });
  }
}

function saveQuickClient() {
  const nameInput = document.getElementById("quick-name");
  const phoneInput = document.getElementById("quick-phone");
  const addrInput = document.getElementById("quick-address");
  const notesInput = document.getElementById("quick-notes");
  const btn = document.querySelector("#quick-add-modal .one");

  if (!nameInput.value.trim()) {
    alert(t("enter_name"));
    return;
  }

  btn.innerText = t("saving");
  btn.disabled = true;

  const newClient = {
    name: nameInput.value.trim(),
    phone: phoneInput.value,
    address: addrInput.value || "استلام من المعرض",
    notes: notesInput.value.trim() || "",
    date: new Date(),
    password: CURRENT_PASSWORD, // ✅ إضافة الباسورد
  };
  const dataToSend = { ...newClient, phone: "'" + newClient.phone };

  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(dataToSend),
  }).catch((err) => console.error(err));

  customers.push({ ...newClient, phone: newClient.phone.replace("'", "") });
  updateDashboardUI();

  const clientForSelect = {
    ...newClient,
    phone: newClient.phone.replace("'", ""),
  };
  const curtainTab = document.getElementById("curtain-tab");
  const carpetTab = document.getElementById("carpet-tab");
  const wallTab = document.getElementById("wall-tab");

  if (curtainTab && getComputedStyle(curtainTab).display === "block") {
    if (typeof selectClient === "function") selectClient(clientForSelect);
  } else if (carpetTab && getComputedStyle(carpetTab).display === "block") {
    if (typeof selectCarpetClient === "function")
      selectCarpetClient(clientForSelect);
  } else if (wallTab && getComputedStyle(wallTab).display === "block") {
    if (typeof selectWallClient === "function")
      selectWallClient(clientForSelect);
  }

  closeQuickAdd();
  nameInput.value = "";
  phoneInput.value = "";
  addrInput.value = "";
  notesInput.value = "";
  btn.innerText = "حفظ واختيار العميل";
  btn.disabled = true;
  btn.style.opacity = "0.5";
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
// 9. 🔥 منطق بروفايل العميل (6 أعمدة + تحميل PDF)
// ============================================================
function openCustomerProfile(clientId) {
  const client = customers.find((c) => c.id === clientId);
  if (!client) return;

  document.getElementById("p-name").innerText = client.name;
  document.getElementById("p-phone").innerText = client.phone;
  document.getElementById("p-address").innerText = client.address;

  const cleanClientPhone = String(client.phone).replace(/[^0-9]/g, "");

  // البحث عن طلبات العميل
  const clientOrders = orders.filter((o) => {
    const orderPhoneClean = String(o.phone).replace(/[^0-9]/g, "");
    return (
      o.client === client.name ||
      (cleanClientPhone.length > 5 &&
        orderPhoneClean.includes(cleanClientPhone))
    );
  });

  let totalSpent = 0;
  let totalPaid = 0;
  const historyBody = document.getElementById("p-history-body");
  historyBody.innerHTML = "";

  if (clientOrders.length === 0) {
    historyBody.innerHTML =
      '<tr><td colspan="6" style="text-align:center;">لا توجد معاملات سابقة</td></tr>';
  } else {
    [...clientOrders].reverse().forEach((order) => {
      const amount = parseFloat(order.total) || 0;
      const paid = parseFloat(order.paid) || 0;
      totalSpent += amount;
      totalPaid += paid;

      const statusColor = order.status === "completed" ? "#2ecc71" : "#f39c12";
      const statusText =
        order.status === "completed"
          ? t("status_completed")
          : t("status_pending");

      historyBody.innerHTML += `
                <tr>
                    <td>${formatDateFromID(order.id)}</td>
                    <td>${order.details || "---"}</td> <td>${order.type}</td>
                    <td style="color:#2ecc71;">${paid.toFixed(2)}</td> <td style="color:var(--gold); font-weight:bold;">${amount.toFixed(2)}</td> <td><span style="color:${statusColor}; border:1px solid ${statusColor}; padding:2px 8px; border-radius:10px; font-size:0.8rem;">${statusText}</span></td>
                </tr>
            `;
    });
  }

  // تحديث إحصائيات البروفايل
  document.getElementById("p-total-spent").innerText =
    totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 });
  document.getElementById("p-total-paid").innerText = totalPaid.toLocaleString(
    undefined,
    { minimumFractionDigits: 2 },
  );

  const due = totalSpent - totalPaid;
  document.getElementById("p-total-due").innerText = due.toLocaleString(
    undefined,
    { minimumFractionDigits: 2 },
  );

  document.getElementById("profile-modal").style.display = "block";
}

function closeProfileModal() {
  document.getElementById("profile-modal").style.display = "none";
}

function formatDateFromID(id) {
  if (!id || id.length < 6) return "---";
  const yy = id.substring(0, 2);
  const mm = id.substring(2, 4);
  const dd = id.substring(4, 6);
  return `20${yy}/${mm}/${dd}`;
}

// دالة تحميل البروفايل PDF
function downloadProfilePDF() {
  const element = document.getElementById("profile-content-box");
  const name = document.getElementById("p-name").innerText;

  // إخفاء زرار الإغلاق وزرار التحميل قبل التصوير
  const noPrint = element.querySelectorAll(".no-print");
  noPrint.forEach((el) => (el.style.display = "none"));

  // تغيير الخلفية مؤقتاً لبيضاء عشان الطباعة تكون واضحة
  const originalBg = element.style.background;
  const originalColor = element.style.color;
  const originalBorder = element.style.border;

  element.style.background = "#fff";
  element.style.color = "#000";
  element.style.border = "2px solid #000";

  // تعديل ألوان النصوص الداخلية
  const headings = element.querySelectorAll("h2, h3, strong, span");
  headings.forEach((h) => (h.style.color = "#000"));

  const opt = {
    margin: 0.5,
    filename: `Profile_${name}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf()
    .from(element)
    .set(opt)
    .save()
    .then(() => {
      // استرجاع التصميم الأصلي
      noPrint.forEach((el) => (el.style.display = "block")); // استرجاع الأزرار (block مش flex عشان التوافق السريع)
      document.querySelector(".profile-actions").style.display = "flex"; // استرجاع زر التحميل

      element.style.background = originalBg;
      element.style.color = originalColor;
      element.style.border = originalBorder;
      headings.forEach((h) => (h.style.color = "")); // استرجاع الألوان من CSS
    });
}
