"use strict"

var frame_post,frame_get={"s21":1,"s22":1};
var pre_0,pre_1;
var a,b;
async function getData(){
    let response= await fetch('http://localhost:6969/user/GUI/bathroom/getdata',{
        method: 'get',
        mode: 'cors',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    let datum= await response.json();
    frame_get = datum;
    load();
    
};
function load(){

    pre_0 = 1-frame_get.s12;
    pre_1 = 1-frame_get.s13;

    document.getElementById("s21").checked=Boolean(1-frame_get.s21);
    document.getElementById("s22").checked=Boolean(1-frame_get.s22);

    a = 1-frame_get.s21;
    b = 1-frame_get.s22;

}

async function postData(){
    let response = await fetch('http://localhost:6969/user/GUI/bathroom/postdata',{
        method: 'post',
        mode: 'cors', 
        headers:{
            //'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(frame_post)
    });

    let datum= await response.json();
    console.log(datum);
}

function choose(){
    
    a=document.getElementById("s21").checked;
    b=document.getElementById("s22").checked;

    let valDev = document.getElementById('dev').value;
    console.log(valDev);

//----------------------------------------------------    
    if(a){
        a=1;
    }
    else a=0;
    if(b){
        b=1;
    }
    else b=0;
//-------------------------------------------------
    if(a!==pre_0){
        frame_post={device : parseInt(valDev) , io : 21, value : 1-a };
        postData();
        pre_0 =a;
    }
    if(b!==pre_1){
        frame_post={device : parseInt(valDev) , io : 22, value : 1-b };
        postData();
        pre_1 =b;
    }
}

getData();
setInterval(choose, 1000);