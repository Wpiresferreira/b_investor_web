let userLogged = null;

let checkedSession = false;


async function login() {
    console.log("testing");
    let username = document.getElementById("input_email")
    let password = document.getElementById("input_password")

    try {
        const response = await fetch('https://api.ipify.org/?format=json');
        const result = await response.text();
        const resStatus = await response.status;
        console.log(resStatus);
        console.log(result);
        objIp = JSON.parse(result)
    } catch (error) {
        console.error(error);
    }
    objLogin = {
        username: username.value,
        password: password.value,
        ip: objIp.ip
    }
    JSONLogin = JSON.stringify(objLogin)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSONLogin,
        redirect: 'follow'
    };
    const url = "http://localhost:3000/login"
    try {
        const response = await fetch(url, requestOptions);
        const result = await response.text();
        const resStatus = await response.status;
        if (resStatus == "500") {
        } else if (resStatus == "201") {
            resultObj = JSON.parse(result)
            userLogged = resultObj;
            console.log("userLogged = ");
            console.log(userLogged);
            console.log(userLogged.name);
            window.location.href = "/portfolio.html"
            //updateLogin()
            //listProperties('all')
        }
    } catch (error) {
        console.error(error);
    }
}

async function checkSession(){

    if (checkedSession){
        return;
    }
    

    let welcome = document.getElementById("welcome");




    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: null,
        redirect: 'follow'
    };
    const url = "http://localhost:3000/getUser"
    try {
        const response = await fetch(url, requestOptions);
        const result = await response.text();
        const resStatus = await response.status;
        if (resStatus == "500") {
        } else if (resStatus == "201") {
            resultObj = JSON.parse(result)
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
    welcome.innerHTML = "Welcome" + userLogged.name;

    checkedSession = true;
}