"use strict"

// Call the dataTables jQuery plugin

var temp_mask = [];
var data_frame={"name" : "thuan","value" : "22", "datetime": "1998/10/05","timestamp": "907567107"};
var dataTables = [];

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

  

  for (let i = 0; i < datum.init.length; i++) {
      temp_mask.push(datum.init[i].mask);
      data_frame.name=datum.init[i].mask;
      dataTables.push((data_frame));
  }
  console.log(dataTables);
}
init_data_table();

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
    data: dataTables,
    columns: [
      { dataTables: 'name' },
      { dataTables: 'value' },
      { dataTables: 'datetime' },
      { dataTables: 'timestamp' }
    ]
  });
});




// async function getData_table() {
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
// }

// setInterval(getData_table, 1000);