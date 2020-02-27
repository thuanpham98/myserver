var express = require('express');
var router = express.Router();

//---timestamp module  if have a even happen---//
var timestamp = require('../models/timestamp');
router.use(timestamp);



router.get('/', function(req, res) {
    res.send("this is viewer page, FIxing");
});


module.exports = router