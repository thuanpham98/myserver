"use strict"

var frame, block, mask, dev,num, act = -1;

async function postData() {

    block = document.getElementById("block").value;
    mask = document.getElementById("mask").value;
    dev = document.getElementById("dev").value;
    num = document.getElementById("num").value;

    block = block.toString();
    mask = mask.toString();
    dev = dev.toString();
    num = num.toString();

    if ((block !== "") && (!isNaN(block)) &&  (mask !== "") && (dev !== "") && (!isNaN(dev)) && (num !== "") && (!isNaN(num))) {
        frame = { block: block, mask: mask, dev: dev, num: num, act: act };
        console.log(frame);
        let response = await fetch('https://iot-server-365.herokuapp.com/user/gui', {
            method: 'post',
            mode: 'cors',
            headers: {
                //'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(frame)
        });

        let datum = await response.json();

        window.location.replace('/user/gui');
        window.alert(datum.name);
    }
    else {
        document.getElementById("status").innerHTML = "fill all the parameter";
    }
}

document.getElementById("addBlock").addEventListener("click", function () {
    act = 1;
    console.log(act);
    postData();
});
document.getElementById("removeBlock").addEventListener("click", function () {
    act = 0;
    console.log(act);
    postData();
});