function inputCheck() {
  let inputTest = false;
  const gName = document.getElementById("gName");
  if (!gName.checkValidity()) {
    inputTest = true;
  }
  const gLocation = document.getElementById("gLocation");
  if (!gLocation.checkValidity()) {
    inputTest = true;
  }
  const arrival = document.getElementById("arrival");
  if (!arrival.checkValidity()) {
    inputTest = true;
  } else {
    const arrivalDate = new Date(arrival.value);
    const currentDate = new Date(getCurrentDate());

    if (arrivalDate.getTime() < currentDate.getTime()) {
      inputTest = true;
    }
  }
  const depDate = document.getElementById("depDate");
  if (!depDate.checkValidity()) {
    inputTest = true;
  }
  const total = document.getElementById("total");
  if (!total.checkValidity()) {
    inputTest = true;
  }
  const ageGroup = document.getElementById("ageGroup");
  if (!ageGroup.checkValidity()) {
    inputTest = true;
  }
  const activities = document.getElementById("activities");
  if (!activities.checkValidity()) {
    inputTest = true;
  }
  const diet = document.getElementById("diet");
  if (!diet.checkValidity()) {
    inputTest = true;
  }
  const request = document.getElementById("request");
  if (!request.checkValidity()) {
    inputTest = true;
  }
  if (inputTest == false) {
    uploadData();
  }
  return inputTest;
}

function getCurrentDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  return today;
}
