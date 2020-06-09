"use strict"

var pre_valPAC=0;
var valPAC;
var PAC ;
var pre_valChoice=0;
var valChoice;
var frame ;
var valCurrentpwm0=0;
var valCurrentpwm1=0;
var valCurrentdac0=0;
var valCurrentdac1=0;


async function postData(){
    

    let response = await fetch('http://iotmakerserver.herokuapp.com/user/GUI/postdata',{
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

function choose(){
    let valDev = document.getElementById('dev');
    console.log(valDev);
    valPAC= document.getElementById('display').innerHTML;
    valPAC=parseInt(valPAC, 10);
    let choicepwm0 = document.getElementById("pwm0").checked;
    let choicepwm1 = document.getElementById("pwm1").checked;
    let choicedac0 = document.getElementById("dac0").checked;
    let choicedac1 = document.getElementById("dac1").checked;

    if(choicepwm0){
        valChoice=32;
        valCurrentpwm0=valPAC;
        frame = {device: 0,"io":valChoice,"value": valPAC };
        document.getElementById('lp0').innerHTML="PWM HS Channel 0 : " + valCurrentpwm0.toString();
    }
    else if(choicepwm1){
        valChoice=33;
        valCurrentpwm1=valPAC;
        frame = {device: 0,"io":valChoice,"value": valPAC };
        document.getElementById('lp1').innerHTML="PWM HS Channel 1 : " + valCurrentpwm1.toString();
    }
    else if(choicedac0){
        valChoice=25;
        valCurrentdac0=valPAC;
        frame = {device: 0,"io":valChoice,"value": valPAC };
        document.getElementById('ld0').innerHTML="DAC Channel 0 : " + valCurrentdac0.toString();
    }
    else if(choicedac1){
        valChoice=26;
        valCurrentdac1=valPAC;
        frame = {device: 0,"io":valChoice,"value": valPAC };
        document.getElementById('ld1').innerHTML="DAC Channel 1 : " + valCurrentdac1.toString();
    }
    else{
        //alert("Hello! I am an alert box!");
        frame = 0;
    }
    console.log(frame);
    if(frame!==0){
        if(((pre_valChoice==valChoice && pre_valPAC ==valPAC)||(pre_valChoice!=valChoice && pre_valPAC ==valPAC))){
            console.log("no change");
        }else{
            postData();
            pre_valChoice=valChoice;
            pre_valPAC=valPAC;
        }
    }
}

setInterval(choose, 10);