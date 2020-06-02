"use strict"

var frame,block_name,block_index,pin_index,pin_val;

async function portBlockCommand_vol(){

    block_index=document.getElementById("numBlock").innerHTML;
    block_name= document.getElementById("blockName").innerHTML;

    frame={port : block_index , maskport : block_name,pin : pin_index, value : pin_val};
    console.log(frame);
    let response = await fetch('https://iot-server-365.herokuapp.com/user/gui/blocks',{
        method: 'post',
        mode: 'cors', 
        headers:{
            //'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(frame)
    });

    let datum= await response.json();
    console.log(datum.status);
}

// $(document).ready(function () {

//     // let a= $(".blocki_vol").change(function (){

//     //     console.log("ok");
//     // });
    

// });
document.addEventListener("click",function(e){
    let num = e.path[1].id;
    num = num.toString();
    console.log(e.path[1].id);
    let val = document.getElementById(num);
    let te= document.getElementsByClassName("e-tt__content");
    console.log(val);
    console.log(te);

});


// $(document).ready(function () {

//     $(".blocki_vol").onchange(function (e){
//         let id = $(this).attr("id");

//         pin_index=parseInt(id.slice(1));
//         let a= $(this).value;

//         console.log(e);
//     });
// });
