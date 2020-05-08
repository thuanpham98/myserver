"use strict"

var frame,email,number;

document.getElementById("verify").addEventListener("click", function(){
    console.log("button");
    postData();
});
async function postData(){

    email =document.getElementById("email").value;
    number =document.getElementById("number").value;

    email=email.toString();
    number=number.toString();

    console.log(number);
    frame={email : email , number : number};
    let response = await fetch('https://iot-server-365.herokuapp.com/forgetpass/verify',{
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
        //window.location.replace( "/login");
    }
    else{
        console.log("error");
        document.getElementById("status").innerHTML="Number is incorrect";
    }
}