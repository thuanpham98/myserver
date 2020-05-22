"use strict"

var frame,dev_index,dev_name,child_index,child_status,action=-1 ;

async function postData(){

    dev_index=document.getElementById("devID").innerHTML;
    dev_name= document.getElementById("devName").innerHTML;

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
        
        if($(this).prop('checked')){
            child_status=true;
        }
        else {
            child_status=false;
        }
        postData();
    })
});
//------------------------------------------------------
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
//------------------------------------------------------
$(function () {
    $('#2').change(function () {

        child_index=2;
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
//-----------------------------------------------------------------
$(function () {
    $('#3').change(function () {

        child_index=3;
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
//-----------------------------------------------------
$(function () {
    $('#4').change(function () {

        child_index=4;
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
//------------------------------------------------------
$(function () {
    $('#5').change(function () {

        child_index=5;
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
//---------------------------------------------------------------
$(function () {
    $('#6').change(function () {

        child_index=6
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
//----------------------------------------------------------------------
$(function () {
    $('#7').change(function () {

        child_index=7;
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
//--------------------------------------------------------------
$(function () {
    $('#8').change(function () {

        child_index=8;
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
//----------------------------------------------------------------
$(function () {
    $('#9').change(function () {

        child_index=9;
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
//----------------------------------------------------
$(function () {
    $('#10').change(function () {

        child_index=10;
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
//--------------------------------------------------------------
$(function () {
    $('#11').change(function () {

        child_index=11;
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
//---------------------------------------------------
$(function () {
    $('#12').change(function () {

        child_index=12;
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
//------------------------------------------
$(function () {
    $('#13').change(function () {

        child_index=13;
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
//----------------------------------------------------------------
$(function () {
    $('#14').change(function () {

        child_index=14;
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
//-----------------------------------------------
$(function () {
    $('#15').change(function () {

        child_index=15;
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
//-----------------------------------------------------------------
$(function () {
    $('#16').change(function () {

        child_index=16;
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
//--------------------------------------------------
$(function () {
    $('#17').change(function () {

        child_index=17;
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
//----------------------------------------------
$(function () {
    $('#18').change(function () {

        child_index=18;
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
//----------------------------------------------------------------------------------
$(function () {
    $('#19').change(function () {

        child_index=19;
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