var dev;
var start=0; /** khong cho auto chay */
init_data_bar();
init_data_line();
start=1;
getData_line();
getData_bar();
getData_line();
getData_bar();
getData_line();
getData_bar();
getData_line();
getData_bar();
getData_line();
getData_bar();
getData_line();
getData_bar();
start=0;
document.getElementById("choosen").addEventListener("click", function(){
    // console.log("button");
    start=0;
    init_data_bar();
    init_data_line();
    start=1;
});
setInterval(getData_line, 1000);
setInterval(getData_bar, 1000);
setInterval(removeData, 5000);