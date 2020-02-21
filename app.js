const express = require('express');
const app = express();

myPort = 6969;

var index = require('./routers/index');
var router = require('./routers/users');


app.use(express.static('public'));
app.use('/', index);
app.use('/users', router);






app.listen(myPort, function() {
    console.log("listening");
});