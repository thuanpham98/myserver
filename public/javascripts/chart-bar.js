"use strict"

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var temp_index_bar = [];
var temp_dataset_bar = [];
var temp_color_bar = ['#FC0000', '#1f78b4', '#4dfd00', '#220ffd', '#ff9dcb', '#f7e92d', '#fa9041', '#050904', '#6d6f04', '#a0522d', '#FC0000', '#1f78b4', '#4dfd00', '#220ffd', '#ff9dcb', '#f7e92d', '#fa9041', '#050904', '#6d6f04', '#a0522d'];

var barchart ;
var massbarChart ;

/** init data for bar chart from server */
async function init_data_bar() {

    temp_index_bar = [];
    temp_dataset_bar = [];
    barchart="" ;
    massbarChart={} ;
    dev=document.getElementById("charts").value;
    let mess = { dev: dev };
    mess = JSON.stringify(mess);
    console.log(mess);

    let response = await fetch('https://iot-server-365.herokuapp.com/user/display/getdata', {
        method: "POST",
        body: mess,
        mode: "cors",
        headers: { "Content-type": "application/json;charset=utf-8" }
    });
    let datum = await response.json();
    if(datum.init==null){
        return;
    }
    console.log(datum.init);

    for (let i = 0; i < datum.init.length; i++) {
        if (!datum.init[i].type) {
            temp_dataset_bar.push({
                fill: false,
                label: datum.init[i].mask,
                data: [],
                backgroundColor: temp_color_bar[i],
                borderColor: temp_color_bar[i],
                borderWidth: 2,
                hidden: true
            });
            temp_index_bar.push(i);
        }
    }

    barchart = document.getElementById("myBarChart").getContext('2d');

    massbarChart = new Chart(barchart, {
        type: 'bar',
        data: {
            labels: [],
            datasets: temp_dataset_bar
        },
        options: {
            showScale: true,
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 0 },
            //   title:{
            //       display:true,
            //       text:'Chart flow time',
            //       fontSize:25
            //   },
            legend: {
                display: true,
                position: 'right',
                labels: {
                    fontColor: '#000000'
    
                }
            },
            // layout: {
            //     padding: {
            //         left: 50,
            //         right: 0,
            //         bottom: 0,
            //         top: 0
            //     }
            // },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Time',
                        fontSize: 24
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
}

// var barchart = document.getElementById("myBarChart").getContext('2d');

// var massbarChart = new Chart(barchart, {
//     type: 'bar',
//     data: {
//         labels: [],
//         datasets: temp_dataset_bar
//     },
//     options: {
//         showScale: false,
//         responsive: true,
//         maintainAspectRatio: false,
//         animation: { duration: 0 },
//         //   title:{
//         //       display:true,
//         //       text:'Chart flow time',
//         //       fontSize:25
//         //   },
//         legend: {
//             display: true,
//             position: 'right',
//             labels: {
//                 fontColor: '#000000'

//             }
//         },
//         // layout: {
//         //     padding: {
//         //         left: 50,
//         //         right: 0,
//         //         bottom: 0,
//         //         top: 0
//         //     }
//         // },
//         scales: {
//             xAxes: [{
//                 display: true,
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Time',
//                     fontSize: 24
//                 }
//             }],
//             yAxes: [{
//                 display: true,
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Value (%)',
//                     fontSize: 24
//                 },
//                 ticks: {
//                     min: 0,
//                     max: 100,

//                     // forces step size to be 5 units
//                     stepSize: 1 // <----- This prop sets the stepSize
//                 }
//             }]
//         },
//         tooltips: {
//             enabled: true
//         }
//     }
// });

async function getData_bar() {
    if(start==0){
        return;
    }
    let response = await fetch('https://iot-server-365.herokuapp.com/user/display/getdata', {
        method: 'get',
        mode: 'cors',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            id:dev
        }
    });

    let datum = await response.json();
    console.log(datum.data);

    let i = 0;
    massbarChart.data.labels=[];
    massbarChart.data.labels.push(datum.label);
    massbarChart.data.datasets.forEach((dataset) => {
        dataset.data = [datum.data[temp_index_bar[i]]];
        i++;
    });
    massbarChart.update();
}



