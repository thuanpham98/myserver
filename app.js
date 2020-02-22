//--add module--///
const express = require('express');
const app = express();

//--config port--///
myPort = 6969;

//--- config direction of router--///
var index = require('./routers/index');
var user = require('./routers/users');
var viewer = require('./routers/viewers');
var creator = require('./routers/creators');


//--set view engine--//
app.set('view engine', 'pug');
app.set('views', './views'); // view folder if equaltion with app.js and public folder

//--use router and static--//
app.use(express.static('public'));
app.use('/', index);
app.use('/user', user);
app.use('/viewer', viewer);
app.use('/creator', creator);



//---- listen--///
app.listen(myPort, function() {
    console.log("listening");
});