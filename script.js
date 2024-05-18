let userLogged = null;
let checkedSession = false;
let actualSessionID = null;

let host = "http://137.186.165.104:3000";
//host = "http://localhost:3000";
var api_key;

async function getKey() {
  console.log("function getKey called");

  sessionObj = { sessionID: sessionStorage.getItem("session") };
  sessionJSON = JSON.stringify(sessionObj);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: sessionJSON,
    redirect: "follow",
  };
  const url = host + "/getKey";
  try {
    const response = await fetch(url, requestOptions);
    const result = await response.text();
    const resStatus = await response.status;

    if (resStatus == "500") {
      //message.innerText = "Invalid Session - Error to get API key";
    } else if (resStatus == "201" || resStatus == "200") {
      console.log("result");
      console.log(result);
      console.log(resStatus);
      resultObj = JSON.parse(result);
      sessionStorage.setItem("apiKey", resultObj.api_key);
      console.log("sessionStorage.getItem('apiKey')");
      console.log(sessionStorage.getItem("apiKey"));
      api_key = sessionStorage.getItem("apiKey");
      goPortfolio();
      //updateLogin()
      //listProperties('all')
    }
  } catch (error) {
    console.error(error);
  }
}

function toggleVisibility(item) {
  let newId = item.id.toString().replace("-visibility", "");
  let parent = document.getElementById(newId);

  if (item.classList.toString().includes("fa-eye-slash")) {
    item.classList.remove("fa-eye-slash");
    parent.type = "text";
    item.classList.add("fa-eye");
  } else {
    item.classList.add("fa-eye-slash");
    item.classList.remove("fa-eye");
    parent.type = "password";
  }
}

async function login() {
  let username = document.getElementById("in-username");
  let password = document.getElementById("in-password");
  let checkbox = document.getElementById("in-checkbox");
  let message = document.getElementById("in-message");

  if (checkbox.checked == true) {
    localStorage.setItem("userSaved", username.value);
  } else {
    localStorage.setItem("userSaved", "");
  }

  try {
    const response = await fetch("https://api.ipify.org/?format=json");
    const result = await response.text();
    const resStatus = await response.status;
    console.log(resStatus);
    //console.log(result);
    objIp = JSON.parse(result);
  } catch (error) {
    console.error(error);
  }
  objLogin = {
    username: username.value,
    password: password.value,
    ip: objIp.ip,
  };
  JSONLogin = JSON.stringify(objLogin);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSONLogin,
    redirect: "follow",
  };
  const url = host + "/login";
  try {
    const response = await fetch(url, requestOptions);
    const result = await response.text();
    const resStatus = await response.status;

    if (resStatus == "500") {
      message.innerText = "Incorrect Credentials";
    } else if (resStatus == "201" || resStatus == "200") {
      console.log(result);
      console.log(resStatus);
      resultObj = JSON.parse(result);
      sessionStorage.setItem("session", resultObj.sessionID);
      console.log("sessionStorage.getItem('session')");
      console.log(sessionStorage.getItem("session"));
      api_key = getKey();
      //goPortfolio();
      //updateLogin()
      //listProperties('all')
    }
  } catch (error) {
    console.error(error);
  }
}

function logout() {
  sessionStorage.clear();
  goSignin();
}

async function signup() {
  if (!areAllFieldsValid()) {
    alert("Please validate all fields!");
    return;
  }
  let username = document.getElementById("in-username");
  let name = document.getElementById("in-name");
  let initialCash = document.getElementById("in-initial-cash");
  let password = document.getElementById("in-password");
  let retypePassword = document.getElementById("in-retype-password");
  let objIp;

  try {
    const response = await fetch("https://api.ipify.org/?format=json");
    const result = await response.text();
    const resStatus = await response.status;
    console.log(resStatus);
    //console.log(result);
    objIp = JSON.parse(result);
  } catch (error) {
    console.error(error);
  }

  let newUser = {
    name: name.value,
    email: username.value,
    password: password.value,
    cash: [
      {
        currency: "USD",
        balance: parseFloat(initialCash.value.replace(",", "")).toFixed(2),
      },
    ],
    stock: [],
    watchlist: [],
    ip: objIp.ip,
    dateCreation: Date.now(),
  };
  console.log(newUser);

  // objLogin = {
  //   username: username.value,
  //   password: password.value,
  //   ip: objIp.ip,
  // };
  JSONnewUser = JSON.stringify(newUser);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSONnewUser,
    redirect: "follow",
  };
  const url = host + "/signup";
  try {
    const response = await fetch(url, requestOptions);
    const result = await response.text();
    const resStatus = await response.status;

    if (resStatus == "500") {
      alert("Signup Error");
    } else if (resStatus == "201" || resStatus == "200") {
      console.log(result);
      console.log(resStatus);
      // resultObj = JSON.parse(result);
      // sessionStorage.setItem("session", resultObj.sessionID);
      // console.log(sessionStorage.getItem("session"));
      // goPortfolio();
      //updateLogin()
      //listProperties('all')
      localStorage.setItem("userSaved", username.value);
      console.log("userSaved: " + username.value);

      username.value = "";
      name.value = "";
      initialCash.value = "";
      password.value = "";
      retypePassword.value = "";

      // validationEmail.innerText = "";
      // validationName.innerText = "";
      // validationInitialCash.innerText = "";
      // validationPassword.innerText = "";
      // validationRetypePassword.innerText = "";

      goSignin();
    }
  } catch (error) {
    console.error(error);
  }
}

function checkUserSaved() {
  let username = document.getElementById("in-username");
  let password = document.getElementById("in-password");
  let checkbox = document.getElementById("in-checkbox");
  let userSaved = localStorage.getItem("userSaved");

  if (userSaved != null) {
    username.value = userSaved;
    password.focus();
  }
  checkbox.checked = true;
}

async function checkSession() {
  if (checkedSession) {
    return;
  }

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
  //welcome.innerHTML = "Welcome, " + userLogged.name;

  let myRecyclerView = document.getElementById("myRecyclerView");
  for (let i = 0; i < userLogged.cash.length; i++) {
    let box = document.createElement("div");
    box.className = "container-portfolio";

    let img = document.createElement("i");
    img.className = "fa fa-dollar img-cash";

    let cashLeft = document.createElement("div");
    cashLeft.className = "cash-left";
    cashLeft.innerHTML = "Cash";

    let cashCenter = document.createElement("div");
    cashCenter.className = "cash-center";
    cashCenter.innerHTML = userLogged.cash[i].currency;

    let cashRight = document.createElement("div");
    cashRight.className = "cash-right";
    cashRight.innerHTML = formatNumber(
      parseFloat(userLogged.cash[i].balance).toFixed(2)
    );

    box.appendChild(img);
    box.appendChild(cashLeft);
    box.appendChild(cashCenter);
    box.appendChild(cashRight);
    myRecyclerView.appendChild(box);
  }

  for (let i = 0; i < userLogged.stock.length; i++) {
    let box = document.createElement("div");
    box.className = "container-portfolio";

    let img = document.createElement("img");
    img.className = "img-stock";
    img.src = "b_investor_logo2.png";
    img.id = "img-" + userLogged.stock[i].symbol;

    let stockLeft = document.createElement("div");
    stockLeft.className = "stock-left";

    let stockSymbol = document.createElement("div");
    stockSymbol.className = "symbol";
    stockSymbol.id = "symbol-" + userLogged.stock[i].symbol;
    stockSymbol.innerHTML = userLogged.stock[i].symbol;

    let symbolDescription = document.createElement("div");
    symbolDescription.className = "description";
    symbolDescription.id = "description-" + userLogged.stock[i].symbol;
    symbolDescription.innerHTML = "--";

    stockLeft.appendChild(stockSymbol);
    stockLeft.appendChild(symbolDescription);

    let stockCenter = document.createElement("div");
    stockCenter.className = "stock-center";

    let stockValue = document.createElement("div");
    stockValue.className = "value";
    stockValue.id = "value-" + userLogged.stock[i].symbol;
    stockValue.innerHTML = "--";

    let stockShare = document.createElement("div");
    stockShare.className = "share";
    stockShare.id = "share-" + userLogged.stock[i].symbol;
    stockShare.innerHTML = userLogged.stock[i].qt;

    stockCenter.appendChild(stockValue);
    stockCenter.appendChild(stockShare);

    let stockRight = document.createElement("div");
    stockRight.className = "stock-right";

    let stockLast = document.createElement("div");
    stockLast.className = "last";
    stockLast.id = "last-" + userLogged.stock[i].symbol;
    stockLast.innerHTML = "--";

    let stockChange = document.createElement("div");
    stockChange.className = "change";
    stockChange.id = "change-" + userLogged.stock[i].symbol;
    stockChange.innerHTML = "--";

    stockRight.appendChild(stockLast);
    stockRight.appendChild(stockChange);

    box.appendChild(img);
    box.appendChild(stockLeft);
    box.appendChild(stockCenter);
    box.appendChild(stockRight);
    box.addEventListener("click", function () {
      goTransactionWith(userLogged.stock[i].symbol);
    });
    myRecyclerView.appendChild(box);

    checkedSession = true;

    updateDescription();

    updateQuote();

    let promise = new Promise((resolve, reject) => {
      let count = 0;
      let intervalID = setInterval(() => {
        count++;
        updateQuote();
        if (count > 100) {
          clearInterval(intervalID);
          resolve();
        }
      }, 3000);
    });

    // setInterval(await updateQuote(), 1000);
  }
}

async function updateDescription() {
  for (let i = 0; i < userLogged.stock.length; i++) {
    console.log(api_key);
    //Company profile2
    try {
      const response = await fetch(
        "https://finnhub.io/api/v1/stock/profile2?symbol=" +
          userLogged.stock[i].symbol +
          "&token=" +
          sessionStorage.getItem("apiKey")
      );
      const result = await response.text();
      const resStatus = await response.status;
      console.log(resStatus);
      //console.log(result);
      companyProfile2 = JSON.parse(result);
    } catch (error) {
      console.error(error);
    }

    let imgLogo = document.getElementById("img-" + userLogged.stock[i].symbol);
    imgLogo.src = companyProfile2.logo;

    let stockDescription = document.getElementById(
      "description-" + userLogged.stock[i].symbol
    );
    stockDescription.innerHTML = companyProfile2.name;
  }
}
async function updateQuote() {
  console.log("updateQuote() called");
  for (let i = 0; i < userLogged.stock.length; i++) {
    //Quote
    try {
      const response = await fetch(
        "https://finnhub.io/api/v1/quote?symbol=" +
          userLogged.stock[i].symbol +
          "&token=" +
          sessionStorage.getItem("apiKey")
      );
      const result = await response.text();
      const resStatus = await response.status;
      console.log(resStatus);
      //console.log(result);
      quote = JSON.parse(result);
    } catch (error) {
      console.error(error);
    }

    //pick previous last and change
    let previousLast = parseFloat(
      $("#last-" + userLogged.stock[i].symbol).text()
    );
    $("#last-" + userLogged.stock[i].symbol).text(
      formatNumber(quote.c.toFixed(2))
    );
    if (previousLast < parseFloat(formatNumber(quote.c.toFixed(2)))) {
      $("#last-" + userLogged.stock[i].symbol).css("background-color", "green");
      setTimeout(() => {
        $("#last-" + userLogged.stock[i].symbol).css(
          "background-color",
          "white"
        );
      }, 500);
    } else if (previousLast > parseFloat(formatNumber(quote.c.toFixed(2)))) {
      $("#last-" + userLogged.stock[i].symbol).css("background-color", "red");
      setTimeout(() => {
        $("#last-" + userLogged.stock[i].symbol).css(
          "background-color",
          "white"
        );
      }, 500);
    } else {
      $("#last-" + userLogged.stock[i].symbol).css(
        "background-color",
        "#d6d6d8"
      );
      setTimeout(() => {
        $("#last-" + userLogged.stock[i].symbol).css(
          "background-color",
          "white"
        );
      }, 500);
    }

    // let last = document.getElementById("last-" + userLogged.stock[i].symbol);
    // last.innerHTML = formatNumber(quote.c.toFixed(2));

    let change = document.getElementById(
      "change-" + userLogged.stock[i].symbol
    );

    change.innerHTML = quote.dp; // .toFixed(2) + "%";
    if (quote.dp > 0) {
      change.style.color = "green";
    } else if (quote.dp < 0) {
      change.style.color = "red";
    }

    let value = document.getElementById("value-" + userLogged.stock[i].symbol);
    value.innerHTML = formatNumber(
      (userLogged.stock[i].qt * quote.c).toFixed(2)
    );

    console.log("lastPrevious");
    console.log(previousLast);
  }
  updateTotal();
}

function updateTotal() {
  let total = 0;

  total += parseFloat(userLogged.cash[0].balance);
  for (let i = 0; i < userLogged.stock.length; i++) {
    let valueElement = document.getElementById(
      "value-" + userLogged.stock[i].symbol
    );
    let valueNumber = parseFloat(valueElement.textContent.replace(",", ""));
    total += valueNumber;
  }

  let totalElement = document.getElementById("data-total");
  totalElement.innerHTML = formatNumber(parseFloat(total).toFixed(2));
}

async function checkSessionWatch() {
  if (checkedSession) {
    return;
  }

  sessionObj = { sessionID: sessionStorage.getItem("session") };
  sessionJSON = JSON.stringify(sessionObj);

  let welcome = document.getElementById("welcome");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
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
    } else if (resStatus == "201") {
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
  // welcome.innerHTML = "Welcome, " + userLogged.name;

  let myRecyclerView = document.getElementById("myRecyclerView");

  for (let i = 0; i < userLogged.watchlist.length; i++) {
    let box = document.createElement("div");
    box.className = "container-portfolio";

    let img = document.createElement("img");
    img.className = "img-stock";
    img.src = "b_investor_logo2.png";
    img.id = "img-" + userLogged.watchlist[i].symbol;

    let stockLeft = document.createElement("div");
    stockLeft.className = "stock-left";

    let stockSymbol = document.createElement("div");
    stockSymbol.className = "symbol";
    stockSymbol.id = "symbol-" + userLogged.watchlist[i].symbol;
    stockSymbol.innerHTML = userLogged.watchlist[i].symbol;

    let symbolDescription = document.createElement("div");
    symbolDescription.className = "description";
    symbolDescription.id = "description-" + userLogged.watchlist[i].symbol;
    symbolDescription.innerHTML = "--";

    stockLeft.appendChild(stockSymbol);
    stockLeft.appendChild(symbolDescription);

    let stockCenter = document.createElement("div");
    stockCenter.className = "stock-center-watch";

    let stockLast = document.createElement("div");
    stockLast.className = "last";
    stockLast.id = "last-" + userLogged.watchlist[i].symbol;
    stockLast.innerHTML = "--";

    let stockChange = document.createElement("div");
    stockChange.className = "change";
    stockChange.id = "change-" + userLogged.watchlist[i].symbol;
    stockChange.innerHTML = "--";

    stockCenter.appendChild(stockLast);
    stockCenter.appendChild(stockChange);

    let stockRight = document.createElement("div");
    stockRight.className = "stock-right-watch";

    let garbage = document.createElement("div");
    garbage.className = "fa fa-trash-o";
    garbage.id = "remove-" + userLogged.watchlist[i].symbol;
    garbage.addEventListener("click", removeElement);
    garbage.style.color = "red";

    stockRight.appendChild(garbage);

    box.appendChild(img);
    box.appendChild(stockLeft);
    box.appendChild(stockCenter);
    box.appendChild(stockRight);
    myRecyclerView.appendChild(box);
  }

  checkedSession = true;

  updateDescriptionWatchlist();
  updateQuoteWatchlist();

  let promise = new Promise((resolve, reject) => {
    let count = 0;
    let intervalID = setInterval(() => {
      count++;
      updateQuoteWatchlist();
      if (count > 100) {
        clearInterval(intervalID);
        resolve();
      }
    }, 3000);
  });
}

async function updateDescriptionWatchlist() {
  for (let i = 0; i < userLogged.watchlist.length; i++) {
    //Company profile2
    try {
      const response = await fetch(
        "https://finnhub.io/api/v1/stock/profile2?symbol=" +
          userLogged.watchlist[i].symbol +
          "&token=" +
          sessionStorage.getItem("apiKey")
      );
      const result = await response.text();
      const resStatus = await response.status;
      console.log(resStatus);
      //console.log(result);
      companyProfile2 = JSON.parse(result);
    } catch (error) {
      console.error(error);
    }

    let imgLogo = document.getElementById(
      "img-" + userLogged.watchlist[i].symbol
    );
    imgLogo.src = companyProfile2.logo;

    let stockDescription = document.getElementById(
      "description-" + userLogged.watchlist[i].symbol
    );
    stockDescription.innerHTML = companyProfile2.name;
  }
}
async function updateQuoteWatchlist() {
  for (let i = 0; i < userLogged.watchlist.length; i++) {
    //Quote
    try {
      const response = await fetch(
        "https://finnhub.io/api/v1/quote?symbol=" +
          userLogged.watchlist[i].symbol +
          "&token=" +
          sessionStorage.getItem("apiKey")
      );
      const result = await response.text();
      const resStatus = await response.status;
      console.log(resStatus);
      //console.log(result);
      quote = JSON.parse(result);
    } catch (error) {
      console.error(error);
    }
    let last = document.getElementById(
      "last-" + userLogged.watchlist[i].symbol
    );
    last.innerHTML = formatNumber(quote.c.toFixed(2));

    let change = document.getElementById(
      "change-" + userLogged.watchlist[i].symbol
    );
    change.innerHTML = formatNumber(quote.dp.toFixed(2)) + "%";
    if (quote.dp > 0) {
      change.style.color = "green";
    } else if (quote.dp < 0) {
      change.style.color = "red";
    }

    let previousLast = parseFloat(
      $("#last-" + userLogged.watchlist[i].symbol).text()
    );
    $("#last-" + userLogged.watchlist[i].symbol).text(
      formatNumber(quote.c.toFixed(2))
    );
    if (previousLast < parseFloat(formatNumber(quote.c.toFixed(2)))) {
      $("#last-" + userLogged.watchlist[i].symbol).css(
        "background-color",
        "green"
      );
      setTimeout(() => {
        $("#last-" + userLogged.watchlist[i].symbol).css(
          "background-color",
          "white"
        );
      }, 500);
    } else if (previousLast > parseFloat(formatNumber(quote.c.toFixed(2)))) {
      $("#last-" + userLogged.watchlist[i].symbol).css(
        "background-color",
        "red"
      );
      setTimeout(() => {
        $("#last-" + userLogged.watchlist[i].symbol).css(
          "background-color",
          "white"
        );
      }, 500);
    } else {
      $("#last-" + userLogged.watchlist[i].symbol).css(
        "background-color",
        "#d6d6d8"
      );
      setTimeout(() => {
        $("#last-" + userLogged.watchlist[i].symbol).css(
          "background-color",
          "white"
        );
      }, 500);
    }
  }
}

async function removeElement() {
  console.log(this.id.split("-")[1]);

  console.log(userLogged.watchlist);
  let itemtoremove = { symbol: this.id.split("-")[1] };

  JSONRemoveStock = JSON.stringify(itemtoremove);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSONRemoveStock,
    redirect: "follow",
  };
  const url = host + "/removefromwatchlist";
  try {
    const response = await fetch(url, requestOptions);
    const result = await response.text();
    const resStatus = await response.status;
    console.log(resStatus);
    //console.log(result);
    if (resStatus == "500") {
      alert("Error to remove to watchlist");
    } else if (resStatus == "201") {
      location.reload();
    }
  } catch (error) {
    console.error(error);
  }

  // console.log(itemtoremove);
  // console.log("Index");

  // console.log(indexToRemove);

  // if (indexToRemove >= 0) {
  //   userLogged.watchlist.splice(indexToRemove, 1);
  // }
  // console.log(userLogged.watchlist);
  // this.parent.parent.parent.removeChild(this.parent.parent);
}

async function checkSessionTransaction() {
  try {
    const response = await fetch(
      "https://finnhub.io/api/v1/stock/profile2?symbol=" +
        sessionStorage.getItem("lastStock") +
        "&token=" +
        sessionStorage.getItem("apiKey")
    );
    const result = await response.text();
    const resStatus = await response.status;
    console.log(resStatus);
    //console.log(result);
    companyProfile2 = JSON.parse(result);
  } catch (error) {
    console.error(error);
  }

  // let imgLogo = document.getElementById("img-" + userLogged.stock[i].symbol);
  $("#transaction-img").attr("src", companyProfile2.logo);
  $("#symbol").text(sessionStorage.getItem("lastStock"));
  $("#description").text(companyProfile2.name);

  //Quote
  try {
    const response = await fetch(
      "https://finnhub.io/api/v1/quote?symbol=" +
        sessionStorage.getItem("lastStock") +
        "&token=" +
        sessionStorage.getItem("apiKey")
    );
    const result = await response.text();
    const resStatus = await response.status;
    console.log(resStatus);
    //console.log(result);
    quote = JSON.parse(result);
  } catch (error) {
    console.error(error);
  }

  $("#c").text(formatNumber("Last: " + quote.c.toFixed(2)));
  $("#d").text(formatNumber("Change: " + quote.d.toFixed(2)));
  $("#dp").text(formatNumber("Percent Change: " + quote.dp.toFixed(2)));
  $("#h").text(formatNumber("High: " + quote.h.toFixed(2)));
  $("#l").text(formatNumber("Low: " + quote.l.toFixed(2)));
  $("#o").text(formatNumber("Open: " + quote.o.toFixed(2)));
  $("#pc").text(formatNumber("Previous Close: " + quote.pc.toFixed(2)));
}
//   //pick previous last and change
//   let previousLast = parseFloat(
//     $("#last-" + userLogged.stock[i].symbol).text()
//   );
//   $("#last-" + userLogged.stock[i].symbol).text(
//     formatNumber(quote.c.toFixed(2))
//   );
//   if (previousLast < parseFloat(formatNumber(quote.c.toFixed(2)))) {
//     $("#last-" + userLogged.stock[i].symbol).css("background-color", "green");
//     setTimeout(() => {
//       $("#last-" + userLogged.stock[i].symbol).css(
//         "background-color",
//         "white"
//       );
//     }, 500);
//   } else if (previousLast > parseFloat(formatNumber(quote.c.toFixed(2)))) {
//     $("#last-" + userLogged.stock[i].symbol).css("background-color", "red");
//     setTimeout(() => {
//       $("#last-" + userLogged.stock[i].symbol).css(
//         "background-color",
//         "white"
//       );
//     }, 500);
//   } else {
//     $("#last-" + userLogged.stock[i].symbol).css(
//       "background-color",
//       "#d6d6d8"
//     );
//     setTimeout(() => {
//       $("#last-" + userLogged.stock[i].symbol).css(
//         "background-color",
//         "white"
//       );
//     }, 500);
//   }

//   // let last = document.getElementById("last-" + userLogged.stock[i].symbol);
//   // last.innerHTML = formatNumber(quote.c.toFixed(2));

//   let change = document.getElementById(
//     "change-" + userLogged.stock[i].symbol
//   );

//     change.innerHTML = quote.dp // .toFixed(2) + "%";
//   if (quote.dp > 0) {
//     change.style.color = "green";
//   } else if (quote.dp < 0) {
//     change.style.color = "red";
//   }

//   let value = document.getElementById("value-" + userLogged.stock[i].symbol);
//   value.innerHTML = formatNumber(
//     (userLogged.stock[i].qt * quote.c).toFixed(2)
//   );

// }

function loadProfile() {
  const promise = new Promise((resolve, reject) => {
    var result = checkSessionUserLogged();
    resolve(result);
  });

  promise.then((res) => {
    console.log(res);
    $("#in-username").val(res.email);
    $("#in-name").val(res.name);
    $("#in-username").val(res.email);
    $("#in-username").val(res.email);
  });
}

function changePassword() {
  alert("to do");
}
function buttonClicked(element) {
  console.log(element);
  console.log(element.innerText);

  switch (element.innerText) {
    case "Sign In":
      login();
      return;
    case "Logout":
      logout();
      return;
    case "Deposit":
      deposit();
      return;
    case "Withdraw":
      withdraw();
      return;
    case "Chage Password":
      changePassword();
      return;
    default:
      break;
  }

  alert("to do" + element.innerText);
}

// function deposit() {
//   if (isValidDepositWithdraw(depositWithdraw.value)) {
//     let previousBalance = parseFloat(userLogged.cash[0].balance);
//     userLogged.cash[0].balance = formatNumber(previousBalance + parseFloat(depositWithdraw.value.replace(",","")).toFixed(2));

//     alert("Previous balance: " + formatNumber(previousBalance.toFixed(2)) + "\n" +
//       "Deposited Value: " + depositWithdraw.value + "\n" +
//       "New balance: " + userLogged.cash[0].balance
//     )
//   }

// }

function formatNumber(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function goPortfolio() {
  window.location.href = "/portfolio.html";
}
function goWatchlist() {
  window.location.href = "/watchlist.html";
}

function goTransactionWith(box) {
  console.log("box");
  console.log(box);

  sessionStorage.setItem("lastStock", box);
  goTransaction();
}

function goTransaction() {
  window.location.href = "/transaction.html";
}
function goProfile() {
  window.location.href = "/profile.html";
}
function goSignup() {
  window.location.href = "/signup.html";
}

function goSignin() {
  window.location.href = "/index.html";
}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].toUpperCase().includes(val.toUpperCase())) {
        //if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          //inp.value = this.getElementsByTagName("input")[0].value;
          let newStockToAdd = {
            symbol: this.getElementsByTagName("input")[0].value.split(" ")[0],
          };
          addWatchlist(newStockToAdd);

          /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

async function addWatchlist(newStockToAdd) {
  //check if this stock is already in the watchlist
  var isAlreadyListed = false;
  userLogged.watchlist.forEach((stock) => {
    if (newStockToAdd.symbol == stock.symbol) {
      isAlreadyListed = true;
    }
  });

  if (isAlreadyListed) {
    alert("This stock is already listed");
    return;
  }

  JSONAddNewStock = JSON.stringify(newStockToAdd);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSONAddNewStock,
    redirect: "follow",
  };
  const url = host + "/addtowatchlist";
  try {
    const response = await fetch(url, requestOptions);
    const result = await response.text();
    const resStatus = await response.status;
    console.log(resStatus);
    //console.log(result);
    if (resStatus == "500") {
      alert("Error to add to watchlist");
    } else if (resStatus == "201") {
      location.reload();
    }
  } catch (error) {
    console.error(error);
  }
}

async function deposit() {
  valueToDeposit = parseFloat($("#in-deposit-withdraw").val().replace(",", ""));

  ObjDepositRequest = {
    session: sessionStorage.getItem("session"),
    depositValue: valueToDeposit,
    id: userLogged.id,
  };
  JSONDepositRequest = JSON.stringify(ObjDepositRequest);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSONDepositRequest,
    redirect: "follow",
  };
  const url = host + "/deposit";
  try {
    const response = await fetch(url, requestOptions);
    const result = await response.text();
    const resStatus = await response.status;
    console.log(resStatus);
    console.log(result);
    if (resStatus == "500") {
      alert("Error to deposit. Try later or contact support");
    } else if (resStatus == "201" || resStatus == "200") {
      alert(result);
      location.reload();
    }
  } catch (error) {
    console.error(error);
  }
}

async function withdraw() {
  valueToWithdraw = parseFloat(
    $("#in-deposit-withdraw").val().replace(",", "")
  );

  ObjWithdrawRequest = {
    session: sessionStorage.getItem("session"),
    withdrawValue: valueToWithdraw,
    id: userLogged.id,
  };
  JSONWithdrawRequest = JSON.stringify(ObjWithdrawRequest);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSONWithdrawRequest,
    redirect: "follow",
  };
  const url = host + "/withdraw";
  try {
    const response = await fetch(url, requestOptions);
    const result = await response.text();
    const resStatus = await response.status;
    console.log(resStatus);
    console.log(result);
    if (resStatus == "500") {
      alert(result);
    } else if (resStatus == "201" || resStatus == "200") {
      alert(result);
      location.reload();
    }
  } catch (error) {
    console.error(error);
  }
} 

var stockSymbols = [
  "A AGILENT TECHNOLOGIES INC",
  "AAL AMERICAN AIRLINES GROUP INC",
  "AAPL APPLE INC",
  "ABBV ABBVIE INC",
  "ABEV AMBEV SA-ADR",
  "ABNB AIRBNB INC-CLASS A",
  "ABT ABBOTT LABORATORIES",
  "ACGL ARCH CAPITAL GROUP LTD",
  "ACN ACCENTURE PLC-CL A",
  "ADBE ADOBE INC",
  "ADI ANALOG DEVICES INC",
  "ADM ARCHER-DANIELS-MIDLAND CO",
  "ADP AUTOMATIC DATA PROCESSING",
  "ADSK AUTODESK INC",
  "AEE AMEREN CORPORATION",
  "AEP AMERICAN ELECTRIC POWER",
  "AES AES CORP",
  "AFL AFLAC INC",
  "AIG AMERICAN INTERNATIONAL GROUP",
  "AIZ ASSURANT INC",
  "AJG ARTHUR J GALLAGHER & CO",
  "AKAM AKAMAI TECHNOLOGIES INC",
  "ALB ALBEMARLE CORP",
  "ALGN ALIGN TECHNOLOGY INC",
  "ALL ALLSTATE CORP",
  "ALLE ALLEGION PLC",
  "AMAT APPLIED MATERIALS INC",
  "AMCR AMCOR PLC",
  "AMD ADVANCED MICRO DEVICES",
  "AME AMETEK INC",
  "AMGN AMGEN INC",
  "AMP AMERIPRISE FINANCIAL INC",
  "AMT AMERICAN TOWER CORP",
  "AMZN AMAZON.COM INC",
  "ANET ARISTA NETWORKS INC",
  "ANSS ANSYS INC",
  "AON AON PLC-CLASS A",
  "AOS SMITH (A.O.) CORP",
  "APA APA CORP",
  "APD AIR PRODUCTS & CHEMICALS INC",
  "APH AMPHENOL CORP-CL A",
  "APTV APTIV PLC",
  "ARE ALEXANDRIA REAL ESTATE EQUIT",
  "ATO ATMOS ENERGY CORP",
  "AVB AVALONBAY COMMUNITIES INC",
  "AVGO BROADCOM INC",
  "AVY AVERY DENNISON CORP",
  "AWK AMERICAN WATER WORKS CO INC",
  "AXON AXON ENTERPRISE INC",
  "AXP AMERICAN EXPRESS CO",
  "AZO AUTOZONE INC",
  "BA BOEING CO/THE",
  "BAC BANK OF AMERICA CORP",
  "BALL BALL CORP",
  "BAX BAXTER INTERNATIONAL INC",
  "BBWI BATH & BODY WORKS INC",
  "BBY BEST BUY CO INC",
  "BDORY BANCO DO BRASIL SA-SPON ADR",
  "BDX BECTON DICKINSON AND CO",
  "BEN FRANKLIN RESOURCES INC",
  "BF.B BROWN-FORMAN CORP-CLASS B",
  "BG BUNGE GLOBAL SA",
  "BIIB BIOGEN INC",
  "BIO BIO-RAD LABORATORIES-A",
  "BK BANK OF NEW YORK MELLON CORP",
  "BKNG BOOKING HOLDINGS INC",
  "BKR BAKER HUGHES CO",
  "BLDR BUILDERS FIRSTSOURCE INC",
  "BLK BLACKROCK INC",
  "BMY BRISTOL-MYERS SQUIBB CO",
  "BR BROADRIDGE FINANCIAL SOLUTIO",
  "BRK.B BERKSHIRE HATHAWAY INC-CL B",
  "BRO BROWN & BROWN INC",
  "BSX BOSTON SCIENTIFIC CORP",
  "BTC-USD BITCOIN USD",
  "BWA BORGWARNER INC",
  "BX BLACKSTONE INC",
  "BXP BOSTON PROPERTIES INC",
  "C CITIGROUP INC",
  "CAG CONAGRA BRANDS INC",
  "CAH CARDINAL HEALTH INC",
  "CARR CARRIER GLOBAL CORP",
  "CAT CATERPILLAR INC",
  "CB CHUBB LTD",
  "CBOE CBOE GLOBAL MARKETS INC",
  "CBRE CBRE GROUP INC - A",
  "CCI CROWN CASTLE INC",
  "CCL CARNIVAL CORP",
  "CDNS CADENCE DESIGN SYS INC",
  "CDW CDW CORP/DE",
  "CE CELANESE CORP",
  "CEG CONSTELLATION ENERGY",
  "CF CF INDUSTRIES HOLDINGS INC",
  "CFG CITIZENS FINANCIAL GROUP",
  "CHD CHURCH & DWIGHT CO INC",
  "CHRW C.H. ROBINSON WORLDWIDE INC",
  "CHTR CHARTER COMMUNICATIONS INC-A",
  "CI THE CIGNA GROUP",
  "CINF CINCINNATI FINANCIAL CORP",
  "CL COLGATE-PALMOLIVE CO",
  "CLX CLOROX COMPANY",
  "CMA COMERICA INC",
  "CMCSA COMCAST CORP-CLASS A",
  "CME CME GROUP INC",
  "CMG CHIPOTLE MEXICAN GRILL INC",
  "CMI CUMMINS INC",
  "CMS CMS ENERGY CORP",
  "CNC CENTENE CORP",
  "CNP CENTERPOINT ENERGY INC",
  "COF CAPITAL ONE FINANCIAL CORP",
  "COO COOPER COS INC/THE",
  "COP CONOCOPHILLIPS",
  "COR CENCORA INC",
  "COST COSTCO WHOLESALE CORP",
  "CPB CAMPBELL SOUP CO",
  "CPRT COPART INC",
  "CPT CAMDEN PROPERTY TRUST",
  "CRL CHARLES RIVER LABORATORIES",
  "CRM SALESFORCE INC",
  "CSCO CISCO SYSTEMS INC",
  "CSGP COSTAR GROUP INC",
  "CSX CSX CORP",
  "CTAS CINTAS CORP",
  "CTLT CATALENT INC",
  "CTRA COTERRA ENERGY INC",
  "CTSH COGNIZANT TECH SOLUTIONS-A",
  "CTVA CORTEVA INC",
  "CVS CVS HEALTH CORP",
  "CVX CHEVRON CORP",
  "CZR CAESARS ENTERTAINMENT INC",
  "D DOMINION ENERGY INC",
  "DAL DELTA AIR LINES INC",
  "DAY DAYFORCE INC",
  "DD DUPONT DE NEMOURS INC",
  "DE DEERE & CO",
  "DFS DISCOVER FINANCIAL SERVICES",
  "DG DOLLAR GENERAL CORP",
  "DGX QUEST DIAGNOSTICS INC",
  "DHI DR HORTON INC",
  "DHR DANAHER CORP",
  "DIS WALT DISNEY CO/THE",
  "DLR DIGITAL REALTY TRUST INC",
  "DLTR DOLLAR TREE INC",
  "DOV DOVER CORP",
  "DOW DOW INC",
  "DPZ DOMINO'S PIZZA INC",
  "DRI DARDEN RESTAURANTS INC",
  "DTE DTE ENERGY COMPANY",
  "DUK DUKE ENERGY CORP",
  "DVA DAVITA INC",
  "DVN DEVON ENERGY CORP",
  "DXCM DEXCOM INC",
  "EA ELECTRONIC ARTS INC",
  "EBAY EBAY INC",
  "ECL ECOLAB INC",
  "ED CONSOLIDATED EDISON INC",
  "EFX EQUIFAX INC",
  "EG EVEREST GROUP LTD",
  "EIX EDISON INTERNATIONAL",
  "EL ESTEE LAUDER COMPANIES-CL A",
  "ELV ELEVANCE HEALTH INC",
  "EMN EASTMAN CHEMICAL CO",
  "EMR EMERSON ELECTRIC CO",
  "ENPH ENPHASE ENERGY INC",
  "EOG EOG RESOURCES INC",
  "EPAM EPAM SYSTEMS INC",
  "EQIX EQUINIX INC",
  "EQR EQUITY RESIDENTIAL",
  "EQT EQT CORP",
  "ES EVERSOURCE ENERGY",
  "ESS ESSEX PROPERTY TRUST INC",
  "ETN EATON CORP PLC",
  "ETR ENTERGY CORP",
  "ETSY ETSY INC",
  "EVRG EVERGY INC",
  "EW EDWARDS LIFESCIENCES CORP",
  "EXC EXELON CORP",
  "EXPD EXPEDITORS INTL WASH INC",
  "EXPE EXPEDIA GROUP INC",
  "EXR EXTRA SPACE STORAGE INC",
  "F FORD MOTOR CO",
  "FANG DIAMONDBACK ENERGY INC",
  "FAST FASTENAL CO",
  "FCX FREEPORT-MCMORAN INC",
  "FDS FACTSET RESEARCH SYSTEMS INC",
  "FDX FEDEX CORP",
  "FE FIRSTENERGY CORP",
  "FFIV F5 INC",
  "FI FISERV INC",
  "FICO FAIR ISAAC CORP",
  "FIS FIDELITY NATIONAL INFO SERV",
  "FITB FIFTH THIRD BANCORP",
  "FMC FMC CORP",
  "FOX FOX CORP - CLASS B",
  "FOXA FOX CORP - CLASS A",
  "FRT FEDERAL REALTY INVS TRUST",
  "FSLR FIRST SOLAR INC",
  "FTNT FORTINET INC",
  "FTV FORTIVE CORP",
  "GD GENERAL DYNAMICS CORP",
  "GE GENERAL ELECTRIC CO",
  "GEHC GE HEALTHCARE TECHNOLOGY",
  "GEN GEN DIGITAL INC",
  "GILD GILEAD SCIENCES INC",
  "GIS GENERAL MILLS INC",
  "GL GLOBE LIFE INC",
  "GLW CORNING INC",
  "GM GENERAL MOTORS CO",
  "GNRC GENERAC HOLDINGS INC",
  "GOOG ALPHABET INC-CL C",
  "GOOGL ALPHABET INC-CL A",
  "GPC GENUINE PARTS CO",
  "GPN GLOBAL PAYMENTS INC",
  "GRMN GARMIN LTD",
  "GS GOLDMAN SACHS GROUP INC",
  "GWW WW GRAINGER INC",
  "HAL HALLIBURTON CO",
  "HAS HASBRO INC",
  "HBAN HUNTINGTON BANCSHARES INC",
  "HCA HCA HEALTHCARE INC",
  "HD HOME DEPOT INC",
  "HES HESS CORP",
  "HIG HARTFORD FINANCIAL SVCS GRP",
  "HII HUNTINGTON INGALLS INDUSTRIE",
  "HLT HILTON WORLDWIDE HOLDINGS IN",
  "HOLX HOLOGIC INC",
  "HON HONEYWELL INTERNATIONAL INC",
  "HPE HEWLETT PACKARD ENTERPRISE",
  "HPQ HP INC",
  "HRL HORMEL FOODS CORP",
  "HSIC HENRY SCHEIN INC",
  "HST HOST HOTELS & RESORTS INC",
  "HSY HERSHEY CO/THE",
  "HUBB HUBBELL INC",
  "HUM HUMANA INC",
  "HWM HOWMET AEROSPACE INC",
  "IBM INTL BUSINESS MACHINES CORP",
  "ICE INTERCONTINENTAL EXCHANGE IN",
  "IDXX IDEXX LABORATORIES INC",
  "IEX IDEX CORP",
  "IFF INTL FLAVORS & FRAGRANCES",
  "ILMN ILLUMINA INC",
  "INCY INCYTE CORP",
  "INTC INTEL CORP",
  "INTU INTUIT INC",
  "INVH INVITATION HOMES INC",
  "IP INTERNATIONAL PAPER CO",
  "IPG INTERPUBLIC GROUP OF COS INC",
  "IQV IQVIA HOLDINGS INC",
  "IR INGERSOLL-RAND INC",
  "IRM IRON MOUNTAIN INC",
  "ISRG INTUITIVE SURGICAL INC",
  "IT GARTNER INC",
  "ITUB ITAU UNIBANCO H-SPON PRF ADR",
  "ITW ILLINOIS TOOL WORKS",
  "IVZ INVESCO LTD",
  "J JACOBS SOLUTIONS INC",
  "JBHT HUNT (JB) TRANSPRT SVCS INC",
  "JBL JABIL INC",
  "JCI JOHNSON CONTROLS INTERNATION",
  "JKHY JACK HENRY & ASSOCIATES INC",
  "JNJ JOHNSON & JOHNSON",
  "JNPR JUNIPER NETWORKS INC",
  "JPM JPMORGAN CHASE & CO",
  "K KELLANOVA",
  "KDP KEURIG DR PEPPER INC",
  "KEY KEYCORP",
  "KEYS KEYSIGHT TECHNOLOGIES IN",
  "KHC KRAFT HEINZ CO/THE",
  "KIM KIMCO REALTY CORP",
  "KLAC KLA CORP",
  "KMB KIMBERLY-CLARK CORP",
  "KMI KINDER MORGAN INC",
  "KMX CARMAX INC",
  "KO COCA-COLA CO/THE",
  "KR KROGER CO",
  "KVUE KENVUE INC",
  "L LOEWS CORP",
  "LDOS LEIDOS HOLDINGS INC",
  "LEN LENNAR CORP-A",
  "LH LABORATORY CRP OF AMER HLDGS",
  "LHX L3HARRIS TECHNOLOGIES INC",
  "LIN LINDE PLC",
  "LKQ LKQ CORP",
  "LLY ELI LILLY & CO",
  "LMT LOCKHEED MARTIN CORP",
  "LNT ALLIANT ENERGY CORP",
  "LOW LOWE'S COS INC",
  "LRCX LAM RESEARCH CORP",
  "LULU LULULEMON ATHLETICA INC",
  "LUV SOUTHWEST AIRLINES CO",
  "LVS LAS VEGAS SANDS CORP",
  "LW LAMB WESTON HOLDINGS INC",
  "LYB LYONDELLBASELL INDU-CL A",
  "LYV LIVE NATION ENTERTAINMENT IN",
  "MA MASTERCARD INC - A",
  "MAA MID-AMERICA APARTMENT COMM",
  "MAR MARRIOTT INTERNATIONAL -CL A",
  "MAS MASCO CORP",
  "MCD MCDONALD'S CORP",
  "MCHP MICROCHIP TECHNOLOGY INC",
  "MCK MCKESSON CORP",
  "MCO MOODY'S CORP",
  "MDLZ MONDELEZ INTERNATIONAL INC-A",
  "MDT MEDTRONIC PLC",
  "MET METLIFE INC",
  "META META PLATFORMS INC-CLASS A",
  "MGM MGM RESORTS INTERNATIONAL",
  "MHK MOHAWK INDUSTRIES INC",
  "MKC MCCORMICK & CO-NON VTG SHRS",
  "MKTX MARKETAXESS HOLDINGS INC",
  "MLM MARTIN MARIETTA MATERIALS",
  "MMC MARSH & MCLENNAN COS",
  "MMM 3M CO",
  "MNST MONSTER BEVERAGE CORP",
  "MO ALTRIA GROUP INC",
  "MOH MOLINA HEALTHCARE INC",
  "MOS MOSAIC CO/THE",
  "MPC MARATHON PETROLEUM CORP",
  "MPWR MONOLITHIC POWER SYSTEMS INC",
  "MRK MERCK & CO. INC.",
  "MRNA MODERNA INC",
  "MRO MARATHON OIL CORP",
  "MS MORGAN STANLEY",
  "MSCI MSCI INC",
  "MSFT MICROSOFT CORP",
  "MSI MOTOROLA SOLUTIONS INC",
  "MTB M & T BANK CORP",
  "MTCH MATCH GROUP INC",
  "MTD METTLER-TOLEDO INTERNATIONAL",
  "MU MICRON TECHNOLOGY INC",
  "NCLH NORWEGIAN CRUISE LINE HOLDIN",
  "NDAQ NASDAQ INC",
  "NDSN NORDSON CORP",
  "NEE NEXTERA ENERGY INC",
  "NEM NEWMONT CORP",
  "NFLX NETFLIX INC",
  "NI NISOURCE INC",
  "NKE NIKE INC -CL B",
  "NOC NORTHROP GRUMMAN CORP",
  "NOW SERVICENOW INC",
  "NRG NRG ENERGY INC",
  "NSC NORFOLK SOUTHERN CORP",
  "NTAP NETAPP INC",
  "NTRS NORTHERN TRUST CORP",
  "NUE NUCOR CORP",
  "NVDA NVIDIA CORP",
  "NVR NVR INC",
  "NWS NEWS CORP - CLASS B",
  "NWSA NEWS CORP - CLASS A",
  "NXPI NXP SEMICONDUCTORS NV",
  "O REALTY INCOME CORP",
  "ODFL OLD DOMINION FREIGHT LINE",
  "OKE ONEOK INC",
  "OMC OMNICOM GROUP",
  "ON ON SEMICONDUCTOR",
  "ORCL ORACLE CORP",
  "ORLY O'REILLY AUTOMOTIVE INC",
  "OTIS OTIS WORLDWIDE CORP",
  "OXY OCCIDENTAL PETROLEUM CORP",
  "PANW PALO ALTO NETWORKS INC",
  "PARA PARAMOUNT GLOBAL-CLASS B",
  "PAYC PAYCOM SOFTWARE INC",
  "PAYX PAYCHEX INC",
  "PBR PETROLEO BRASILEIRO-SPON ADR",
  "PCAR PACCAR INC",
  "PCG P G & E CORP",
  "PEG PUBLIC SERVICE ENTERPRISE GP",
  "PEP PEPSICO INC",
  "PFE PFIZER INC",
  "PFG PRINCIPAL FINANCIAL GROUP",
  "PG PROCTER & GAMBLE CO/THE",
  "PGR PROGRESSIVE CORP",
  "PH PARKER HANNIFIN CORP",
  "PHM PULTEGROUP INC",
  "PKG PACKAGING CORP OF AMERICA",
  "PLD PROLOGIS INC",
  "PM PHILIP MORRIS INTERNATIONAL",
  "PNC PNC FINANCIAL SERVICES GROUP",
  "PNR PENTAIR PLC",
  "PNW PINNACLE WEST CAPITAL",
  "PODD INSULET CORP",
  "POOL POOL CORP",
  "PPG PPG INDUSTRIES INC",
  "PPL PPL CORP",
  "PRU PRUDENTIAL FINANCIAL INC",
  "PSA PUBLIC STORAGE",
  "PSX PHILLIPS 66",
  "PTC PTC INC",
  "PWR QUANTA SERVICES INC",
  "PXD PIONEER NATURAL RESOURCES CO",
  "PYPL PAYPAL HOLDINGS INC",
  "QCOM QUALCOMM INC",
  "QRVO QORVO INC",
  "RCL ROYAL CARIBBEAN CRUISES LTD",
  "REG REGENCY CENTERS CORP",
  "REGN REGENERON PHARMACEUTICALS",
  "RF REGIONS FINANCIAL CORP",
  "RHI ROBERT HALF INC",
  "RJF RAYMOND JAMES FINANCIAL INC",
  "RL RALPH LAUREN CORP",
  "RMD RESMED INC",
  "ROK ROCKWELL AUTOMATION INC",
  "ROL ROLLINS INC",
  "ROP ROPER TECHNOLOGIES INC",
  "ROST ROSS STORES INC",
  "RSG REPUBLIC SERVICES INC",
  "RTX RTX CORP",
  "RVTY REVVITY INC",
  "SBAC SBA COMMUNICATIONS CORP",
  "SBUX STARBUCKS CORP",
  "SCHW SCHWAB (CHARLES) CORP",
  "SHW SHERWIN-WILLIAMS CO/THE",
  "SJM JM SMUCKER CO/THE",
  "SLB SCHLUMBERGER LTD",
  "SNA SNAP-ON INC",
  "SNPS SYNOPSYS INC",
  "SO SOUTHERN CO/THE",
  "SPG SIMON PROPERTY GROUP INC",
  "SPGI S&P GLOBAL INC",
  "SRE SEMPRA",
  "STE STERIS PLC",
  "STLD STEEL DYNAMICS INC",
  "STNE STONECO LTD-A",
  "STT STATE STREET CORP",
  "STX SEAGATE TECHNOLOGY HOLDINGS",
  "STZ CONSTELLATION BRANDS INC-A",
  "SWK STANLEY BLACK & DECKER INC",
  "SWKS SKYWORKS SOLUTIONS INC",
  "SYF SYNCHRONY FINANCIAL",
  "SYK STRYKER CORP",
  "SYY SYSCO CORP",
  "T AT&T INC",
  "TAP MOLSON COORS BEVERAGE CO - B",
  "TDG TRANSDIGM GROUP INC",
  "TDY TELEDYNE TECHNOLOGIES INC",
  "TECH BIO-TECHNE CORP",
  "TEL TE CONNECTIVITY LTD",
  "TER TERADYNE INC",
  "TFC TRUIST FINANCIAL CORP",
  "TFX TELEFLEX INC",
  "TGT TARGET CORP",
  "TJX TJX COMPANIES INC",
  "TMO THERMO FISHER SCIENTIFIC INC",
  "TMUS T-MOBILE US INC",
  "TPR TAPESTRY INC",
  "TRGP TARGA RESOURCES CORP",
  "TRMB TRIMBLE INC",
  "TROW T ROWE PRICE GROUP INC",
  "TRV TRAVELERS COS INC/THE",
  "TSCO TRACTOR SUPPLY COMPANY",
  "TSLA TESLA INC",
  "TSN TYSON FOODS INC-CL A",
  "TT TRANE TECHNOLOGIES PLC",
  "TTWO TAKE-TWO INTERACTIVE SOFTWRE",
  "TXN TEXAS INSTRUMENTS INC",
  "TXT TEXTRON INC",
  "TYL TYLER TECHNOLOGIES INC",
  "UAL UNITED AIRLINES HOLDINGS INC",
  "UBER UBER TECHNOLOGIES INC",
  "UDR UDR INC",
  "UHS UNIVERSAL HEALTH SERVICES-B",
  "ULTA ULTA BEAUTY INC",
  "UNH UNITEDHEALTH GROUP INC",
  "UNP UNION PACIFIC CORP",
  "UPS UNITED PARCEL SERVICE-CL B",
  "URI UNITED RENTALS INC",
  "USB US BANCORP",
  "V VISA INC-CLASS A SHARES",
  "VALE VALE SA-SP ADR",
  "VFC VF CORP",
  "VICI VICI PROPERTIES INC",
  "VLO VALERO ENERGY CORP",
  "VLTO VERALTO CORP",
  "VMC VULCAN MATERIALS CO",
  "VRSK VERISK ANALYTICS INC",
  "VRSN VERISIGN INC",
  "VRTX VERTEX PHARMACEUTICALS INC",
  "VTR VENTAS INC",
  "VTRS VIATRIS INC",
  "VZ VERIZON COMMUNICATIONS INC",
  "WAB WABTEC CORP",
  "WAT WATERS CORP",
  "WBA WALGREENS BOOTS ALLIANCE INC",
  "WBD WARNER BROS DISCOVERY INC",
  "WDC WESTERN DIGITAL CORP",
  "WEC WEC ENERGY GROUP INC",
  "WELL WELLTOWER INC",
  "WFC WELLS FARGO & CO",
  "WHR WHIRLPOOL CORP",
  "WM WASTE MANAGEMENT INC",
  "WMB WILLIAMS COS INC",
  "WMT WALMART INC",
  "WRB WR BERKLEY CORP",
  "WRK WESTROCK CO",
  "WST WEST PHARMACEUTICAL SERVICES",
  "WTW WILLIS TOWERS WATSON PLC",
  "WY WEYERHAEUSER CO",
  "WYNN WYNN RESORTS LTD",
  "XEL XCEL ENERGY INC",
  "XOM EXXON MOBIL CORP",
  "XRAY DENTSPLY SIRONA INC",
  "XYL XYLEM INC",
  "YUM YUM! BRANDS INC",
  "ZBH ZIMMER BIOMET HOLDINGS INC",
  "ZBRA ZEBRA TECHNOLOGIES CORP-CL A",
  "ZION ZIONS BANCORP NA",
  "ZTS ZOETIS INC",
];

autocomplete(document.getElementById("inputStock"), stockSymbols);

let inputStock = document.getElementById("inputStock");
inputStock.addEventListener("keyup", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    // return;
  }
  if (event.key === "Enter" || event.keyCode === 13) {
    let newStockToAdd = {
      symbol: this.document
        .getElementById("inputStock")
        .value.split(" ")[0]
        .toUpperCase(),
    };
    addWatchlist(newStockToAdd);

    /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
    closeAllLists();
  }
});
