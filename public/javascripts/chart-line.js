"use strict"
// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var temp_dataset = [];
var temp_color = ['#FC0000', '#1f78b4', '#4dfd00', '#220ffd', '#ff9dcb', '#f7e92d', '#fa9041', '#050904', '#6d6f04', '#a0522d','#FC0000', '#1f78b4', '#4dfd00', '#220ffd', '#ff9dcb', '#f7e92d', '#fa9041', '#050904', '#6d6f04', '#a0522d'];
async function init_data() {
    let mess = { message: "init" };
    mess = JSON.stringify(mess);
    let response = await fetch('https://iot-server-365.herokuapp.com/user/display/getdata', {
        method: "POST",
        body: mess,
        mode: "cors",
        headers: { "Content-type": "application/json;charset=utf-8" }
    });
    let datum = await response.json();

    console.log(datum.init);
    for (let i = 0; i < datum.init.length; i++) {
        if (datum.init[i].type)
            temp_dataset.push({
                fill: false,
                label: datum.init[i].mask,
                data: [],
                backgroundColor: temp_color[i],
                borderColor: temp_color[i],
                borderWidth: 2,
                hidden: true
            });
    }
}

init_data();

var mychart = document.getElementById("myLineChart").getContext('2d');
var massPopChart = new Chart(mychart, {
    type: 'line',
    data: {
        labels: [],
        datasets: temp_dataset
    },
    options: {
        // showScale: false,
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 0 },
        // title:{
        //     display:true,
        //     text:'Chart flow time',
        //     fontSize:25
        // },
        legend: {
            display: true,
            position: 'right',
            labels: {
                fontColor: '	#000000'

            }
        },
        layout: {
            padding: {
                left: 50,
                right: 0,
                bottom: 0,
                top: 0
            }
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time',
                    fontSize: 24

                },
                ticks: {
                    min: 0,
                    max: 10,

                    // forces step size to be 5 units
                    stepSize: 1 // <----- This prop sets the stepSize
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value (%)',
                    fontSize: 24
                },
                ticks: {
                    min: 0,
                    max: 100,

                    // forces step size to be 5 units
                    stepSize: 1 // <----- This prop sets the stepSize
                }
            }]
        },
        tooltips: {
            enabled: true
        }
    }
});

//--this post id drives the example data
var k = 0;

async function getData() {
    let response = await fetch('https://iot-server-365.herokuapp.com/user/display/getdata', {
        method: 'get',
        mode: 'cors',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    let datum = await response.json();
    //console.log(response);
    //console.log(datum);
    //datum =JSON.parse(datum);

    let i = 0;
    massPopChart.data.labels.push(datum.label);
    massPopChart.data.datasets.forEach((dataset) => {
        dataset.data.push(datum.data[i]);
        i++;
    });
    massPopChart.update();
    k = k + 1;
}
function removeData() {
    if (k >= 10) {
       //let j = 0;

        massPopChart.clear();

        massPopChart.data.labels = [];
        massPopChart.data.datasets.forEach((dataset) => {
            dataset.data = [];
            //j++;
        });
        massPopChart.update();
        k = 0;
    }
}

setInterval(getData, 1000);
setInterval(removeData, 5000);