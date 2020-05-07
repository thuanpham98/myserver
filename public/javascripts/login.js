"use strict"

var frame,email,pass ;

document.getElementById("login").addEventListener("click", function(){
    console.log("button");
    postData();
});
async function postData(){

    email =document.getElementById("email").value;
    pass =document.getElementById("pass").value;
    
    email=email.toString();
    pass=pass.toString();
    frame={email : email , pass : pass};

    let response = await fetch('https://iot-server-365.herokuapp.com/login',{
        method: 'post',
        mode: 'cors', 
        headers:{
            //'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(frame)
    });
    
    let datum= await response;
    console.log(datum.sta);
    if(datum.redirected)
    {
        window.location.replace( "/user");
    }
    else{
        //window.location.replace( "/login");
        console.log("error");
        document.getElementById("status").innerHTML=datum.sta.toString();
        
    }
}