"use strict"

var frame,dev_index,dev_name,child_index,child_status ;

async function postData(){


    frame={dev : dev_index , mask : dev_name, child : {index : child_index,status:child_status}};
    console.log(frame);
    // let response = await fetch('https://iot-server-365.herokuapp.com/login',{
    //     method: 'post',
    //     mode: 'cors', 
    //     headers:{
    //         //'Accept': 'application/json, text/plain, */*',
    //         'Content-Type': 'application/json'
    //     },
    //     body:JSON.stringify(frame)
    // });

    // let datum= await response;

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


$(function () {
    $('#0').change(function () {

        child_index=0;
        dev_index=document.getElementById("devID").innerHTML;
        dev_name= document.getElementById("devName").innerHTML;
        if($(this).prop('checked')){
            child_status=true;
        }
        else {
            child_status=false;
        }
        postData();
    })
});
$(function () {
    $('#1').change(function () {

        child_index=1;
        dev_index=document.getElementById("devID").innerHTML;
        dev_name= document.getElementById("devName").innerHTML;
        if($(this).prop('checked')){
            child_status=true;
        }
        else {
            child_status=false;
        }
        postData();
    })
});