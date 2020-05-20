"use strict"

var frame,dev,mask,type,act=-1;

async function postData(){

    dev =document.getElementById("dev").value;
    mask =document.getElementById("mask").value;
    type = document.getElementById("type").value;

    dev=dev.toString();
    mask=mask.toString();
    type=type.toString();

    if((dev!=="") && (mask !=="")&&(type !=="")){
        frame={dev : dev  ,mask: mask , type : type,act : act};
        console.log(frame);
        let response = await fetch('https://iot-server-365.herokuapp.com/user/config',{
            method: 'post',
            mode: 'cors', 
            headers:{
                //'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(frame)
        });
        
        let datum= await response.json();

    window.location.replace('/user/config');
    window.alert(datum);
    }
    else{
        document.getElementById("status").innerHTML="fill all the parameter";
    }
    
    // if(datum.redirected)
    // {
    //     window.location.replace(datum.url);
    // }
    // else{
    //     //window.location.replace( "/login");
    //     console.log("error");
    //     document.getElementById("status").innerHTML="email or pass is incorrect";
        
    // }
}

document.getElementById("addDev").addEventListener("click", function(){
    act=1;
    console.log(act);
    postData();
});
document.getElementById("removeDev").addEventListener("click", function(){
    act=0;
    console.log(act);
    postData();
});