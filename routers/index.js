//----module make http server -----//
var express = require('express');
var router = express.Router();

//---timestamp module  if have a even happen---//
var timestamp = require('../models/timestamp');
router.use(timestamp);

//----Home page ---///
router.get('/', function(req, res) {
    res.render('index', { title: 'Home Page' });
});

//------export module-------//
module.exports = router