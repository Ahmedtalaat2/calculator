// ============================================================
// 1. 🌍 إعدادات اللغة والترجمة (Language System)
// ============================================================
const translations = {
  ar: {
    loading: "جاري التحميل...",
    error: "خطأ في الاتصال",
    no_results: "لا توجد نتائج",
    enter_name: "يرجى كتابة الاسم",
    saving: "جاري الحفظ...",
    saved: "✅ تم الحفظ",
    saved_client: "✅ تم تسجيل العميل",
    invalid_num: "❌ رقم غير صحيح",
    valid_num: "✅ رقم صحيح",
    no_orders: "لا توجد طلبات 📭",
    status_completed: "مكتمل",
    status_pending: "قيد التنفيذ",
    confirm_status: "هل تريد تغيير حالة الطلب؟",
  },
  en: {
    loading: "Loading...",
    error: "Connection Error",
    no_results: "No results found",
    enter_name: "Please enter name",
    saving: "Saving...",
    saved: "✅ Saved",
    saved_client: "✅ Client Registered",
    invalid_num: "❌ Invalid Number",
    valid_num: "✅ Valid",
    no_orders: "No orders found 📭",
    status_completed: "Completed",
    status_pending: "Pending",
    confirm_status: "Change order status?",
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

  // تحديث الجداول إذا كانت موجودة
  if (typeof renderOrdersTable === "function") renderOrdersTable();
  if (typeof updateDashboardUI === "function") updateDashboardUI();
}

function t(key) {
  return translations[currentLang][key] || key;
}

// ============================================================
// 2. المتغيرات والاتصال بالسيرفر
// ============================================================
let customers = [];
let orders = [];
// ⚠️ تأكد أن هذا الرابط هو أحدث رابط Deployment
const scriptURL =
  "https://script.google.com/macros/s/AKfycbzg7hONQEiq4Rsi7RtqINQWUtRghk7I8yi08qiFxcOwVPUzy8oxDYJKQez2-Cx75dl7/exec";

window.onload = function () {
  applyLanguage(currentLang);
  loadCustomersFromSheet();
  loadOrdersFromSheet();

  if (typeof initCharts === "function") initCharts();

  // فتح الستائر افتراضياً
  const defaultTab = document.getElementById("curtain-tab");
  if (defaultTab) defaultTab.style.display = "block";
};

// ============================================================
// 3. جلب البيانات (GET)
// ============================================================
function loadCustomersFromSheet() {
  fetch(scriptURL)
    .then((res) => res.json())
    .then((data) => {
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

  fetch(`${scriptURL}?type=orders`)
    .then((res) => res.json())
    .then((data) => {
      orders = [];
      if (Array.isArray(data)) {
        // ID | Name | Phone | Address | Service | Paid | Total | Status
        orders = data.slice(1).map((row) => ({
          id: String(row[0]),
          client: row[1],
          phone: row[2],
          address: row[3] || "---",
          type: row[4],
          paid: row[5] || 0,
          total: row[6],
          status: row[7],
        }));
      }
      renderOrdersTable();
    })
    .catch((err) => {
      console.error(err);
      if (tbody)
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:red;">${t("error")}</td></tr>`;
    });
}

function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString("en-GB");
}

// ============================================================
// 4. تحديث الداشبورد (تم إصلاح ترتيب الجدول ✅)
// ============================================================
function updateDashboardUI() {
  const mainBody = document.getElementById("customers-body");
  const recentBody = document.getElementById("recent-customers-body");
  const counter = document.getElementById("active-clients-dash");

  // جدول العملاء الكامل
  if (mainBody) {
    mainBody.innerHTML = [...customers]
      .reverse()
      .map(
        (c, i) => `
            <tr><td>${customers.length - i}</td><td>${c.date}</td><td>${c.name}</td><td dir="ltr" style="text-align:right">${c.phone}</td><td>${c.address}</td></tr>
        `,
      )
      .join("");
  }

  // جدول أحدث العملاء (الترتيب: التاريخ - الاسم - الهاتف - العنوان)
  if (recentBody) {
    recentBody.innerHTML = [...customers]
      .reverse()
      .slice(0, 5)
      .map(
        (c) => `
            <tr>
                <td>${c.date}</td>
                <td>${c.name}</td>
                <td dir="ltr" style="text-align:right">${c.phone}</td>
            </tr>
        `,
      )
      .join("");
  }

  if (counter) counter.innerText = customers.length;
}

// ============================================================
// 5. قسم المتابعة (Tracking) - تم الإصلاح ✅
// ============================================================

// دالة الربط (تستخدم في ملف curtain-calculator.js)
function addNewOrderToTracking(
  clientName,
  clientPhone,
  clientAddress,
  type,
  amount,
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
  };
  orders.unshift(newOrder); // إضافة في البداية
  renderOrdersTable();
  return { id: smartID, date: now.toLocaleDateString("en-GB") };
}

// رسم جدول المتابعة (بدون عمود إجراء - الحالة هي الزرار)
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

  [...filtered].reverse().forEach((order) => {
    // نعكس عشان الجديد يظهر فوق
    let statusBadge = "";
    const statusText =
      order.status === "completed"
        ? t("status_completed")
        : t("status_pending");

    // جعل البادج قابل للضغط (onclick)
    if (order.status === "completed") {
      statusBadge = `<span class="status-badge status-completed" onclick="toggleOrderStatus('${order.id}')" title="اضغط للتغيير">${statusText} <i class="fas fa-check"></i></span>`;
    } else {
      statusBadge = `<span class="status-badge status-pending" onclick="toggleOrderStatus('${order.id}')" title="اضغط للتغيير">${statusText} <i class="fas fa-clock"></i></span>`;
    }

    const row = `
            <tr>
                <td style="font-family:monospace; font-weight:bold; letter-spacing:1px; direction:ltr; color:#d3bb60;">${order.id}</td>
                <td>${order.client}</td>
                <td dir="ltr" style="text-align:right">${order.phone}</td>
                <td>${order.address}</td>
                <td>${order.type}</td>
                <td>${order.paid}</td>
                <td style="color:var(--gold); font-weight:bold;">${order.total}</td>
                <td>${statusBadge}</td> 
            </tr>`;
    tbody.insertAdjacentHTML("beforeend", row);
  });
}

// تبديل الحالة عند الضغط
function toggleOrderStatus(id) {
  const order = orders.find((o) => o.id == id);
  if (order) {
    // تبديل الحالة
    order.status = order.status === "pending" ? "completed" : "pending";

    // تحديث الجدول فوراً
    const currentFilterBtn = document.querySelector(".filter-btn.active");
    const currentFilter = currentFilterBtn
      ? currentFilterBtn.getAttribute("onclick").match(/'([^']+)'/)[1]
      : "all";
    renderOrdersTable(currentFilter);

    // إرسال للسيرفر
    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        type: "updateStatus",
        id: id,
        newStatus: order.status,
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
// 6. باقي الوظائف (البحث، المودال، الرسوم)
// ============================================================
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
          (c, i) =>
            `<tr><td>${filtered.length - i}</td><td>${c.date}</td><td>${c.name}</td><td dir="ltr" style="text-align:right">${c.phone}</td><td>${c.address}</td></tr>`,
        )
        .join("");
  }
}

function initCharts() {
  const ctx1 = document.getElementById("ordersChart");
  if (ctx1)
    new Chart(ctx1, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar"],
        datasets: [
          { label: "Orders", data: [10, 20, 30], borderColor: "#d3bb60" },
        ],
      },
    });
  const ctx2 = document.getElementById("servicesChart");
  if (ctx2)
    new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: ["Curtains", "Carpets", "Wall"],
        datasets: [
          {
            data: [50, 30, 20],
            backgroundColor: ["#d3bb60", "#314e52", "#e7e6e1"],
          },
        ],
      },
    });
}

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
  evt.currentTarget.classList.add("active");
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

function saveQuickClient() {
  const nameInput = document.getElementById("quick-name");
  const phoneInput = document.getElementById("quick-phone");
  const addrInput = document.getElementById("quick-address");
  const notesInput = document.getElementById("quick-notes");

  if (!nameInput.value.trim()) {
    alert(t("enter_name"));
    return;
  }

  const newClient = {
    name: nameInput.value.trim(),
    phone: "'" + phoneInput.value,
    address: addrInput.value.trim() || "---",
    notes: notesInput.value.trim() || "",
    date: new Date(),
  };

  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(newClient),
  }).catch((err) => console.error(err));

  customers.push({ ...newClient, phone: newClient.phone.replace("'", "") });
  const clientForSelection = {
    ...newClient,
    phone: newClient.phone.replace("'", ""),
  };

  if (
    typeof selectClient === "function" &&
    document.getElementById("curtain-tab").style.display === "block"
  )
    selectClient(clientForSelection);
  else if (
    typeof selectCarpetClient === "function" &&
    document.getElementById("carpet-tab").style.display === "block"
  )
    selectCarpetClient(clientForSelection);
  else if (
    typeof selectWallClient === "function" &&
    document.getElementById("wall-tab").style.display === "block"
  )
    selectWallClient(clientForSelection);

  closeQuickAdd();
  nameInput.value = "";
  phoneInput.value = "";
  addrInput.value = "";
  notesInput.value = "";
  alert(t("saved_client"));
}

function openQuickAddWithPhone(p) {
  document.getElementById("quick-add-modal").style.display = "block";
  document.getElementById("quick-phone").value = p;
}
function closeQuickAdd() {
  document.getElementById("quick-add-modal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const ph = document.getElementById("cust-phone");
  const btn = document.getElementById("btn-save-cust");
  const fb = document.getElementById("phone-feedback");
  if (ph && btn) {
    ph.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "");
      const v = this.value;
      let ok =
        (v.startsWith("05") && v.length === 10) ||
        (v.startsWith("04") && v.length === 9);
      if (v.length === 0) {
        fb.innerText = "";
        btn.disabled = true;
      } else if (!ok) {
        fb.innerText = t("invalid_num");
        fb.style.color = "red";
        btn.disabled = true;
      } else {
        fb.innerText = t("valid_num");
        fb.style.color = "#2ecc71";
        btn.disabled = false;
      }
    });
  }
});
