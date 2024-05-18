var username = document.getElementById("in-username");
var inputName = document.getElementById("in-name");
var depositWithdraw = document.getElementById("in-deposit-withdraw");
var password = document.getElementById("in-password");
var retypePassword = document.getElementById("in-retype-password");

var validationEmail = document.getElementById("in-username-validation");
var validationName = document.getElementById("in-name-validation");
var validationDepositWithdraw = document.getElementById(
  "in-deposit-withdraw-validation"
);
var validationPassword = document.getElementById("in-password-validation");
var validationRetypePassword = document.getElementById(
  "in-retype-password-validation"
);

var checkedUsername = false;
var checkedName = false;
var checkedDepositWithdraw = false;
var checkedPassword = false;
var checkedRetypePassword = false;

username.addEventListener("keyup", (event) => {
  if (event.key === "Enter" || event.keyCode === 13) {
    inputName.focus();
  }
  if (isValidEmail(username.value.trim())) {
    validationEmail.classList.add("fa-check");
    validationEmail.classList.remove("fa-remove");
    validationEmail.style.color = "green";
    checkedUsername = true;
    $("#in-message").text("");
  } else {
    validationEmail.classList.remove("fa-check");
    validationEmail.classList.add("fa-remove");
    validationEmail.style.color = "red";
    checkedUsername = false;
    $("#in-message").text("Insert a valid email");
  }

  username.value = username.value.toLowerCase();
});

function isValidEmail(email) {
  //check size
  if (email.length < 8) {
    return false;
  }
  //check if it has "@" symbol
  if (email.indexOf("@") < 1) {
    return false;
  }

  // check if it has "." symbol
  var emailPartitioned = email.split(".");
  var howManyDots = emailPartitioned.length;
  if (
    howManyDots == 1 ||
    email.charAt(email.length - 1) == "." ||
    email.charAt(email.length - 2) == "."
  ) {
    return false;
  }

  // check if it has "." after the "@" symbol
  if (
    email.indexOf("@") >
    email.length - emailPartitioned[howManyDots - 1].length
  ) {
    return false;
  }

  // Check if there are more than 1 "@" character
  if (email.split("@").length > 2) {
    return false;
  }

  // check if it has no " "
  if (email.indexOf(" ") != -1) {
    return false;
  }

  return true;
}

inputName.addEventListener("keyup", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    // return;
  }
  if (event.key === "Enter" || event.keyCode === 13) {
    depositWithdraw.focus();
  }
  if (isValidName(inputName.value)) {
    validationName.classList.add("fa-check");
    validationName.classList.remove("fa-remove");
    validationName.style.color = "green";
    checkedName = true;
    $("#in-message").text("");
  } else {
    validationName.classList.remove("fa-check");
    validationName.classList.add("fa-remove");
    validationName.style.color = "red";
    checkedName = false;
    $("#in-message").text("Insert a valid name");
  }
});

function isValidName(name) {
  if (name.length < 3) {
    return false;
  }
  return true;
}

depositWithdraw.addEventListener("keyup", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    // return;
  }
  if (event.key === "Enter" || event.keyCode === 13) {
    password.focus();
  }
  if (isValidDepositWithdraw(depositWithdraw.value)) {
    // validationInitialCash.innerHTML = "✔";
    validationDepositWithdraw.style.color = "green";
    validationDepositWithdraw.classList.add("fa-check");
    validationDepositWithdraw.classList.remove("fa-remove");
    checkedDepositWithdraw = true;
    $("#in-message").text("");
  } else {
    validationDepositWithdraw.classList.remove("fa-check");
    validationDepositWithdraw.classList.add("fa-remove");
    validationDepositWithdraw.style.color = "red";
    checkedDepositWithdraw = false;
    $("#in-message").text("Initial cash between 0 and 100,000.00");
    // validationInitialCash.innerHTML =
    // "✘ Insert a value between 0 and 100,000.00";
  }
});
depositWithdraw.addEventListener("change", (event) => {
  if (
    Number.isNaN(
      formatNumber(parseFloat(depositWithdraw.value.replace(",", "")).toFixed(2))
    )
  ) {
    return;
  } else {
    depositWithdraw.value = formatNumber(
      parseFloat(depositWithdraw.value.replace(",", "")).toFixed(2)
    );
  }

  if (depositWithdraw.value == "NaN") {
    depositWithdraw.value = "";
  }
});

function isValidDepositWithdraw(depositWithdraw) {
  if (Number.isNaN(parseFloat(depositWithdraw))) {
    return false;
  }

  if (parseFloat(depositWithdraw) < 0 || parseFloat(depositWithdraw) > 100000) {
    return false;
  }
  return true;
}

password.addEventListener("keyup", validatePassword);
retypePassword.addEventListener("keyup", validatePassword);

function validatePassword() {
  if (isValidRetypePassword(retypePassword.value)) {
    validationRetypePassword.classList.add("fa-check");
    validationRetypePassword.classList.remove("fa-remove");
    validationRetypePassword.style.color = "green";
    checkedRetypePassword = true;
  } else {
    validationRetypePassword.classList.remove("fa-check");
    validationRetypePassword.classList.add("fa-remove");
    validationRetypePassword.style.color = "red";
    checkedRetypePassword = false;
    $("#in-message").text("Retyped password doesn't match");
  }

  if (isValidPassword(password.value)) {
    validationPassword.classList.add("fa-check");
    validationPassword.classList.remove("fa-remove");
    validationPassword.style.color = "green";
    checkedPassword = true;
  } else {
    validationPassword.classList.remove("fa-check");
    validationPassword.classList.add("fa-remove");
    validationPassword.style.color = "red";
    checkedPassword.le = false;
    $("#in-message").text("Password must be 6 characters long");
  }

  if (
    isValidPassword(password.value) &&
    isValidRetypePassword(retypePassword.value)
  ) {
    $("#in-message").text("");
  }
}
function isValidPassword(password) {
  if (password.length < 6) {
    return false;
  }
  return true;
}

function isValidRetypePassword(retypePassword) {
  if (retypePassword != password.value) {
    return false;
  }
  return true;
}

function areAllFieldsValid() {
  if (
    checkedPassword == true &&
    checkedRetypePassword == true
  ) {
    return true;
  } else {
    return false;
  }
}

async function checkSessionUserLogged() {
  // if (checkedSession) {
  //   return;
  // }

  //let welcome = document.getElementById("welcome");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  sessionObj = { sessionID: sessionStorage.getItem("session") };
  sessionJSON = JSON.stringify(sessionObj);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: sessionJSON,
    redirect: "follow",
  };
  const url = host + "/getUser";
  try {
    const response = await fetch(url, requestOptions);
    const result = await response.text();
    const resStatus = await response.status;
    if (resStatus == "500") {
    } else if (resStatus == "201" || resStatus == "200") {
      console.log("Session checked sucessful");
      resultObj = JSON.parse(result);
      userLogged = resultObj;
    }
  } catch (error) {
    console.error(error);
  }

  if (userLogged == null) {
    alert("Invalid Session");
    window.location.href = "/index.html";
  }

  return userLogged;
}
