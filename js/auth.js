function createNewUser() {
  const email = document.getElementById("emailSubmit").value;
  const password = document.getElementById("passwordSubmit").value;
  const result = document.getElementById("loginResult");

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      result.innerHTML = "Password Must Contain a symbol, number and Uppercase Character";
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
      window.location.href = "index.html";
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      result.innerHTML = "Incorrect Password";
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
  const result = document.getElementById("loginResult");

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      result.innerHTML = email + " is already logged in.";
      // ...
    } else {
      // User is signed out.
      result.innerHTML = "No user is logged in.";
      // ...
    }
  });
}
