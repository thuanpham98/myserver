"use strict"

var frame,sub_frame=[],dev_index,dev_name,child_index,child_mask,action;

async function postConfigSensi_mask(){

    dev_index=document.getElementById("devID").innerHTML;
    dev_name= document.getElementById("devName").innerHTML;
    sub_frame=[];
    let num_sensi = document.getElementById("numSensi").innerHTML;
    num_sensi=parseInt(num_sensi,10);
    console.log(num_sensi);
    let temp;
    for(let i = 0;i<num_sensi;i++){
        let id = 'm' + i.toString();
        temp = document.getElementById(id).value;
        temp=temp.toString();
        console.log(temp);
        if(temp!==""){
            sub_frame.push({index : i, mask:temp});
        }
    }

    frame={dev : dev_index , mask : dev_name, child : sub_frame, action : 2};
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
    // let url = "/user/config/sensors/" +dev_index.toString();
    // window.location.replace(url);
    window.alert(datum);
    
}

document.getElementById("updateMask").addEventListener("click", function(){
    postConfigSensi_mask();
    console.log("press");
});