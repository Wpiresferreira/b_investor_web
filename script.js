let userLogged = null;
let checkedSession = false;

let api_key = "cmo6he1r01qj3mal97u0cmo6he1r01qj3mal97ug";

async function login() {
  console.log("testing");
  let username = document.getElementById("input_email");
  let password = document.getElementById("input_password");

  try {
    const response = await fetch("https://api.ipify.org/?format=json");
    const result = await response.text();
    const resStatus = await response.status;
    console.log(resStatus);
    console.log(result);
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
  const url = "http://localhost:3000/login";
  try {
    const response = await fetch(url, requestOptions);
    const result = await response.text();
    const resStatus = await response.status;
    if (resStatus == "500") {
    } else if (resStatus == "201") {
      resultObj = JSON.parse(result);
      userLogged = resultObj;
      console.log("userLogged = ");
      console.log(userLogged);
      console.log(userLogged.name);
      window.location.href = "/portfolio.html";
      //updateLogin()
      //listProperties('all')
    }
  } catch (error) {
    console.error(error);
  }
}

async function checkSession() {
  if (checkedSession) {
    return;
  }

  let welcome = document.getElementById("welcome");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: null,
    redirect: "follow",
  };
  const url = "http://localhost:3000/getUser";
  try {
    const response = await fetch(url, requestOptions);
    const result = await response.text();
    const resStatus = await response.status;
    if (resStatus == "500") {
    } else if (resStatus == "201") {
      resultObj = JSON.parse(result);
      userLogged = resultObj;
      console.log("userLogged = ");
      console.log(userLogged);
      console.log(userLogged.name);
    }
  } catch (error) {
    console.error(error);
  }

  if (userLogged == null) {
    alert("Invalid Session");
    window.location.href = "/index.html";
  }
  welcome.innerHTML = "Welcome, " + userLogged.name;

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
    cashRight.innerHTML = formatNumber(userLogged.cash[i].balance.toFixed(2));

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
    myRecyclerView.appendChild(box);
  }

  checkedSession = true;

  updateDescription();
  updateQuote();
}

async function updateDescription() {
  for (let i = 0; i < userLogged.stock.length; i++) {
    //Company profile2
    try {
      const response = await fetch(
        "https://finnhub.io/api/v1/stock/profile2?symbol=" +
          userLogged.stock[i].symbol +
          "&token=" +
          api_key
      );
      const result = await response.text();
      const resStatus = await response.status;
      console.log(resStatus);
      console.log(result);
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
  for (let i = 0; i < userLogged.stock.length; i++) {
    //Quote
    try {
      const response = await fetch(
        "https://finnhub.io/api/v1/quote?symbol=" +
          userLogged.stock[i].symbol +
          "&token=" +
          api_key
      );
      const result = await response.text();
      const resStatus = await response.status;
      console.log(resStatus);
      console.log(result);
      quote = JSON.parse(result);
    } catch (error) {
      console.error(error);
    }

    let last = document.getElementById("last-" + userLogged.stock[i].symbol);
    last.innerHTML = quote.c;

    let change = document.getElementById(
      "change-" + userLogged.stock[i].symbol
    );
    change.innerHTML = quote.dp.toFixed(2);
    if (quote.dp > 0) {
      change.style.color = "green";
    } else if (quote.dp < 0) {
        change.style.color = "red";
    }

    let value = document.getElementById(
        "value-" + userLogged.stock[i].symbol
      );
      value.innerHTML = formatNumber(userLogged.stock[i].qt*quote.c);

  }
  updateTotal();
}

function updateTotal(){
let total = 0;

total += userLogged.cash[0].balance;
    for (let i = 0; i < userLogged.stock.length; i++) {
        let valueElement = document.getElementById("value-"+ userLogged.stock[i].symbol);
        let valueNumber = parseFloat(valueElement.textContent.replace(",",""));
        total += valueNumber;
    }

let totalElement = document.getElementById("data-total");
totalElement.innerHTML = formatNumber(total);
}

function formatNumber(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
