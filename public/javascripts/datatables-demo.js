"use strict"

// Call the dataTables jQuery plugin
var data = [
  {
    "name": "temperature",
    "value": "23",
    "datetime": "2011/04/25",
    "extn": "5421"
  },
  {
    "name": "humanality",
    "value": "12",
    "datetime": "2011/07/25",
    "extn": "8422"
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
