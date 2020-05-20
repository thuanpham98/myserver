"use strict"
/** module express */
var express = require('express');
var router = express.Router();

/** module timestamp */
var timestamp = require('../models/timestamp');
router.use(timestamp);

/* modal  managedev */
var ManageDev =require('../models/manageDev');

/** dev config */
router.get('/',function(req,res){
    res.render('config', { title: "Config Page" });
});

/** sensors config */
router.get('/sensors',function(req,res){
    let device =[{mask: "thuan", type : 0},{mask:"thao",type : 1}]
    res.render('sensors', { title: "Sensor Page" , dev: device});
});
router.get('/sensors/:id',function(req,res){
    res.json({id : req.params.id});
});

/** euipments config */
router.get('/equipments',function(req,res){
    let device =[{mask: "thuan", type : 0},{mask:"thao",type : 1}]
    res.render('equipments', { title: "Sensor Page" , dev: device});
})
router.get('/equipments/:id',function(req,res){
    let device =[{mask: "thuan", type : 0},{mask:"thao",type : 1}]
    res.json({id : req.params.id});
})



/* export user/GUI */ 
module.exports = router