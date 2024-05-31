let stockQuote;
//let userLogged = null;
const sessions = [];

function generateSessionID() {
  let sessionID = "";
  for (let i = 0; i < 12; i++) {
    let c = Math.floor(Math.random() * 62);
    if (c < 10) {
      c += 48;
    } else if (c < 36) {
      c += 55;
    } else {
      c += 61;
    }
    sessionID += String.fromCharCode(c);
  }
  //console.log("sessionID : " + sessionID);
  return sessionID;
}

// const finnhub = require('finnhub');

// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = "cmo6he1r01qj3mal97u0cmo6he1r01qj3mal97ug"
//const finnhubClient = new finnhub.DefaultApi()

// finnhubClient.quote("AAPL", (error, data, response) => {
//   //console.log("Current : " + data.c)
// });

// //Company profile2
// finnhubClient.companyProfile2({'symbol': 'AAPL'}, (error, data, response) => {
//     //console.log(data)
//     //console.log("Name : " + data.name)
// });

const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const { error, log, Console } = require("console");

const app = express();

app.use(express.static(path.join(__dirname, "/")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.post("/getquote", (req, res) => {
  try {
    id = req.body;
    const listUsers = JSON.parse(fs.readFileSync("users.json"));
    let filteredUsers = listUsers.filter((user) => {
      return user.id == id.id;
    });

    if (filteredUsers[0] === undefined) {
      throw new Error("Invalid owner");
    }

    delete filteredUsers[0].password;
    user = JSON.stringify(filteredUsers[0]);
    res.status(201);
    res.send(user);
  } catch (error) {
    res.status(500);
    res.send(error.message);
    //console.log(error);
  }
});

app.post("/login", (req, res) => {
  try {
    login = req.body;
    //console.log("login");
    //console.log(login);
    const listUsers = JSON.parse(fs.readFileSync("users.json"));
    //console.log("listUsers");
    //console.log(listUsers);
    let filteredUsers = listUsers.filter((user) => {
      return user.email == login.username && user.password == login.password;
    });

    if (filteredUsers[0] === undefined) {
      throw new Error("User/Password invalid");
    }

    if (filteredUsers[0].password === login.password) {
      // delete filteredUsers[0].password
      // delete filteredUsers[0].ip
      // delete filteredUsers[0].dateCreation

      userLogged = JSON.stringify(filteredUsers[0]);
      //console.log("userLogged");
      //console.log(userLogged);

      let newSessionID = generateSessionID();
      let newSession = {
        sessionID: newSessionID,
        userLoggedID: JSON.parse(userLogged).id,
        sessionStart: Date.now(),
        ip: login.ip,
      }
      console.log(newSession);
      sessions.push(newSession);
      let sessionIDObj = { sessionID: newSessionID };
      res.send(JSON.stringify(sessionIDObj));
      res.status(201);
    } else {
      throw new Error("User/Password invalid");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
    //console.log(error);
  }

  //console.log("End of Login");
});

app.post("/signup", (req, res) => {
  try {
    newUser = req.body;
    // //console.log(login);

    // fs.appendFileSync("users.json", JSON.stringify(newUser));
    var listUsers;
    try {
      listUsers = JSON.parse(fs.readFileSync("users.json"));
    } catch {
      listUsers = [];
    }
    let countUsers = listUsers.length;
    newUser.id = countUsers + 2000;
    listUsers.push(newUser);
    fs.writeFileSync("users.json", JSON.stringify(listUsers));

    // let filteredUsers = listUsers.filter((user) => {
    //   return (user.email == login.username && user.password == login.password);
    // });

    // if (filteredUsers[0] === undefined) {
    //   throw new Error('User/Password invalid')
    // }

    // if (filteredUsers[0].password === login.password) {
    //   // delete filteredUsers[0].password
    //   userLogged = JSON.stringify(filteredUsers[0])
    //   let newSessionID = generateSessionID();
    //   sessions.push({"sessionID": newSessionID, "userLoggedID" : JSON.parse(userLogged).id, "sessionStart": Date.now(),"ip":login.ip});
    //   // //console.log("newSessionID: " + newSessionID);
    //   // //console.log("JSON.parse(userLogged).id : " + JSON.parse(userLogged).id);
    //   // //console.log(sessions);
    //   let sessionIDObj = {sessionID : newSessionID}
    res.send(JSON.stringify({ Succes: "OK" }));
    res.status(201);
    // } else {
    //   throw new Error('User/Password invalid')
    // }
  } catch (error) {
    res.status(500);
    res.send(error.message);
    //console.log(error);
  }
});

app.post("/getUser", (req, res) => {
  //console.log("getUser called");
  try {
    sessionJSON = req.body;
    sessionObj = sessionJSON;
    console.log("getUser - sessionJSON.sessionID");
    console.log(sessionJSON.sessionID);

    //const listUsers = JSON.parse(fs.readFileSync("session.json"))
    const listUsers = JSON.parse(fs.readFileSync("users.json"));

    let session = sessions.filter((s) => {
      return s.sessionID == sessionObj.sessionID;
    });
    //console.log(session[0]);

    let filteredUsers = listUsers.filter((user) => {
      return user.id == session[0].userLoggedID;
    });
    //console.log(filteredUsers[0]);

    res.status(201);
    res.send(filteredUsers[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
    //console.log(error);
  }
});

app.post("/getKey", (req, res) => {
  //console.log("function getKey called");
  try {
    sessionJSON = req.body;
    sessionObj = sessionJSON;
    //console.log(sessionJSON.sessionID);

    //const listUsers = JSON.parse(fs.readFileSync("session.json"))
    const key = JSON.parse(fs.readFileSync("key.json"));

    //   // let session = sessions.filter((s) => {
    //   //   return s.sessionID == sessionObj.sessionID;
    //   // });
    //   // //console.log(session[0]);
    //   //console.log("key : " + key[0].api_key );
    //  // let keyJSON = JSON.stringify(key[0])

    //   // let filteredUsers = listUsers.filter((user) => {
    //   //   return user.id == session[0].userLoggedID;
    //   // });

    res.status(201);
    res.send(key[0]);
  } catch (error) {
    //   res.status(500);
    //   res.send(error.message);
    //   //console.log(error);
  }
});

app.post("/addtowatchlist", (req, res) => {
  try {
    //console.log(JSON.parse(userLogged));
    let newLoggedUser = JSON.parse(userLogged);
    newLoggedUser.watchlist.push(req.body);
    userLogged = JSON.stringify(newLoggedUser);
    // userLogged.watchlist.push(req.body);

    // if (updated) {
    //   fs.writeFileSync("properties.json", JSON.stringify(allProperties))
    saveUpdate(userLogged);

    res.status(201);
    res.send("stock add sucessfully");
    // } else {
    //   throw new Error('Can\'t find this property')
    // }
  } catch (error) {
    res.status(500);
    res.send(error.message);
    //console.log("Error", error.message);
  }
});

app.post("/withdraw", (req, res) => {
  try {
    let ObjWithdrawRequest = req.body;
    //console.log("ObjWithdrawRequest");
    //console.log(ObjWithdrawRequest);

    let userID = "";
    sessions.forEach((session) => {
      //console.log(session);

      if (session.sessionID == ObjWithdrawRequest.session) {
        userID = session.userLoggedID;
      }
      //console.log(userID);
    });

    const listUsers = JSON.parse(fs.readFileSync("users.json"));

    let filteredUsers = listUsers.filter((user) => {
      return user.id == userID;
    });

    //console.log("filteredUsers[0]");
    //console.log(filteredUsers[0]);
    //console.log("filteredUsers[0].cash[0].balance");
    //console.log(filteredUsers[0].cash[0].balance);
    let previousBalance = parseFloat(filteredUsers[0].cash[0].balance);
    let valueToWithdraw = ObjWithdrawRequest.withdrawValue;

    if (previousBalance - valueToWithdraw < 0) {
      res.status(500);
      res.send("Insuficient funds");
    } else {
      filteredUsers[0].cash[0].balance = previousBalance - valueToWithdraw;
      //console.log("Withdraw realized");
      //console.log("filteredUsers[0].cash[0].balance");
      //console.log(filteredUsers[0].cash[0].balance);

      //console.log("filteredUsers[0]");
      //console.log(filteredUsers[0]);
      saveUpdate(JSON.stringify(filteredUsers[0]));

      res.status(201);
      res.send("Withdraw sucessfull!");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
    //console.log("Error", error.message);
  }
});

app.post("/deposit", (req, res) => {
  try {
    let ObjDepositRequest = req.body;
    //console.log("ObjDepositRequest");
    //console.log(ObjDepositRequest);

    let userID = "";
    sessions.forEach((session) => {
      //console.log(session);

      if (session.sessionID == ObjDepositRequest.session) {
        userID = session.userLoggedID;
      }
    });
    //console.log(userID);

    const listUsers = JSON.parse(fs.readFileSync("users.json"));

    let filteredUsers = listUsers.filter((user) => {
      return user.id == userID;
    });

    //console.log("filteredUsers[0]");
    //console.log(filteredUsers[0]);
    //console.log("filteredUsers[0].cash[0].balance");
    //console.log(filteredUsers[0].cash[0].balance);
    let previousBalance = parseFloat(filteredUsers[0].cash[0].balance);
    let valueToDeposit = ObjDepositRequest.depositValue;

    filteredUsers[0].cash[0].balance = previousBalance + valueToDeposit;
    //console.log("Deposit realized");
    //console.log("filteredUsers[0].cash[0].balance");
    //console.log(filteredUsers[0].cash[0].balance);

    //console.log("filteredUsers[0]");
    //console.log(filteredUsers[0]);
    saveUpdate(JSON.stringify(filteredUsers[0]));

    res.status(201);
    res.send("Deposit sucessfull!");
  } catch (error) {
    res.status(500);
    res.send(error.message);
    //console.log("Error", error.message);
  }
});

app.post("/transaction", (req, res) => {
  request = req.body;
  transaction = request.transaction;
  //console.log(request);

  try {
    let userID = "";
    sessions.forEach((session) => {
      //console.log(session);

      if (session.sessionID == request.session) {
        userID = session.userLoggedID;
      }
    });
    //console.log(userID);

    const listUsers = JSON.parse(fs.readFileSync("users.json"));

    let filteredUsers = listUsers.filter((user) => {
      return user.id == userID;
    });

    //console.log("filteredUsers[0]");
    //console.log(filteredUsers[0]);
    //console.log("filteredUsers[0].cash[0].balance");
    //console.log(filteredUsers[0].cash[0].balance);

    if (transaction == "buy") {
      if (filteredUsers[0].cash[0].balance >= request.totalOrder) {
        filteredUsers[0].cash[0].balance -= request.totalOrder;
        //console.log(filteredUsers[0]);

        let hasStock = false;
        filteredUsers[0].stock.forEach((s) => {
          if (s.symbol == request.stockSymbol) {
            hasStock = true;
            s.qt += request.qt;
          }
        });

        if (!hasStock) {
          filteredUsers[0].stock.push({
            symbol: request.stockSymbol,
            qt: request.qt,
          });
        }
      } else {
        //console.log("Insuficient Funds");
        res.status(500);
        res.send("Insuficient Funds");
      }
    } else if (transaction == "sell") {
      let hasStock = false;
      let removeStock = -1;

      for( let i =0 ; i< filteredUsers[0].stock.length ; i++){
        //console.log('i = ' + i)
        if (filteredUsers[0].stock[i].symbol == request.stockSymbol &&
          filteredUsers[0].stock[i].qt >= request.qt) {
          hasStock = true;
          //console.log("has Stock true");
          filteredUsers[0].stock[i].qt -= request.qt;
          //console.log(filteredUsers[0].stock[i].symbol);
          //console.log('filteredUsers[0].stock[i].qt');
          //console.log(filteredUsers[0].stock[i].qt);
          //console.log('request.qt');
          //console.log(request.qt);

          if (filteredUsers[0].stock[i].qt == 0) {
            removeStock = i;
            //console.log('removeStock =' + i);
          }
        }
        //console.log('end for');
      };

      if(hasStock== false){

        //console.log("Insuficient Stocks");
        res.status(500);
        res.send("Insuficient Stocks");
      }

      if (removeStock>=0) {
        filteredUsers[0].stock.splice(
          removeStock,
          1
        );
      }

      //console.log(filteredUsers[0]);
      filteredUsers[0].cash[0].balance += request.totalOrder;
      //console.log(filteredUsers[0]);
    }

    saveUpdate(JSON.stringify(filteredUsers[0]));
    //console.log('user saved');
    res.status(201);
    res.send("Transaction sucessfull!");

    // let previousBalance = parseFloat(filteredUsers[0].cash[0].balance);
    // let valueToDeposit = ObjDepositRequest.depositValue;

    // filteredUsers[0].cash[0].balance = previousBalance + valueToDeposit;
    // //console.log("Deposit realized");
    // //console.log("filteredUsers[0].cash[0].balance");
    // //console.log(filteredUsers[0].cash[0].balance);

    // //console.log("filteredUsers[0]");
    // //console.log(filteredUsers[0]);
    // saveUpdate(JSON.stringify(filteredUsers[0]));
  } catch (error) {
    // res.status(500);
    // res.send(error.message);
    // //console.log("Error", error.message);
  }
});

app.post("/removefromwatchlist", (req, res) => {
  try {
    //console.log(JSON.parse(userLogged));
    let newLoggedUser = JSON.parse(userLogged);
    //console.log(req.body);

    let indextoremove = -1;

    for (let i = 0; i < newLoggedUser.watchlist.length; i++) {
      if (newLoggedUser.watchlist[i].symbol == req.body.symbol) {
        //console.log("i = " + i);
        newLoggedUser.watchlist.splice(i, 1);
      }
    }

    userLogged = JSON.stringify(newLoggedUser);
    // userLogged.watchlist.push(req.body);

    // if (updated) {
    //   fs.writeFileSync("properties.json", JSON.stringify(allProperties))
    saveUpdate(userLogged);

    res.status(201);
    res.send("stock removed sucessfully");
    // } else {
    //   throw new Error('Can\'t find this property')
    // }
  } catch (error) {
    res.status(500);
    res.send(error.message);
    //console.log("Error", error.message);
  }
});

app.post("/signup", (req, res) => {
  try {
    signup = req.body;
    const listUsers = JSON.parse(fs.readFileSync("users.json"));
    let countUsers = listUsers.length;
    signup.id = countUsers;
    let filteredUsers = [];
    filteredUsers = listUsers.filter((user) => {
      return user.email == signup.email;
    });
    if (filteredUsers[0] !== undefined) {
      throw new Error("Existing user, go login!");
    }
    const newListUsers = [...listUsers, signup];
    fs.writeFileSync("users.json", JSON.stringify(newListUsers));
    res.status(201);
    res.send("OK");
  } catch (error) {
    res.status(500);
    res.send(error.message);
    //console.log("Error", error.message);
  }
});

app.listen(3000, () => {
  console.log("App lstening on port 3000!");
});

function saveUpdate(userToUpdate) {
  const allUsers = JSON.parse(fs.readFileSync("users.json")).filter(
    (u) => u.id !== JSON.parse(userToUpdate).id
  );
  allUsers.push(JSON.parse(userToUpdate));
  ////console.log("All Users");
  ////console.log(allUsers);
  ////console.log(allUsers);

  fs.writeFileSync("users.json", JSON.stringify(allUsers));
}
