"use strict"

// Call the dataTables jQuery plugin
var data=[
  {
      "name":       "Tiger Nixon",
      "position":   "System Architect",
      "salary":     "$3,120",
      "start_date": "2011/04/25",
      "office":     "Edinburgh",
      "extn":       "5421"
  },
  {
      "name":       "Garrett Winters",
      "position":   "Director",
      "salary":     "$5,300",
      "start_date": "2011/07/25",
      "office":     "Edinburgh",
      "extn":       "8422"
  },
  {
    "name":       "Garrett Winters",
    "position":   "Director",
    "salary":     "$5,300",
    "start_date": "2011/07/25",
    "office":     "home",
    "extn":       "8422"
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
        { data: 'position' },
        { data: 'salary' },
        { data: 'office' }
    ]
  });
});
