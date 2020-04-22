"use strict"
var mychart = document.getElementById("mychart").getContext('2d');
var mychart2 = document.getElementById("mychart2").getContext('2d');

function makeChart(){
    return  new Chart(mychart, {
        type:'line', 
        data:{
            labels: [],
            datasets:[{
                fill:false,
                label:"Temperature",
                data: [],
                backgroundColor:'#FC0000',
                borderColor:'#FC0000',
                borderWidth: 2,
                hidden: true
            },{
                fill:false,
                label:"Humidity",
                data: [],
                backgroundColor:'#1f78b4',
                borderColor:'#1f78b4',
                borderWidth: 2,
                hidden: true
            },{
                fill:false,
                label:"Humidity",
                data: [],
                backgroundColor:'#4dfd00',
                borderColor:'#4dfd00',
                borderWidth: 2,
                hidden: true
            },{
                fill:false,
                label:"Humidity",
                data: [],
                backgroundColor:'#220ffd',
                borderColor:'#220ffd',
                borderWidth: 2,
                hidden: true
            },{
                fill:false,
                label:"Humidity",
                data: [],
                backgroundColor:'#ff9dcb',
                borderColor:'#ff9dcb',
                borderWidth: 2,
                hidden: true
            },{
                fill:false,
                label:"Humidity",
                data: [],
                backgroundColor:'#f7e92d',
                borderColor:'#f7e92d',
                borderWidth: 2,
                hidden: true
            },{
                fill:false,
                label:"Humidity",
                data: [],
                backgroundColor:'#fa9041',
                borderColor:'#fa9041',
                borderWidth: 2,
                hidden: true
            },{
                fill:false,
                label:"Humidity",
                data: [],
                backgroundColor:'#050904',
                borderColor:'#050904',
                borderWidth: 2,
                hidden: true
            },{
                fill:false,
                label:"Humidity",
                data: [],
                backgroundColor:'#6d6f04',
                borderColor:'#6d6f04',
                borderWidth: 2,
                hidden: true
            },{
                fill:false,
                label:"Humidity",
                data: [],
                backgroundColor:'#a0522d',
                borderColor:'#a0522d',
                borderWidth: 2,
                hidden: true
            }
            ]
        },
        options:{
            showScale: false,
            responsive: true,
            maintainAspectRatio: false,
            animation:{duration:0},
            title:{
                display:true,
                text:'Chart flow time',
                fontSize:25
            },
            legend:{
                display:true,
                position:'right',
                labels:{
                    fontColor:'	#000000'
    
                }
            },
            layout:{
                padding:{
                    left:50,
                    right:0,
                    bottom:0,
                    top:0
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                            display: true,
                            labelString: 'Time',
                            fontSize : 24
                            
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
                            fontSize : 24
                    },
                    ticks: {
                        min: 0,
                        max: 100,
                  
                        // forces step size to be 5 units
                        stepSize: 1 // <----- This prop sets the stepSize
                    }
                }]
            },
            tooltips:{
                enabled:true
            }
        }
    });
} 
var massPopChart = makeChart();

var massPopChart2 = new Chart(mychart2, {
    type:'bar', 
    data:{
        labels: [],
        datasets:[{
            fill:false,
            label:"Temperature",
            data: [],
            backgroundColor:'#FC0000',
            borderColor:'#FC0000',
            borderWidth: 2,
            hidden: true
        },{
            fill:false,
            label:"Humidity",
            data: [],
            backgroundColor:'#1f78b4',
            borderColor:'#1f78b4',
            borderWidth: 2,
            hidden: true
        },{
            fill:false,
            label:"Humidity",
            data: [],
            backgroundColor:'#4dfd00',
            borderColor:'#4dfd00',
            borderWidth: 2,
            hidden: true
        },{
            fill:false,
            label:"Humidity",
            data: [],
            backgroundColor:'#220ffd',
            borderColor:'#220ffd',
            borderWidth: 2,
            hidden: true
        },{
            fill:false,
            label:"Humidity",
            data: [],
            backgroundColor:'#ff9dcb',
            borderColor:'#ff9dcb',
            borderWidth: 2,
            hidden: true
        },{
            fill:false,
            label:"Humidity",
            data: [],
            backgroundColor:'#f7e92d',
            borderColor:'#f7e92d',
            borderWidth: 2,
            hidden: true
        },{
            fill:false,
            label:"Humidity",
            data: [],
            backgroundColor:'#fa9041',
            borderColor:'#fa9041',
            borderWidth: 2,
            hidden: true
        },{
            fill:false,
            label:"Humidity",
            data: [],
            backgroundColor:'#050904',
            borderColor:'#050904',
            borderWidth: 2,
            hidden: true
        },{
            fill:false,
            label:"Humidity",
            data: [],
            backgroundColor:'#6d6f04',
            borderColor:'#6d6f04',
            borderWidth: 2,
            hidden: true
        },{
            fill:false,
            label:"Humidity",
            data: [],
            backgroundColor:'#a0522d',
            borderColor:'#a0522d',
            borderWidth: 2,
            hidden: true
        }
        ]
    },
    options:{
        responsive: true,
        maintainAspectRatio: false,
        animation:{duration:0},
        title:{
            display:true,
            text:'Chart flow time',
            fontSize:25
        },
        legend:{
            display:true,
            position:'right',
            labels:{
                fontColor:'	#000000'

            }
        },
        layout:{
            padding:{
                left:50,
                right:0,
                bottom:0,
                top:0
            }
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                        display: true,
                        labelString: 'Time',
                        fontSize : 24
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                        display: true,
                        labelString: 'Value (%)',
                        fontSize : 24
                },
                ticks: {
                    min: 0,
                    max: 100,
              
                    // forces step size to be 5 units
                    stepSize: 1 // <----- This prop sets the stepSize
                }
            }]
        },
        tooltips:{
            enabled:true
        }
    }
}); 
//--this post id drives the example data
var k=0;

async function getData(){
    let response= await fetch('https://iotmakerserver.herokuapp.com/user/display/getdata',{
        method: 'get',
        mode: 'cors',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    let datum= await response.json();
    //console.log(response);
    //console.log(datum);
    //datum =JSON.parse(datum);

    let i=0;
    massPopChart.data.labels.push(datum.label);
    massPopChart.data.datasets.forEach((dataset) => {
        dataset.data.push(datum.data[i]);
        i ++;
    });
    massPopChart.update();
    console.log(massPopChart.data.labels)

    i=0;
    massPopChart2.data.labels=[datum.label];
    massPopChart2.data.datasets.forEach((dataset) => {
        dataset.data=[datum.data[i]];
        i ++;
    });
    massPopChart2.update();
    k=k+1;
}
function removeData(){
    if(k===100){
        let j=0;

        massPopChart.clear();

        massPopChart.data.labels=[];
        massPopChart.data.datasets.forEach((dataset) => {
            dataset.data=[];
            j++;
        });
        massPopChart.update();
        k=0;
    }
}

setInterval(getData, 1000);
setInterval(removeData, 1000);