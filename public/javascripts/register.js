"use strict"

var frame,email,pass ;

document.getElementById("regis").addEventListener("click", function(){
    console.log("button");
    postData();
});
async function postData(){

    email =document.getElementById("a_email").value;
    pass =document.getElementById("a_pass").value;
    conf_pass =document.getElementById("a_confirm_pass").value;
    
    email=email.toString();
    pass=pass.toString();
    conf_pass= conf_pass.toString();
    
    frame={a_email : email , a_pass : pass, a_conf_pass:conf_pass};
    let response = await fetch('http://iotmakerserver.herokuapp.com/register',{
        method: 'post',
        mode: 'cors', 
        headers:{
            //'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(frame)
    });
    let datum= await response;
    if(datum.redirected)
    {
        window.location.replace( "/login");
    }
    else{
        window.location.replace( "/register");
        document.getElementById("status").value="error pass or email";
    }
}