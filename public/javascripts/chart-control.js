var dev;
var start=0;
document.getElementById("choosen").addEventListener("click", function(){
    console.log("button");
    temp_index_line=[];
    temp_dataset_line = [];
    temp_index_bar = [];
    temp_dataset_bar = [];

    init_data_bar();
    init_data_line();
    start=1;


});
setInterval(getData_line, 1000);
setInterval(getData_bar, 1000);
setInterval(removeData, 5000);