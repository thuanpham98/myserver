"use strict"

var frame,email;

document.getElementById("verify").addEventListener("click", function(){
    console.log("button");
    postData();
});
async function postData(){

    email =document.getElementById("email").value;
    email=email.toString();

    console.log(email);

    frame={email : email};
    let response = await fetch('https://iot-server-365.herokuapp.com/forgetpass',{
        method: 'post',
        mode: 'cors', 
        headers:{
            //'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(frame)
    });
    let datum= await response;
    console.log(datum);
    if(datum.redirected)
    {
        window.location.replace( "/forgetpass/verify");
    }
    else{
        console.log("error");
        document.getElementById("status").innerHTML="Account is exist";
    }
}