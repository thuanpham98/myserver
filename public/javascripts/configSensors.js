"use strict"

// var frame,email,pass ;

// console.log(document.getElementById("0"));

// async function postData(){

//     email =document.getElementById("email").value;
//     pass =document.getElementById("pass").value;
    
//     email=email.toString();
//     pass=pass.toString();
//     frame={email : email , pass : pass};

//     let response = await fetch('https://iot-server-365.herokuapp.com/login',{
//         method: 'post',
//         mode: 'cors', 
//         headers:{
//             //'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//         },
//         body:JSON.stringify(frame)
//     });
    
//     let datum= await response;
    
//     if(datum.redirected)
//     {
//         window.location.replace(datum.url);
//     }
//     else{
//         //window.location.replace( "/login");
//         console.log("error");
//         document.getElementById("status").innerHTML="email or pass is incorrect";
        
//     }
// }
// console.log("ok");
var the_server = document.querySelector("#sensors");
the_server.addEventListener("click",to_to,false);

function to_to(e){
    if(e.target !== e.currentTarget){
        var clickItem = e.target.id;
        console.log(clickItem);
        console.log(e.target);
    }
    e.stopPropagation();
}

// function func(){
//     var sensors=document.getElementsByClassName("sensor");
//     for(let i =0; i< sensors.length;i++){
//         if(sensors[i].checked){
//             console.log("sensor");
//         }
//     }
// };