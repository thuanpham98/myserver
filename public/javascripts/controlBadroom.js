"use strict"

var frame_post,frame_get={"s12":1,"s13":1,"s14":1,"s15":1};
var pre_0,pre_1,pre_2,pre_3;
var a,b,c,d;
async function getData(){
    let response= await fetch('https://iotmakerserver.herokuapp.com/user/GUI/badroom/getdata',{
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
    pre_2 = 1-frame_get.s14;
    pre_3 = 1-frame_get.s15;

    document.getElementById("s12").checked=Boolean(1-frame_get.s12);
    document.getElementById("s13").checked=Boolean(1-frame_get.s13);
    document.getElementById("s14").checked=Boolean(1-frame_get.s14);
    document.getElementById("s15").checked=Boolean(1-frame_get.s15);

    a = 1-frame_get.s12;
    b = 1-frame_get.s13;
    c = 1-frame_get.s14;
    d = 1-frame_get.s15;
}

async function postData(){
    let response = await fetch('https://iotmakerserver.herokuapp.com/user/GUI/badroom/postdata',{
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
    
    a=document.getElementById("s12").checked;
    b=document.getElementById("s13").checked;
    c=document.getElementById("s14").checked;
    d=document.getElementById("s15").checked;

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
    if(c){
        c=1;
    }
    else c=0;
    if(d){
        d=1;
    }
    else d=0;
//-------------------------------------------------
    if(a!==pre_0){
        frame_post={device : parseInt(valDev) , io : 12, value : 1-a };
        postData();
        pre_0 =a;
    }
    if(b!==pre_1){
        frame_post={device : parseInt(valDev) , io : 13, value : 1-b };
        postData();
        pre_1 =b;
    }
    if(c!==pre_2){
        frame_post={device : parseInt(valDev) , io : 14, value : 1-c };
        postData();
        pre_2 =c;
    }
    if(d!==pre_3){
        frame_post={device : parseInt(valDev) , io : 15, value : 1-d };
        postData();
        pre_3 = d;
    }
}

getData();
setInterval(choose, 1000);