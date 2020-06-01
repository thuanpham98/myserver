"use strict"

var frame,dev_index,dev_name,child_index,child_status;

// async function postConfigEquipi(){

//     dev_index=document.getElementById("devID").innerHTML;
//     dev_name= document.getElementById("devName").innerHTML;

//     frame={dev : dev_index , mask : dev_name, child : {index : child_index,status:child_status},action : 0};
//     console.log(frame);
//     let response = await fetch('https://iot-server-365.herokuapp.com/user/gui/blocks',{
//         method: 'post',
//         mode: 'cors', 
//         headers:{
//             //'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//         },
//         body:JSON.stringify(frame)
//     });

//     let datum= await response.json();
//     console.log(datum.name);
// }

$(document).ready(function () {

    $(".blocki").change(function (){
        let id = $(this).attr("id");

        child_index=parseInt(id.slice(1));
        if($(this).prop('checked')){
            child_status=true;
        }
        else {
            child_status=false;
        }
        postConfigEquipi();
    });
});
