"use strict"

// Call the dataTables jQuery plugin

var temp_mask = [];
var data = [
  {
    "name": "temperature",
    "value": "23",
    "datetime": "2011/04/25",
    "timestamp": "5421"
  },
  {
    "name": "humanality",
    "value": "12",
    "datetime": "2011/07/25",
    "timestamp": "8422"
  },
  {
    "name": "báo cháy",
    "value": "123",
    "datetime": "2011/07/25",
    "timestamp": "8422"
  }
];

$(document).ready(function () {
  $('#dataTable').DataTable({
    dom: 'Bfrtip',
    buttons: {
      buttons: [
        { extend: 'copy', className: 'copyButton' },
        { extend: 'excel', className: 'excelButton' },
        { extend: 'csv', className: 'csvButton' },
        { extend: 'pdf', className: 'pdfButton' },
        { extend: 'print', className: 'printButton' }
      ]
    },
    data: data,
    columns: [
      { data: 'name' },
      { data: 'value' },
      { data: 'datetime' },
      { data: 'timestamp' }
    ]
  });
});

async function init_data_table() {
  let mess_table = { message: "init" };
  mess_table = JSON.stringify(mess_table);
  let response = await fetch('https://iot-server-365.herokuapp.com/user/display/getdata', {
    method: "POST",
    body: mess_table,
    mode: "cors",
    headers: { "Content-type": "application/json;charset=utf-8" }
  });
  let datum = await response.json();

  console.log(datum.init);

  for (let i = 0; i < datum.init.length; i++) {
      temp_mask.push(datum.init[i].mask);
  }
  console.log(temp_mask);
}
init_data_table();


// async function getData_bar() {
//     let response = await fetch('https://iot-server-365.herokuapp.com/user/display/getdata', {
//         method: 'get',
//         mode: 'cors',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//         }
//     });

//     let datum = await response.json();
//     console.log(datum.data);

//     let i = 0;
//     massbarChart.data.labels = [datum.label];
//     massbarChart.data.datasets.forEach((dataset) => {
//         dataset.data = [datum.data[temp_index_bar[i]]];
//         i++;
//     });
//     massbarChart.update();
// }

// setInterval(getData_bar, 1000);