"use strict"

var frame,block_name,block_index,pin_index,pin_val;

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
//     console.log(datum.status);
// }

$(document).ready(function () {

    $(".blocki").change(function (){
        let id = $(this).attr("id");

        pin_index=parseInt(id.slice(1));
        if($(this).prop('checked')){
            pin_val=1;
        }
        else {
            pin_val=0;
        }
        // postConfigEquipi();
        console.log(pin_index + "is" + pin_val.toString());
    });
});
