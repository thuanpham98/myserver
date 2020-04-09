"use strict"
var a= document.getElementById('duty');

async function getData(){
    let response= await fetch('https://iotmakerserver.herokuapp.com/user/display/getdata',{
        method: 'get',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

}
setInterval(getData, 1000);