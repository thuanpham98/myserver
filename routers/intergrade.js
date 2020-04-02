var express = require('express');
var router = express.Router();

//---timestamp module  if have a even happen---//
var timestamp = require('../models/timestamp');
router.use(timestamp);

router.get('/', async function(req, res) {

    res.send("hello");
});



//----export----/
module.exports = router