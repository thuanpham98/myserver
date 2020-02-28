//--add module--///
const express = require('express');
var cookieParser = require('cookie-parser')
var mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();

//----------- handler cookie from client------//
app.use(cookieParser());
//--------------use for post method----------------------------//
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//--- config direction of router--///
var index = require('./routers/index');
var user = require('./routers/users');
var viewer = require('./routers/viewers');
var creator = require('./routers/creators');
var login = require('./routers/login');
var register = require('./routers/register');
var test = require('./routers/test');

//--set view engine--//
app.set('view engine', 'pug');
app.set('views', './views'); // view folder if equaltion with app.js and public folder

//--use router and static--//
app.use(express.static('public'));
app.use('/', index);
app.use('/user', user);
app.use('/viewer', viewer);
app.use('/creator', creator);
app.use('/login', login);
app.use('/register', register);
app.use('/test', test);

//---- listen--///
app.listen(process.env.PORT, function() {
    console.log("server is opening and listening");
});