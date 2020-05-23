"use strict"
var search,frame ;

async function searchDev(){

    search=document.getElementById("searchData").value;
    frame = {mask : search};

    let response = await fetch('https://iot-server-365.herokuapp.com/user/config/sensors/search',{
        method: 'post',
        mode: 'cors', 
        headers:{
            //'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(frame)
    });
    
    let datum= await response;
    console.log(datum.url);
    window.location.replace(datum.url);
}

document.getElementById("search").addEventListener("click", function(){
    console.log("button");
    searchDev();
});