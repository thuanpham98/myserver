"use strict"

var frame,sub_frame=[],dev_index,dev_name,child_index,action;

async function postConfigEquipi_maskPort(){

    dev_index=document.getElementById("devID").innerHTML;
    dev_name= document.getElementById("devName").innerHTML;
    sub_frame=[];
    let num_equipi = document.getElementById("numEquipi").innerHTML;
    num_equipi=parseInt(num_equipi,10);
    console.log(num_equipi);
    let temp;
    for(let i = 0;i<num_equipi;i++){
        let id = 'mp' + i.toString();
        temp = document.getElementById(id).value;
        temp=temp.toString();
        console.log(temp);
        if(temp!==""){
            sub_frame.push({index : i, mask:temp});
        }
    }

    frame={dev : dev_index , mask : dev_name, child : sub_frame, action : 3};
    console.log(frame);
    let response = await fetch('https://iot-server-365.herokuapp.com/user/config/equipments',{
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
    window.alert("update name Sucess");
    
}

document.getElementById("updateMaskport").addEventListener("click", function(){
    postConfigEquipi_maskPort();
    console.log("press");
});