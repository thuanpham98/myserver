"use strict"
/** module express */
var express = require('express');
var router = express.Router();

/** module timestamp */
var timestamp = require('../models/timestamp');
router.use(timestamp);

/** /forgetpass */
router.get('/', function(req,res){
    res.render('forgetpass', {title: 'Help Page'});
});
router.post('/', function(req,res){
    
});
router.get('/verify', function(req,res){
    res.render('verify', {title: 'Verify Page'});
});
router.post('/', function(req,res){
    
});
/* export login */
module.exports = router