"use strict"

// var frame,dev_index,dev_name,child_index,child_status;

// async function postConfigSensi(){

//     dev_index=document.getElementById("devID").innerHTML;
//     dev_name= document.getElementById("devName").innerHTML;

//     frame={dev : dev_index , mask : dev_name, child : {index : child_index,status:child_status},action : 0};
//     console.log(frame);
//     let response = await fetch('https://iot-server-365.herokuapp.com/user/config/sensors',{
//         method: 'post',
//         mode: 'cors', 
//         headers:{
//             //'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//         },
//         body:JSON.stringify(frame)
//     });

//     let datum= await response.json();
//     console.log(datum);
// }


// $(function () {
//     $('#s0').change(function () {

//         child_index=0;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });
// //------------------------------------------------------
// $(function () {
//     $('#s1').change(function () {

//         child_index=1;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });
// //------------------------------------------------------
// $(function () {
//     $('#s2').change(function () {

//         child_index=2;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });
// //-----------------------------------------------------------------
// $(function () {
//     $('#s3').change(function () {

//         child_index=3;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });
// //-----------------------------------------------------
// $(function () {
//     $('#s4').change(function () {

//         child_index=4;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });
// //------------------------------------------------------
// $(function () {
//     $('#s5').change(function () {

//         child_index=5;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });
// //---------------------------------------------------------------
// $(function () {
//     $('#s6').change(function () {

//         child_index=6;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });
// //----------------------------------------------------------------------
// $(function () {
//     $('#s7').change(function () {

//         child_index=7;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });
// //--------------------------------------------------------------
// $(function () {
//     $('#s8').change(function () {

//         child_index=8;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });
// //----------------------------------------------------------------
// $(function () {
//     $('#s9').change(function () {

//         child_index=9;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });
// //----------------------------------------------------
// $(function () {
//     $('#s10').change(function () {

//         child_index=10;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });
// //--------------------------------------------------------------
// $(function () {
//     $('#s11').change(function () {

//         child_index=11;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });
// //---------------------------------------------------
// $(function () {
//     $('#s12').change(function () {

//         child_index=12;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });
// //------------------------------------------
// $(function () {
//     $('#s13').change(function () {

//         child_index=13;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });
// //----------------------------------------------------------------
// $(function () {
//     $('#s14').change(function () {

//         child_index=14;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });
// //-----------------------------------------------
// $(function () {
//     $('#s15').change(function () {

//         child_index=15;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });
// //-----------------------------------------------------------------
// $(function () {
//     $('#s16').change(function () {

//         child_index=16;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });
// //--------------------------------------------------
// $(function () {
//     $('#s17').change(function () {

//         child_index=17;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi()
//     })
// });
// //----------------------------------------------
// $(function () {
//     $('#s18').change(function () {

//         child_index=18;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });
// //----------------------------------------------------------------------------------
// $(function () {
//     $('#s19').change(function () {

//         child_index=19;
//         if($(this).prop('checked')){
//             child_status=true;
//         }
//         else {
//             child_status=false;
//         }
//         postConfigSensi();
//     })
// });


var theParent = document.querySelector('#sensors');
function dosomething(e){
    if(e.target!==e.currentTarget){
        var clickeditem = $('input').prop('checked');
        alert("hello "+ clickeditem);
        console.log(e);
    }
    // e.stopPropagation();
}
theParent.addEventListener("click",dosomething,false);
