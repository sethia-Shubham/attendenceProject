const inputBox = document.getElementById("inputBox");
const inputDate = document.getElementById("day");
const listCont = document.getElementById("listContainer");

function loadData() {
  const savedList = localStorage.getItem("dbs");
  const savedTotals = JSON.parse(localStorage.getItem("dbsTotal")) || {
    totalCount: 0,
    totalPresent: 0,
    totalAbsent: 0,
  };

  if (savedList) {
    listCont.innerHTML = savedList;
  }

  document.querySelector(
    ".total"
  ).innerHTML = `Total Classes: ${savedTotals.totalCount}`;
  document.querySelector(
    ".present"
  ).innerHTML = `Total Present: ${savedTotals.totalPresent}`;
  document.querySelector(
    ".absent"
  ).innerHTML = `Total Absent: ${savedTotals.totalAbsent}`;
}

function addDay() {
  if (inputBox.value.trim() === "" || inputDate.value === "") {
    alert("Please enter both a status and a date!");
    return;
  }

  const savedTotals = JSON.parse(localStorage.getItem("dbsTotal")) || {
    totalCount: 0,
    totalPresent: 0,
    totalAbsent: 0,
  };

  let li = document.createElement("li");
  let div = document.createElement("div");
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let removeBtn = document.createElement("button");

  p1.textContent = inputBox.value;
  p2.textContent = inputDate.value;
  removeBtn.textContent = "Remove";

  div.style.display = "flex";
  div.style.justifyContent = "space-between";
  div.style.alignItems = "center";
  div.style.gap = "15px";

  removeBtn.style.background = "#ff5945";
  removeBtn.style.color = "white";
  removeBtn.style.border = "none";
  removeBtn.style.borderRadius = "20px";
  removeBtn.style.padding = "5px 10px";
  removeBtn.style.cursor = "pointer";

  removeBtn.addEventListener("click", function () {
    li.remove();
    updateTotalsFromList();
    saveData();
  });

  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(removeBtn);
  li.appendChild(div);
  listCont.appendChild(li);

  const inputValue = inputBox.value.toLowerCase();
  savedTotals.totalCount += 1;

  if (inputValue === "present") {
    li.style.backgroundColor = "green";
    savedTotals.totalPresent += 1;
  } else if (inputValue === "absent") {
    li.style.backgroundColor = "red";
    savedTotals.totalAbsent += 1;
  } else if (inputValue === "cancelled") {
    li.style.backgroundColor = "grey";
  }

  updateTotalsUI(savedTotals);

  inputBox.value = "";
  inputDate.value = "";
  saveData();
}

function updateTotalsFromList() {
  const items = Array.from(listCont.children);
  const dbsTotal = { totalCount: 0, totalPresent: 0, totalAbsent: 0 };

  items.forEach((li) => {
    const status = li.querySelector("p").textContent.toLowerCase();

    if (status === "present") {
      dbsTotal.totalCount += 1;
      dbsTotal.totalPresent += 1;
    } else if (status === "absent") {
      dbsTotal.totalCount += 1;
      dbsTotal.totalAbsent += 1;
    }
  });

  localStorage.setItem("dbsTotal", JSON.stringify(dbsTotal));
  updateTotalsUI(dbsTotal);
}

function updateTotalsUI(dbsTotal) {
  document.querySelector(
    ".total"
  ).innerHTML = `Total Classes: ${dbsTotal.totalCount}`;
  document.querySelector(
    ".present"
  ).innerHTML = `Total Present: ${dbsTotal.totalPresent}`;
  document.querySelector(
    ".absent"
  ).innerHTML = `Total Absent: ${dbsTotal.totalAbsent}`;
}

function saveData() {
  localStorage.setItem("dbs", listCont.innerHTML);
  updateTotalsFromList();
}

// Load data when the page is loaded
loadData();
