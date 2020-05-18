"use strict"

var frame, email, o_pass, n_pass,updatePass;

async function postData_pass() {

    email = document.getElementById("email").value;
    o_pass = document.getElementById("o_pass").value;
    n_pass = document.getElementById("n_pass").value;

    email = email.toString();
    o_pass = o_pass.toString();
    n_pass = n_pass.toString();
    updatePass=1;
    frame = { email: email, o_pass: o_pass, n_pass: n_pass , updatePass : updatePass};

    let response = await fetch('https://iot-server-365.herokuapp.com/user/update', {
        method: 'post',
        mode: 'cors',
        headers: {
            //'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(frame)
    });

    let datum = await response;

    if (datum.redirected) {
        window.location.replace(datum.url);
        document.getElementById("status").innerHTML = "update Password Success";
    }
    else {
        //window.location.replace( "/login");
        console.log("error");
        document.getElementById("status").innerHTML = "email or pass is incorrect";

    }
    updatePass=0;
}

document.getElementById("updatePass").addEventListener("click", function () {
    console.log("button");
    postData_pass();
});