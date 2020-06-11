"use strict"
var table;
var dataForm=[];
// Call the dataTables jQuery plugin

var dev;
var temp_mask = [];
var data_frame =  {
  "name": "temperature",
  "value": "23",
  "datetime": "2011/04/25"
};

// var store ={
//   retrieve: true,
  // dom: 'Bfrtip',
  // buttons: {
  //   buttons: [
  //     { extend: 'copy', className: 'copyButton' },
  //     { extend: 'excel', className: 'excelButton' },
  //     { extend: 'csv', className: 'csvButton' },
  //     { extend: 'pdf', className: 'pdfButton' },
  //     { extend: 'print', className: 'printButton' }
  //   ]
  // },
//   data: [],
  // columns: [
  //   { data: 'name' },
  //   { data: 'value' },
  //   { data: 'datetime' }
  // ]
// };

// $(document).ready(function () {
//   $('#dataTable').DataTable(store);
// });

// //----------------------------------------------------------------------------------------


// async function init_data_table() {

//   dev = document.getElementById("tables").value;

//   let response = await fetch('https://iot-server-365.herokuapp.com/user/display/getdata', {
//     method: "POST",
//     body: JSON.stringify({dev: dev}),
//     mode: "cors",
//     headers: { "Content-type": "application/json;charset=utf-8" }
//   });
//   let datum = await response.json();

//   if (datum.init == null) {
//     return;
//   }
//   console.log(datum.init);

//   let dataTable=new Array ( datum.init.length);
//   for (let i = 0; i < datum.init.length; i++) {
//     temp_mask.push(datum.init[i].mask);
//     data_frame.name=datum.init[i].mask;
//     dataTable[i]=data_frame;
//     $('#dataTable').dataTable().fnAddData(dataTable[i]); 
//   }

// }
// async function getData_table() {
//   $('#dataTable').dataTable().fnClearTable();
//     let response = await fetch('https://iot-server-365.herokuapp.com/user/display/getdata', {
//         method: 'get',
//         mode: 'cors',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json',
//             id:dev
//         }
//     });

//     let datum = await response.json();

//     if (datum === null) {
//       return;
//     }
//     console.log(datum.data);
//     let dataTable=new Array ( datum.data.length);
//     for (let i = 0; i < datum.data.length; i++) {
//       data_frame.name=temp_mask[i];
//       data_frame.value = datum.data[i].toString();
//       data_frame.datetime = datum.label;
//       dataTable[i]=data_frame;
//       $('#dataTable').dataTable().fnAddData(dataTable[i]);
//     }
// }

async function init_data_table() {

  dev = document.getElementById("tables").value;

  let response = await fetch('https://iot-server-365.herokuapp.com/user/display/getdata', {
    method: "POST",
    body: JSON.stringify({dev: dev}),
    mode: "cors",
    headers: { "Content-type": "application/json;charset=utf-8" }
  });
  let datum = await response.json();

  if (datum.init == null) {
    return;
  }
  console.log(datum.init);

  let data_Table=new Array ( datum.init.length);
  for (let i = 0; i < datum.init.length; i++) {
    temp_mask.push(datum.init[i].mask);
    data_frame.name=datum.init[i].mask;
    data_Table[i]=data_frame;
     
  }
  dataForm = data_Table;
  console.log(dataForm);

}

async function getData_table() {
  // $('#dataTable').dataTable().fnClearTable();
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

    if (datum === null) {
      return;
    }
    console.log(datum.data);

    for (let i = 0; i < datum.data.length; i++) {
      // data_frame.name=temp_mask[i];
      // data_frame.value = datum.data[i].toString();
      // data_frame.datetime = datum.label;
      // dataTable[i]=data_frame;
      dataForm[i].name= temp_mask[i];
      dataForm[i].value= datum.data[i].toString();
      dataForm[i].datetime = datum.label;
    }
    console.log(dataForm);
}

// document.getElementById("add_table").addEventListener("click", function () {
//   init_data_table();
//   getData_table();
// });

// document.getElementById("clear_table").addEventListener("click", function () {
//   $('#dataTable').dataTable().fnClearTable();
// });


async function initTable() {
  await init_data_table();
  await getData_table();

  console.log(dataForm);

  table=$('#dataTable').DataTable({
    "processing":true,
    retrieve: true,
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
    data : dataForm,
    columns: [
      { data: 'name' },
      { data: 'value' },
      { data: 'datetime' }
    ]
  });
};



$(document).ready(function () {
  initTable();
  $("#list-header").on({
    mouseenter: function () {
      $(this).css("background-color", "blue");
    },
    mouseleave: function () {
      $(this).css("background-color", "lightblue");
    },
  });
});


