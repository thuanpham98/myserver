"use strict"

var frame_post,frame_get={"s16":1,"s17":1,"s18":1,"s19":1};
var pre_0,pre_1,pre_2,pre_3;
var a,b,c,d;
async function getData(){
    let response= await fetch('http://iotmakerserver.herokuapp.com/user/GUI/kitchen/getdata',{
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

    pre_0 = 1-frame_get.s16;
    pre_1 = 1-frame_get.s17;
    pre_2 = 1-frame_get.s18;
    pre_3 = 1-frame_get.s19;

    document.getElementById("s16").checked=Boolean(1-frame_get.s16);
    document.getElementById("s17").checked=Boolean(1-frame_get.s17);
    document.getElementById("s18").checked=Boolean(1-frame_get.s18);
    document.getElementById("s19").checked=Boolean(1-frame_get.s19);

    a = 1-frame_get.s16;
    b = 1-frame_get.s17;
    c = 1-frame_get.s18;
    d = 1-frame_get.s19;
}

async function postData(){
    let response = await fetch('http://iotmakerserver.herokuapp.com/user/GUI/kitchen/postdata',{
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
    
    a=document.getElementById("s16").checked;
    b=document.getElementById("s17").checked;
    c=document.getElementById("s18").checked;
    d=document.getElementById("s19").checked;

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
        frame_post={device : parseInt(valDev) , io : 16, value : 1-a };
        postData();
        pre_0 =a;
    }
    if(b!==pre_1){
        frame_post={device : parseInt(valDev) , io : 17, value : 1-b };
        postData();
        pre_1 =b;
    }
    if(c!==pre_2){
        frame_post={device : parseInt(valDev) , io : 18, value : 1-c };
        postData();
        pre_2 =c;
    }
    if(d!==pre_3){
        frame_post={device : parseInt(valDev) , io : 19, value : 1-d };
        postData();
        pre_3 = d;
    }
}

getData();
setInterval(choose, 1000);