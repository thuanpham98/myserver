/* module we need */
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser')
var mongoose = require('mongoose');
require('dotenv').config();


/* connect to mongodb server */
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

/* use promise global */
mongoose.Promise = global.Promise;

/* db represent a connection */
var db = mongoose.connection;

/* bind event error to console error */
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* auth module */
Auth = require('./middlewares/auth.middleware');

/* handler cookie from client */
app.use(cookieParser());

/* config method parse with json and url */
app.use(express.json()); /*!> for parsing application/json */
app.use(express.urlencoded({ extended: true })); /*!> for parsing application/x-www-form-urlencoded */

/* config direction of router */
var index = require('./routers/indexs');
var user = require('./routers/users');
var storage = require('./routers/storages');
var login = require('./routers/logins');
var register = require('./routers/registers');
var test = require('./routers/test');
var display = require('./routers/displays')
var gui = require('./routers/guis')

/* set view engine */
app.set('view engine', 'pug');
app.set('views', './views'); /*!> view folder if equaltion with app.js and public folder */

/* declare router */
app.use(express.static('public'));
app.use('/', index);
app.use('/storage', storage);
app.use('/login', login);
app.use('/register', register);
app.use('/test', test);
app.use('/user', Auth.requireAuth, user);
app.use('/user/display',display);
app.use('/user/gui',gui);

/* server listen */
app.listen(process.env.PORT || 6969, function() {
    console.log("Server is listening");
});
