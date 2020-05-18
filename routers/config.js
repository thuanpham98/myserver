"use strict"
/** module express */
var express = require('express');
var router = express.Router();

/** module timestamp */
var timestamp = require('../models/timestamp');
router.use(timestamp);

/* modal  managedev */
var ManageDev =require('../models/manageDev');

router.get('/',function(req,res){
    res.render('config', { title: "Config Page" });
});



/* export user/GUI */ 
module.exports = router