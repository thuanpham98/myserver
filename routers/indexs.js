/** module express */
var express = require('express');
var router = express.Router();

/* modal timestamp */
var timestamp = require('../models/timestamp');
router.use(timestamp);

/* Home page */
router.get('/', function(req, res) {
    res.render('index', { title: 'Home Page' });
});

/* export home */
module.exports = router