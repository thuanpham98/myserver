"use strict"

var frame,dev_id ,dev, block_name, block_index, pin_index, pin_val;

async function portBlockCommand_Digi() {

    block_index = document.getElementById("numBlock").innerHTML;
    block_name = document.getElementById("blockName").innerHTML;
    dev = document.getElementById(dev_id).innerHTML;

    frame = { dev: dev, port: block_index, maskport: block_name, pin: pin_index, value: pin_val };
    console.log(frame);
    let response = await fetch('https://iot-server-365.herokuapp.com/user/gui/blocks', {
        method: 'post',
        mode: 'cors',
        headers: {
            //'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(frame)
    });

    let datum = await response.json();
    console.log(datum.status);
}

// $(document).ready(function () {

//     // let a= $(".blocki_vol").change(function (){

//     //     console.log("ok");
//     // });


// });
// document.addEventListener("click",function(e){
//     let num = e.path[1].id;
//     num = num.toString();
//     if(num.length){
//         console.log(e.path[1].id);
//         console.log(e);
//     }

// });
// let te = document.getElementsByClassName("e-tt__content");
// console.log(te);
// $(document).ready(function () {

//     $(".blocki_vol").onchange(function (e){
//         let id = $(this).attr("id");

//         pin_index=parseInt(id.slice(1));
//         let a= $(this).value;

//         console.log(e);
//     });
// });

document.getElementById(id_span).innerHTML= e.target.value;
let b = document.addEventListener("input",function(e){
    console.log(e.target.id);
    let the_id = e.target.id.toString();
    console.log(e.target.value);
    pin_val = parseInt(e.target.value,10);
    pin_val =parseInt(pin_val*2.55,10);
    pin_index = parseInt(the_id.slice(1));
    dev_id = 'd'+pin_index;
    let id_span="sp" + pin_index;
    document.getElementById(id_span).innerHTML= e.target.value;

    portBlockCommand_Digi();
});

// console.log(b);
// function showSliderValue() {
//   rangeBullet.innerHTML = rangeSlider.value;
//   var bulletPosition = (rangeSlider.value /rangeSlider.max);
//   rangeBullet.style.left = (bulletPosition * 578) + "px";
// }