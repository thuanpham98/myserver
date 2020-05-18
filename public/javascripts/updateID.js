"use strict"

var frame, email, o_pass,updateID;

async function postData() {

    email = document.getElementById("email").value;
    o_pass = document.getElementById("o_pass").value;

    email = email.toString();
    o_pass = o_pass.toString();

    updateID=1;
    frame = { email: email, o_pass: o_pass, updateID : updateID};

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
        document.getElementById("status").innerHTML = "update ID Success";
    }
    else {
        //window.location.replace( "/login");
        console.log("error");
        document.getElementById("status").innerHTML = "email or pass is incorrect";

    }
    updateID=0;
}

document.getElementById("updateID").addEventListener("click", function () {
    console.log("button");
    postData();
});