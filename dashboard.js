// Profile dropdown
function toggleMenu() {
  let menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}
function logout() {
  alert("Logged out successfully!");
  window.location.href = "home.html";
}

// Add Asset
function hideForms() {
  document.getElementById("addBox").style.display = "none";
  document.getElementById("editBox").style.display = "none";
  document.getElementById("deleteBox").style.display = "none";
}

function showAdd() {
  hideForms();
  document.getElementById("addBox").style.display = "flex";
}

function showEdit() {
  hideForms();
  document.getElementById("editBox").style.display = "flex";
}

function showDelete() {
  hideForms();
  document.getElementById("deleteBox").style.display = "flex";
}

const search = document.getElementById("searchBar");
const table1 = document.getElementById("assetTable");

// Prevent JS crash if elements are not present on the current page/DOM.
if (search && table1) {
  search.addEventListener("input", () => {
    let flag = false;
    let eleTobeSearch = parseInt(search.value);
    if (isNaN(eleTobeSearch)) return;

    for (let i = 0; i < table1.rows.length; i++) {
      table1.rows[i].style.borderColor = "";
      if (eleTobeSearch == parseInt(table1.rows[i].cells[0].innerText)) {
        table1.rows[i].style.border = "2px solid #3d40fd";
        flag = true;
        setTimeout(() => {
          table1.rows[i].style.borderColor = "";
        }, 5000);
      }
    }

    if (!flag) alert("Asset not found!!");
  });
}

const dashlink = document.getElementById("dashboard");
const dashSec = document.getElementById("dash-sec");

const assetlink = document.getElementById("asset");
const assetSec = document.getElementById("asset-sec");

const repolink = document.getElementById("report");
const repoSec = document.getElementById("repo-sec");

const settlink = document.getElementById("setting");
const settSec = document.getElementById("sett-sec");

assetlink.addEventListener("click", function (e) {
  e.preventDefault();
  removeBackColor();
  assetSec.style.display = "block";
  dashSec.style.display = "none";
  repoSec.style.display = "none";
  settSec.style.display = "none";
  assetlink.style.backgroundColor = " rgb(84, 205, 253)";
  assetlink.style.boxShadow =
    " 0 4px 10px rgba(255, 255, 255, 0.3),0 0 8px rgba(55, 223, 245, 0.4),0 0 16px rgba(20, 114, 209, 0.4)";
  assetlink.style.color = "white";
});
dashlink.addEventListener("click", function (e) {
  e.preventDefault();
  removeBackColor();
  dashSec.style.display = "block";
  assetSec.style.display = "none";
  repoSec.style.display = "none";
  settSec.style.display = "none";
  dashlink.style.backgroundColor = " rgb(84, 205, 253)";
  dashlink.style.boxShadow =
    " 0 4px 10px rgba(255, 255, 255, 0.3),0 0 8px rgba(55, 223, 245, 0.4),0 0 16px rgba(20, 114, 209, 0.4)";
  dashlink.style.color = "white";
});
repolink.addEventListener("click", function (e) {
  e.preventDefault();
  removeBackColor();
  repoSec.style.display = "block";
  dashSec.style.display = "none";
  assetSec.style.display = "none";
  settSec.style.display = "none";
  repolink.style.backgroundColor = " rgb(84, 205, 253)";
  repolink.style.boxShadow =
    " 0 4px 10px rgba(255, 255, 255, 0.3),0 0 8px rgba(55, 223, 245, 0.4),0 0 16px rgba(20, 114, 209, 0.4)";
  repolink.style.color = "white";
  openReport();
});
settlink.addEventListener("click", function (e) {
  e.preventDefault();
  removeBackColor();
  settSec.style.display = "block";
  dashSec.style.display = "none";
  assetSec.style.display = "none";
  repoSec.style.display = "none";
  settlink.style.backgroundColor = " rgb(84, 205, 253)";
  settlink.style.boxShadow =
    " 0 4px 10px rgba(255, 255, 255, 0.3),0 0 8px rgba(55, 223, 245, 0.4),0 0 16px rgba(20, 114, 209, 0.4)";
  settlink.style.color = "white";
});

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash === "#sett-sec") {
    profile();
  }
});

function profile() {
  removeBackColor();
  settSec.style.display = "block";
  dashSec.style.display = "none";
  assetSec.style.display = "none";
  repoSec.style.display = "none";
  settlink.style.backgroundColor = " rgb(84, 205, 253)";
  settlink.style.boxShadow =
    " 0 4px 10px rgba(255, 255, 255, 0.3),0 0 8px rgba(55, 223, 245, 0.4),0 0 16px rgba(20, 114, 209, 0.4)";
  settlink.style.color = "white";
}
function removeBackColor() {
  dashlink.style.backgroundColor = "";
  dashlink.style.color = "black";
  dashlink.style.boxShadow = "";

  assetlink.style.backgroundColor = "";
  assetlink.style.color = "black";
  assetlink.style.boxShadow = "";

  repolink.style.backgroundColor = "";
  repolink.style.color = "black";
  repolink.style.boxShadow = "";

  settlink.style.backgroundColor = "";
  settlink.style.color = "black";
  settlink.style.boxShadow = "";
}

function openReport() {
  document.getElementById("asset-sec").style.display = "none";
  document.getElementById("repo-sec").style.display = "block";

  let tableA = document.getElementById("assetTable");
  let tableR = document.getElementById("repoTable");

  let selected = document.getElementById("select").value.trim().toLowerCase();
  let selectedStatus = document
    .getElementById("status")
    .value.trim()
    .toLowerCase();
  tableR.innerHTML = ""; //taki new time click krne par row vapis se ayye naki pichle wali row mai appned ho

  for (let i = 0; i < tableA.rows.length; i++) {
    let cellValue = tableA.rows[i].cells[2].innerText.trim().toLowerCase();
    let statusValue = tableA.rows[i].cells[4].innerText.trim().toLowerCase();

    if (
      (selected === "all" || cellValue === selected) &&
      (selectedStatus === "all" || statusValue === selectedStatus)
    ) {
      tableR.innerHTML += tableA.rows[i].outerHTML;
    }
  }
}

// set sec ke liye h

function changePfp() {
  let pfp = document.getElementById("defaultPfp");
  let upload = document.getElementById("imageUpload");
  upload.click();

  upload.addEventListener("change", () => {
    const file = upload.files[0];
    if (file) {
      pfp.src = URL.createObjectURL(file);
    }
  });
}

function edit() {
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let company = document.getElementById("company");
  let role = document.getElementById("role");
  let role2 = document.getElementById("role2");

  name.removeAttribute("readonly");
  email.removeAttribute("readonly");
  company.removeAttribute("readonly");
  role.removeAttribute("readonly");

  let save = document.getElementById("save");
  save.addEventListener("click", () => {
    name.setAttribute("readonly", true);
    email.setAttribute("readonly", true);
    company.setAttribute("readonly", true);
    role.setAttribute("readonly", true);
    setTimeout(() => {
      role2.innerHTML = role.value;
    }, 2000);
  });
}

const chartCanvas = document.getElementById("myChart");
if (chartCanvas && window.Chart) {
  const statusLabels = Object.keys(window.STATUS_COUNTS);
  const statusData = Object.values(window.STATUS_COUNTS);

  const ctx = chartCanvas.getContext("2d");

  new Chart(ctx, {
    type: "doughnut",

    data: {
      labels: statusLabels,

      datasets: [
        {
          label: "Assets by Status",
          data: statusData,
          borderWidth: 3,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      layout: {
        padding: {
          left: 50,
          right: 0,
          top: 0,
          bottom: 10,
        },
      },

      animation: {
        duration: 1000,
        easing: "easeInOut",
      },
    },
  });
}

const Canvas = document.getElementById("Chart");

if (Canvas && window.Chart) {
  const categoryLabels = Object.keys(window.CATEGORY_COUNTS);
  const categoryData = Object.values(window.CATEGORY_COUNTS);

  const ctx = Canvas.getContext("2d");

  new Chart(ctx, {
    type: "bar",

    data: {
      labels: categoryLabels,

      datasets: [
        {
          label: "Assets by Category",
          data: categoryData,
          borderWidth: 3,
          backgroundColor: [
            "#0ea5e9",
            "#38bdf8",
            "#60a5fa",
            "#2563eb",
            "#0284c7",
            "#7dd3fc",
            "#1d4ed8",
          ],
              borderColor: [
        "#0369a1",
        "#0284c7",
        "#2563eb",
        "#1d4ed8",
        "#075985",
        "#0c4a6e",
        "#1e3a8a"
    ],

    borderWidth: 1,
    borderRadius: 12,
    barThickness: 45,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      layout: {
        padding: {
          left: 50,
          right: 0,
          top: 0,
          bottom: 10,
        },
      },

      animation: {
        duration: 1000,
        easing: "easeInOut",
      },
    },
  });
}

const AssigneeChart = document.getElementById("AssigneeChart");

if (AssigneeChart && window.Chart) {
  const assigneeLabels = Object.keys(window.ASSIGNEE_COUNTS);
  const assigneeData = Object.values(window.ASSIGNEE_COUNTS);

  const ctx = AssigneeChart.getContext("2d");

  new Chart(ctx, {
    type: "line",

    data: {
      labels: assigneeLabels,

      datasets: [
        {
          label: "Assets by Assignee",
          data: assigneeData,
          borderWidth: 3,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      layout: {
        padding: {
          left: 50,
          right: 0,
          top: 0,
          bottom: 10,
        },
      },

      animation: {
        duration: 1000,
        easing: "easeInOut",
      },
    },
  });
}
