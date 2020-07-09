"use strict"

var table;
var dataForm=[];
var dev;
var num,start,end;

async function getData_table() {

  dev = document.getElementById("tables").value;
  num =document.getElementById("number").value;
  console.log(num);
  if((!isNaN(start))&&(!isNaN(end))&&(start>0)&&(end>0)&&(start>end)){
    num='0';
    start=start.toString();
    end=end.toString();
  }
  else{
    if(num==""){
      num="1";
      start=0;
      end=0;
      start=start.toString();
      end=end.toString();
    }
    else if(isNaN(num)){
      return;
    }
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
  start=0;
  end=0;
  await initTable();
});


document.getElementById("add_table_time").addEventListener("click", async function () {
  // let ret = await $('#dataTable').dataTable().fnClearTable();
  await table.clear().draw();
  await table.destroy();

  dev = document.getElementById("tables").value;

  let st_date = new Date($('#std').val());
  let st_day = st_date.getUTCDate();
  let st_month = st_date.getUTCMonth();
  let st_year = st_date.getUTCFullYear();
  let st_hour = (st_date.getUTCHours());
  let st_minute = st_date.getUTCMinutes();

  let sub_start=new Date( Date.UTC(st_year,st_month,st_day,st_hour,st_minute,'0'));
  start=sub_start.getTime()/1000;
  console.log(start);

  let en_date = new Date($('#end').val());
  let en_day = en_date.getUTCDate();
  let en_month = en_date.getUTCMonth();
  let en_year = en_date.getUTCFullYear();
  let en_hour = (en_date.getUTCHours());
  let en_minute = en_date.getUTCMinutes();
 

  let sub_end=new Date( Date.UTC(en_year,en_month,en_day,en_hour,en_minute,'0'));
  end=sub_end.getTime()/1000;
  console.log(end);

  if((!isNaN(start)) || (!isNaN(end))){
    return;
  }
  else{
    num=0;
    await initTable();
  }

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


