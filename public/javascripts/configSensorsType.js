"use strict"

var frame,dev_index,dev_name,child_index,child_type;

async function postConfigSensi_type(){

    dev_index=document.getElementById("devID").innerHTML;
    dev_name= document.getElementById("devName").innerHTML;

    frame={dev : dev_index , mask : dev_name, child : {index : child_index, type:child_type},action : 1};
    console.log(frame);
    let response = await fetch('https://iot-server-365.herokuapp.com/user/config/sensors',{
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


$(function () {
    $('#t0').change(function () {

        child_index=0;
        
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//------------------------------------------------------
$(function () {
    $('#t1').change(function () {

        child_index=1;
        
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//------------------------------------------------------
$(function () {
    $('#t2').change(function () {

        child_index=2;
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//-----------------------------------------------------------------
$(function () {
    $('#t3').change(function () {

        child_index=3;
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//-----------------------------------------------------
$(function () {
    $('#t4').change(function () {

        child_index=4;
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//------------------------------------------------------
$(function () {
    $('#t5').change(function () {

        child_index=5;
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//---------------------------------------------------------------
$(function () {
    $('#t6').change(function () {

        child_index=6
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//----------------------------------------------------------------------
$(function () {
    $('#t7').change(function () {

        child_index=7;
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//--------------------------------------------------------------
$(function () {
    $('#t8').change(function () {

        child_index=8;
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//----------------------------------------------------------------
$(function () {
    $('#t9').change(function () {

        child_index=9;
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//----------------------------------------------------
$(function () {
    $('#t10').change(function () {

        child_index=10;
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//--------------------------------------------------------------
$(function () {
    $('#t11').change(function () {

        child_index=11;
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//---------------------------------------------------
$(function () {
    $('#t12').change(function () {

        child_index=12;
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//------------------------------------------
$(function () {
    $('#t13').change(function () {

        child_index=13;
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//----------------------------------------------------------------
$(function () {
    $('#t14').change(function () {

        child_index=14;
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//-----------------------------------------------
$(function () {
    $('#t15').change(function () {

        child_index=15;
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//-----------------------------------------------------------------
$(function () {
    $('#t16').change(function () {

        child_index=16;
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//--------------------------------------------------
$(function () {
    $('#t17').change(function () {

        child_index=17;
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//----------------------------------------------
$(function () {
    $('#t18').change(function () {

        child_index=18;
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});
//----------------------------------------------------------------------------------
$(function () {
    $('#t19').change(function () {

        child_index=19;
        if($(this).prop('checked')){
            child_type=1;
        }
        else {
            child_type=0;
        }
        postConfigSensi_type();
    })
});