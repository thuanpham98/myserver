"use strict"

var frame,dev_index,dev_name,child_index,child_type;

async function postConfigSensi_type(){

    dev_index=document.getElementById("devID").innerHTML;
    dev_name= document.getElementById("devName").innerHTML;

    frame={dev : dev_index , mask : dev_name, child : {index : child_index, type:child_type},action : 1};
    console.log(frame);
    let response = await fetch('https://iot-server-365.herokuapp.com/user/config/equipments',{
        method: 'post',
        mode: 'cors', 
        headers:{
            //'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(frame)
    });

    let datum= await response.json();  
    console.log(datum);
}

$(document).ready(function () {

    $(".equipitype").change(function (){
        var id = $(this).attr("id");

        child_index=parseInt(id.slice(1));
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    });
});