"use strict"
var mychart = document.getElementById("mychart").getContext('2d');
var mychart2 = document.getElementById("mychart2").getContext('2d');

var massPopChart = new Chart(mychart, {
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
                        fontSize: 30
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                        display: true,
                        labelString: 'Value (%)',
                        fontSize: 30
                }
            }]
        },
        tooltips:{
            enabled:true
        }
    }
}); 

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
                        fontSize: 30
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                        display: true,
                        labelString: 'Value (%)',
                        fontSize: 30
                }
            }]
        },
        tooltips:{
            enabled:true
        }
    }
}); 
//--this post id drives the example data
async function getData(){
    var response= await fetch('https://iotmakerserver.herokuapp.com/user/display/getdata');
    var datum= await response.text();
    datum =JSON.parse(datum);

    let i=0;
    massPopChart.data.labels.push(datum.label);
    massPopChart.data.datasets.forEach((dataset) => {
        dataset.data.push(datum.data[i]);
        i ++;
    });
    massPopChart.update();

    i=0;
    massPopChart2.data.labels=[datum.label];
    massPopChart2.data.datasets.forEach((dataset) => {
        dataset.data=[datum.data[i]];
        i ++;
    });
    massPopChart2.update();
}
setInterval(getData, 2000);