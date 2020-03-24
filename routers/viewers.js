var express = require('express');
var router = express.Router();

/* modal timestamp */
var timestamp = require('../models/timestamp');
router.use(timestamp);

router.get('/', function(req, res) {
    res.send("this is viewer page, FIxing");
});

/** export viewer */
module.exports = router