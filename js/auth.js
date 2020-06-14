function createNewUser() {
  const email = document.getElementById("emailSubmit").value;
  const password = document.getElementById("passwordSubmit").value;
  const result = document.getElementById("loginResult");

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
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
      const user = firebase.auth().currentUser;
      if (user.emailVerified) {
        window.location.href = "home.html";
      } else {
        result.innerHTML = "Please Verify Account.";
      }
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
      window.location.href = "index.html";
      result.innerHTML = "Log Out Successful.";
    })
    .catch(function (error) {
      result.innerHTML = error + "Log Out Unsuccessful.";
    });
}

function userStatus() {
  const navHome = document.getElementById("navHome");
  const navNewForm = document.getElementById("navNewForm");
  const navTitle = document.getElementById("navTitle");
  const navLogin = document.getElementById("navLogin");

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      navLogin.innerHTML = "Account";
      navTitle.setAttribute("href", "home.html");
      navLogin.setAttribute("href", "account.html");
    } else {
      navLogin.innerHTML = "Login";
      navHome.setAttribute("hidden", "");
      navNewForm.setAttribute("hidden", "");
      navTitle.removeAttribute("href");
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
