"use strict"

var frame_post,frame_get={"s23":1,"s27":1};
var pre_0,pre_1;
var a,b;
async function getData(){
    let response= await fetch('https://iotmakerserver.herokuapp.com/user/GUI/toilet/getdata',{
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

    pre_0 = 1-frame_get.s23;
    pre_1 = 1-frame_get.s27;

    document.getElementById("s23").checked=Boolean(1-frame_get.s23);
    document.getElementById("s27").checked=Boolean(1-frame_get.s27);

    a = 1-frame_get.s23;
    b = 1-frame_get.s27;

}

async function postData(){
    let response = await fetch('https://iotmakerserver.herokuapp.com/user/GUI/toilet/postdata',{
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
    
    a=document.getElementById("s23").checked;
    b=document.getElementById("s27").checked;

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
        frame_post={device : parseInt(valDev) , io : 23, value : 1-a };
        postData();
        pre_0 =a;
    }
    if(b!==pre_1){
        frame_post={device : parseInt(valDev) , io : 27, value : 1-b };
        postData();
        pre_1 =b;
    }
}

getData();
setInterval(choose, 1000);