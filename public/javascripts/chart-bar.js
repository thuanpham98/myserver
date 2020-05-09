"use strict"
// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var mychart = document.getElementById("myBarChart").getContext('2d');

var massPopChart = new Chart(mychart, {
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

async function getData(){
  let response= await fetch('https://iot-server-365.herokuapp.com/user/display/getdata',{
      method: 'get',
      mode: 'cors',
      headers:{
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      }
  });

  let datum= await response.json();
  let i=0;

  massPopChart.data.labels=[datum.label];
  massPopChart.data.datasets.forEach((dataset) => {
      dataset.data=[datum.data[i]];
      i ++;
  });
  massPopChart.update();
}

setInterval(getData, 1000);
