"use strict"
var table;
var dataForm=[];
var dev;
var num,start,end;

async function getData_table() {
  dev = document.getElementById("tables").value;
  num =document.getElementById("number").value;
  console.log(num);
  if(num==""){
    num="1";
  }
  else if(isNaN(num)){
    return;
  }
  
  dataForm=[];
    let response = await fetch('https://iot-server-365.herokuapp.com/user/display/datatable', {
        method: 'get',
        mode: 'cors',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            id:dev,
            num :num,
            start : start,
            end : end
        }
    });

    let datum = await response.json();

    if (datum === null) {
      return;
    }
    console.log(datum.data);

    for (let i = 0; i < datum.data.length; i++) {
      for(let j =0 ; j < datum.data[i].mask.length;j++){
        let data_frame={
          "name": datum.data[i].mask[j],
          "value": datum.data[i].value[j],
          "datetime": datum.data[i].time
        };
        dataForm.push(data_frame);
      }
      
    }
    console.log(dataForm);
}

document.getElementById("add_table").addEventListener("click", async function () {
  // let ret = await $('#dataTable').dataTable().fnClearTable();
  await table.clear().draw();
  await table.destroy();

  await initTable();
});


document.getElementById("add_table_time").addEventListener("click", async function () {
  // let ret = await $('#dataTable').dataTable().fnClearTable();
  // await table.clear().draw();
  // await table.destroy();

  // await initTable();

  let st_date = new Date($('#std').val());
  let mytest =st_date.getTime()/1000;
  let day = st_date.getUTCDate();
  let month = st_date.getUTCMonth();
  let year = st_date.getUTCFullYear();
  let hour = (st_date.getUTCHours());
  let minute = st_date.getUTCMinutes();

  let sub_start=new Date( Date.UTC(year,month,day,hour,minute,'0'));

  start=sub_start.getTime()/1000;
  alert(start);
  console.log(mytest);
});


async function initTable() {

  await getData_table();

  table= await $('#dataTable').DataTable({
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

$(document).ready(async function () {
  await initTable();
  $("#list-header").on({
    mouseenter: function () {
      $(this).css("background-color", "blue");
    },
    mouseleave: function () {
      $(this).css("background-color", "lightblue");
    },
  });
});


