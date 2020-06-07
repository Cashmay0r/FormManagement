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
function placeSearch() {
  const searchBar = document.getElementById("gLocation");

  var componentForm = {
    street_number: "short_name",
    route: "long_name",
    locality: "long_name",
    administrative_area_level_1: "short_name",
    country: "long_name",
    postal_code: "short_name",
  };

  function initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("searchBar"),
      { types: ["geocode"] }
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    autocomplete.setFields(["address_component"]);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener("place_changed", fillInAddress);
  }

  function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
      document.getElementById(component).value = "";
      document.getElementById(component).disabled = false;
    }
  }
}
