function createNewUser() {
  const email = document.getElementById("emailSubmit").value;
  const password = document.getElementById("passwordSubmit").value;
  const result = document.getElementById("loginResult");

  firebase
    .auth()
    .currentUser.createUserWithEmailAndPassword(email, password)
    .then(function () {
      const user = firebase.auth().currentUser;

      user.sendEmailVerification().then(function () {
        result.innerHTML = "Verification Email Sent";
      });
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      result.innerHTML = errorMessage;
      // ...
    });
}

function userLogin() {
  const email = document.getElementById("emailSubmit").value;
  const password = document.getElementById("passwordSubmit").value;
  const result = document.getElementById("loginResult");

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      window.location.href = "home.html";
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      result.innerHTML = errorMessage;
    });
}
function userLogout() {
  const result = document.getElementById("loginResult");
  firebase
    .auth()
    .signOut()
    .then(function () {
      result.innerHTML = "Log Out Successful.";
    })
    .catch(function (error) {
      result.innerHTML = "Log Out Unsuccessful.";
    });
}

function userStatus() {
  const navHome = document.getElementById("navHome");
  const navNewForm = document.getElementById("navNewForm");
  const navTitle = document.getElementById("navTitle");
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      navTitle.setAttribute("href", "home.html");
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      // ...
    } else {
      // User is signed out.
      navHome.setAttribute("hidden", "");
      navNewForm.setAttribute("hidden", "");
      navTitle.removeAttribute("href");
      // ...
    }
  });
}
function userCheck() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    } else {
      window.location.replace("index.html");
    }
  });
}
