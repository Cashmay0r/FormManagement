let globalChildData = {};

function readData() {
  //Database Reference
  const databaseRef = firebase.database();
  //Collect Database Information
  const fetchRef = databaseRef.ref();

  fetchRef.on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      const childData = childSnapshot.val();
      const childDataKeys = Object.keys(childData);
      childDataKeys.forEach((key) => {
        updateList(childData, key);
      });

      globalChildData = childData;
    });
  });
}

function updateList(childData, key) {
  let div = document.createElement("div");
  let list = document.createElement("li");

  Object.entries(childData).forEach((obj) => {
    if (key == obj[0]) {
      div.className = "gList";
      div.id = obj[0];
      list.innerHTML = obj[1].gName;
      list.className = "list-group-item";
      div.addEventListener("click", openListItemPage);
      div.appendChild(list);
      document.getElementById("myList").appendChild(div);
    }
  });
}
function openListItemPage(event) {
  event.stopPropagation();
  event.preventDefault();
  let key = event.currentTarget.id;
  //Store Across pages with sessionStorage
  let item = Object.entries(globalChildData[key]);
  sessionStorage.setItem("key", key);
  sessionStorage.setItem("arrayData", JSON.stringify(item));
  window.location.href = "listItem.html";
}

function openListItem() {
  let key = sessionStorage.getItem("key");
  let item = JSON.parse(sessionStorage.getItem("arrayData"));

  let listItems = ["gName", "gLocation", "arrival", "depDate", "total", "ageGroup", "activities", "diet", "request"];

  listItems.forEach((aName) => {
    let page = document.getElementById(aName);
    item.forEach((element) => {
      if (aName == element[0]) {
        page.innerHTML = page.innerHTML + element[1];
      }
    });
  });
}

function uploadData() {
  //Database Reference
  const databaseRef = firebase.database();

  const gName = document.getElementById("gName").value.trim();
  const gLocation = document.getElementById("gLocation").value.trim();
  const arrival = document.getElementById("arrival").value.trim();
  const depDate = document.getElementById("depDate").value.trim();
  const total = document.getElementById("total").value.trim();
  const ageGroup = document.getElementById("ageGroup").value.trim();
  const activities = document.getElementById("activities").value.trim();
  const diet = document.getElementById("diet").value.trim();
  const request = document.getElementById("request").value.trim();
  const dKey = new Date();
  const tKey = dKey.getTime();

  databaseRef.ref("groups/" + tKey).set({
    gName: gName,
    gLocation: gLocation,
    arrival: arrival,
    depDate: depDate,
    total: total,
    ageGroup: ageGroup,
    activities: activities,
    diet: diet,
    request: request,
    key: tKey,
  });
  window.location.href = "index.html";
}

function updateFormPreload() {
  let key = sessionStorage.getItem("key");
  let item = JSON.parse(sessionStorage.getItem("arrayData"));
  let listItems = ["gName", "gLocation", "arrival", "depDate", "total", "ageGroup", "activities", "diet", "request"];
  let listItemsUpdate = [
    "gNameUpdate",
    "gLocationUpdate",
    "arrivalUpdate",
    "depDateUpdate",
    "totalUpdate",
    "ageGroupUpdate",
    "activitiesUpdate",
    "dietUpdate",
    "requestUpdate",
  ];

  for (i = 0; i < listItemsUpdate.length; i++) {
    let page = document.getElementById(listItemsUpdate[i]);
    item.forEach((element) => {
      if (listItems[i] == element[0]) {
        page.value = element[1];
      }
    });
  }
}

function updateData() {
  const databaseRef = firebase.database();
  let tKey = sessionStorage.getItem("key");
  const gNameUpdate = document.getElementById("gNameUpdate").value.trim();
  const gLocationUpdate = document.getElementById("gLocationUpdate").value.trim();
  const arrivalUpdate = document.getElementById("arrivalUpdate").value.trim();
  const depDateUpdate = document.getElementById("depDateUpdate").value.trim();
  const totalUpdate = document.getElementById("totalUpdate").value.trim();
  const ageGroupUpdate = document.getElementById("ageGroupUpdate").value.trim();
  const activitiesUpdate = document.getElementById("activitiesUpdate").value.trim();
  const dietUpdate = document.getElementById("dietUpdate").value.trim();
  const requestUpdate = document.getElementById("requestUpdate").value.trim();
  let updates = {
    gName: gNameUpdate,
    gLocation: gLocationUpdate,
    arrival: arrivalUpdate,
    depDate: depDateUpdate,
    total: totalUpdate,
    ageGroup: ageGroupUpdate,
    activities: activitiesUpdate,
    diet: dietUpdate,
    request: requestUpdate,
    key: tKey,
  };
  databaseRef.ref("groups/" + tKey).update(updates);
}
function deleteData() {
  const databaseRef = firebase.database();
  let tKey = sessionStorage.getItem("key");
  databaseRef
    .ref("groups/" + tKey)
    .remove()
    .then(function () {
      console.log("Remove Successful");
      window.location.href = "index.html";
    })
    .catch(function (error) {
      console.log("Remove Failed");
    });
}
