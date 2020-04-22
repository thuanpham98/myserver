"use strict"

var frame_post,frame_get={"s0":1,"s2":1,"s4":1,"s5":1};
var pre_0,pre_1,pre_2,pre_3;
var a,b,c,d;
async function getData(){
    let response= await fetch('http://localhost:6969/user/GUI/livingroom/getdata',{
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

    pre_0 = 1-frame_get.s0;
    pre_1 = 1-frame_get.s2;
    pre_2 = 1-frame_get.s4;
    pre_3 = 1-frame_get.s5;

    document.getElementById("s0").checked=Boolean(1-frame_get.s0);
    document.getElementById("s2").checked=Boolean(1-frame_get.s2);
    document.getElementById("s4").checked=Boolean(1-frame_get.s4);
    document.getElementById("s5").checked=Boolean(1-frame_get.s5);

    a = 1-frame_get.s0;
    b = 1-frame_get.s2;
    c = 1-frame_get.s4;
    d = 1-frame_get.s5;
}

async function postData(){
    let response = await fetch('http://localhost:6969/user/GUI/livingroom/postdata',{
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
    
    a=document.getElementById("s0").checked;
    b=document.getElementById("s2").checked;
    c=document.getElementById("s4").checked;
    d=document.getElementById("s5").checked;

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
        frame_post={device : parseInt(valDev) , io : 0, value : 1-a };
        postData();
        pre_0 =a;
    }
    if(b!==pre_1){
        frame_post={device : parseInt(valDev) , io : 2, value : 1-b };
        postData();
        pre_1 =b;
    }
    if(c!==pre_2){
        frame_post={device : parseInt(valDev) , io : 4, value : 1-c };
        postData();
        pre_2 =c;
    }
    if(d!==pre_3){
        frame_post={device : parseInt(valDev) , io : 5, value : 1-d };
        postData();
        pre_3 = d;
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

getData();
setInterval(choose, 1000);