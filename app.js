const express = require('express');
const app = express();

myPort = 6969;

var index = require('./routers/index');
var users = require('./routers/users');


app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use('/', index);
app.use('/users', users);






app.listen(myPort, function() {
    console.log("listening");
});