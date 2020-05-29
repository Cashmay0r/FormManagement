//Features:
//Upload data to cloud <--DONE
//Create List and cloud data to populate list upon page loading <--DONE
//Able to click on list item and details populate from cloud <--DONE
//Use a UID for each entry to avoid multiple groups of same name overwriting <--DONE
//Able to update and modify list which updates the cloud data <--DONE
//Format forms to appropriate fields 
//Able to export data to An excel spreadsheet 
//Figure out how to only allow authenticated users access to write database
//Export dietaries to exclusive file with names and dietary requirements
//Include an account log in system
//Notify when new booking or changes have been made
//Log in persmissions
// Your web app's Firebase configuration


//Form Field Formats
//Name = String
//Location = String
//Arrival/Departure = Date Selection
//Total persons = Integer
//Age Group = List Selection
//Activities = List of Available Activities
//Dietaries = Create a list entry with Name + Dietary
//Request = Large Text Field

//Key management
//-Upload can use unique key
//-download can use unique key
//-Display can use unique key
//-Update can use unique key

//#2c3e50 navbar heading colour
//body colour #18bc9c
let globalChildData = {};

function readData() {
    
    //Database Reference
    if (!firebase){
        return;
    }
    const databaseRef = firebase.database();

    //Collect Database Information

    const fetchRef = databaseRef.ref();

    fetchRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            const childData = childSnapshot.val();
            const childDataKeys = Object.keys(childData);
            childDataKeys.forEach((key) => {
                updateList(childData, key);
            });

            globalChildData = childData;
        })
    })
}

function updateList(childData, key) {
    let div = document.createElement("div");
    let list = document.createElement("li");

    Object.entries(childData).forEach((obj) => {
        if (key == obj[0]) {
            div.id = "gList";
            list.innerHTML = obj[1].gName;
            list.id = obj[0];
            list.addEventListener("click", openListItemPage);
            div.appendChild(list);
            document.getElementById("myList").appendChild(div);
        }
    })
}
//if (gValues) {
//Object.values(gValues).forEach((item) => {
//});
// }
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

    let key = sessionStorage.getItem('key');
    let item = JSON.parse(sessionStorage.getItem('arrayData'));

    let listItems = ['gName', 'gLocation', 'arrival', 'depDate', 'total', 'ageGroup', 'activities', 'diet', 'request'];

    listItems.forEach(aName => {
        let page = document.getElementById(aName);
        item.forEach(element => {
            if (aName == element[0]) {
                page.innerHTML = page.innerHTML + element[1];
            }
        })
    })
}


function uploadData() {
    //Database Reference
    const databaseRef = firebase.database();

    const gName = document.getElementById('gName').value;
    const gLocation = document.getElementById('gLocation').value;
    const arrival = document.getElementById('arrival').value;
    const depDate = document.getElementById('depDate').value;
    const total = document.getElementById('total').value;
    const ageGroup = document.getElementById('ageGroup').value;
    const activities = document.getElementById('activities').value;
    const diet = document.getElementById('diet').value;
    const request = document.getElementById('request').value;
    const dKey = new Date;
    const tKey = dKey.getTime();
    databaseRef.ref('groups/' + tKey).set({
        gName: gName,
        gLocation: gLocation,
        arrival: arrival,
        depDate: depDate,
        total: total,
        ageGroup: ageGroup,
        activities: activities,
        diet: diet,
        request: request,
        key: tKey

    });

}

function updateFormPreload() {
    let key = sessionStorage.getItem('key');
    let item = JSON.parse(sessionStorage.getItem('arrayData'));
    let listItems = ['gName', 'gLocation', 'arrival', 'depDate', 'total', 'ageGroup', 'activities', 'diet', 'request'];
    let listItemsUpdate = ['gNameUpdate', 'gLocationUpdate', 'arrivalUpdate', 'depDateUpdate', 'totalUpdate', 'ageGroupUpdate', 'activitiesUpdate', 'dietUpdate', 'requestUpdate'];

    for (i = 0; i < listItemsUpdate.length; i++) {
        let page = document.getElementById(listItemsUpdate[i]);
        item.forEach(element => {
            if (listItems[i] == element[0]) {
                page.value = element[1];
            }
        })

    }

}

function updateData() {

    const databaseRef = firebase.database();
    let tKey = sessionStorage.getItem('key');
    const gNameUpdate = document.getElementById('gNameUpdate').value;
    const gLocationUpdate = document.getElementById('gLocationUpdate').value;
    const arrivalUpdate = document.getElementById('arrivalUpdate').value;
    const depDateUpdate = document.getElementById('depDateUpdate').value;
    const totalUpdate = document.getElementById('totalUpdate').value;
    const ageGroupUpdate = document.getElementById('ageGroupUpdate').value;
    const activitiesUpdate = document.getElementById('activitiesUpdate').value;
    const dietUpdate = document.getElementById('dietUpdate').value;
    const requestUpdate = document.getElementById('requestUpdate').value;
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
        key:tKey


    };
    databaseRef.ref('groups/' + tKey).update(updates);
    window.location.href="index.html";
}
function deleteData(){

    if (!firebase){
        return;
    }
    const databaseRef = firebase.database();
    let tKey = sessionStorage.getItem('key');
    databaseRef.ref('groups/' + tKey).remove()
        .then(function(){
            console.log("Remove Successful");
            window.location.href="index.html";
        })
        .catch(function (error){
            console.log("Remove Failed" )
        })
   
   // window.location.href="index.html";
    
    }
//Use the REQUIRED HTML CODE THINGO
    function inputErrorCheck(){
        let inputTest = false;
        const gName = document.getElementById("gName");
        if (String(gName)){
            inputTest = true;
        }
        const gLocation = document.getElementById("gLocation");
        if (String(gLocation)){
            inputTest = true;
        }
        const arrival = document.getElementById("arrival");
        if (Date.parse(arrival)){
            inputTest = true;
        }
        const depDate = document.getElementById("depDate");
        if (Date.parse(depDate)){
            inputTest = true;
        }
        const total = document.getElementById("total");
        if (parseInt(total)){
            inputTest = true;
        }
        const ageGroup = document.getElementById("ageGroup");

        const activities = document.getElementById("activities");
        const diet = document.getElementById("diet");
        const request = document.getElementById("request");

        if (inputTest == true){
            updateData();
        }
    }
    
   
