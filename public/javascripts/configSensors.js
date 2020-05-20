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

document.getElementById("s0").addEventListener('change', function(e){
    console.log(button);
    console.log(e);
    // postData();
});