function createNewUser() {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
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
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      result.setAttribute("value", errorCode + errorMessage);
    });
}
