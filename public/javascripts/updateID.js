"use strict"

var frame, email, o_pass, updateID, status_ID;

async function postData_ID() {

    email = document.getElementById("email").value;
    o_pass = document.getElementById("o_pass").value;

    email = email.toString();
    o_pass = o_pass.toString();
    console.log(o_pass);
    updateID = 1;
    frame = { email: email, o_pass: o_pass, updateID: updateID };

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
    console.log(datum);
    if (datum.redirected) {
        window.location.replace(datum.url);
        window.alert("ID is update successful, see in your email, if not , try again");
    }
    else {
        //window.location.replace( "/login");
        console.log("error");
        document.getElementById("statusID").innerHTML = "email or pass is incorrect";

    }
    updateID = 0;
}

document.getElementById("updateID").addEventListener("click", function () {
    console.log("button");
    postData_ID();
});