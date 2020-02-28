//----module make http server -----//
var express = require('express');
var router = express.Router();

//---timestamp module  if have a even happen---//
var timestamp = require('../models/timestamp');
router.use(timestamp);


//------------------------------------//
router.get('/', function(req, res) {
    res.render('test', { title: 'Test Page' })
});

router.post('/', function(req, res) {

});

//------export module-------//
module.exports = router