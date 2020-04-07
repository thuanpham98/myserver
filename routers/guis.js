"use strict"
/** module express */
var express = require('express');
var router = express.Router();

/** module timestamp */
var timestamp = require('../models/timestamp');
router.use(timestamp);

/* module user */
var User = require('../models/user');

/* modules Data */
var Command = require('../models/command');
var CommandCurrent =require('../models/commandCurrent');

/* modules  check error */
var assert = require('assert');

/* module JWT */
var jwt = require('jsonwebtoken');

/////////////////////////////////////////////////////////////////
var dataPWM0=0,dataPWM1=0,dataDAC0=0,dataDAC1=0;
var temp_gui= {
                "dataPWM0" : dataPWM0,"dataPWM1" : dataPWM1,
                "dataDAC0" : dataDAC0,"dataDAC1" : dataDAC1
            };

//////////////////////////////////////////////////////////////////////
/** Method */
router.get('/', async function(req,res){

    let temp ;
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    await User.find({ email: decoded.accessToken }, async function(err, result) {
        assert.equal(null, err);
        account = result[0];

        if(account!==undefined){
            console.log("Start creat")
            let result= await CommandCurrent.find({ID: account.timestamp}).sort({ _id: -1 }).limit(1);
            if (!result.length) {
                console.log("no data");
                temp=temp_gui;
            }
            else{
                temp = result[0].io;
                console.log(temp);
                console.log(temp.dataPWM0);
            }
                ////////////////////////////////////
            res.render('guis',{title: 'GUI Page' ,  dataPWM0 : temp.dataPWM0, dataPWM1 : temp.dataPWM1,
                                                    dataDAC0 : temp.dataDAC0,dataDAC1 : temp.dataDAC1
            });
        }
    });
});

router.post('/',async function(req,res){

    let account;

    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    
    let dev = parseInt(req.body.device);
    let io = parseInt(req.body.io);
    let val = parseInt(req.body.value);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, async function(err, result) {
        assert.equal(null, err);
        account = result[0];

        if(account!==undefined){
            console.log("Start creat")
            let result= await Command.create({
        
                ID: account.timestamp,
                timestamp: new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE }),
                device:dev,
                io :io,
                value: val,
            });
       
            console.log("End create")

        }
    });

    switch (io) {
        case 32:
            dataPWM0 = val.toString();
            datacurrent=dataPWM0;
            break;
        
        case 33:
            dataPWM1 = val.toString();
            datacurrent=dataPWM1;
            break;

        case 25:
            dataDAC0 = val.toString();
            datacurrent=dataDAC0;
            break; 

        case 26:
            dataDAC1 = val.toString();
            datacurrent=dataDAC1;
            break;    
    }

    /** history for command */
    temp_gui= {
        "dataPWM0" : dataPWM0,"dataPWM1" : dataPWM1,
        "dataDAC0" : dataDAC0,"dataDAC1" : dataDAC1
    };
    console.log("Start creat")
    result= await CommandCurrent.create({

        ID: account.timestamp,
        timestamp: new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE }),
        device: dev,
        io : temp_gui,
    });

    console.log("End create")

    res.render('guis',{title: 'GUI Page' ,
    /** Define DAC and PWM value here */
    dataPWM0 : dataPWM0, dataPWM1 : dataPWM1,
    dataDAC0 : dataDAC0,dataDAC1 : dataDAC1
    });

});

/**Living room */
router.get('/livingroom',function(req,res){
    res.render('guilivingroom',{title: 'living room'});
});
router.post('/livingroom',async function(req,res){
    let account;

    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    
    let dev = parseInt(req.body.device);
    let io = parseInt(req.body.io);
    let val = parseInt(req.body.value);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, async function(err, result) {
        assert.equal(null, err);
        account = result[0];

        if(account!==undefined){
            console.log("Start creat")
            let result= await Command.create({
        
                ID: account.timestamp,
                timestamp: new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE }),
                device:dev,
                io :io,
                value: val,
            });
       
            console.log("End create")

        }
    });
    res.render('guilivingroom',{title: 'living room'});
});

/**Bad room */
router.get('/badroom',function(req,res){
    res.render('guibadroom',{title: 'bad room'});
});
router.post('/badroom',async function(req,res){
    let account;

    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    
    let dev = parseInt(req.body.device);
    let io = parseInt(req.body.io);
    let val = parseInt(req.body.value);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, async function(err, result) {
        assert.equal(null, err);
        account = result[0];

        if(account!==undefined){
            console.log("Start creat")
            let result= await Command.create({
        
                ID: account.timestamp,
                timestamp: new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE }),
                device:dev,
                io :io,
                value: val,
            });
       
            console.log("End create")

        }
    });
    res.render('guibadroom',{title: 'bad room'});
});

/**Kitchen */
router.get('/kitchen',function(req,res){
    res.render('guikitchen',{title: 'kitchen'});
});
router.post('/kitchen',async function(req,res){
    let account;

    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    
    let dev = parseInt(req.body.device);
    let io = parseInt(req.body.io);
    let val = parseInt(req.body.value);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, async function(err, result) {
        assert.equal(null, err);
        account = result[0];

        if(account!==undefined){
            console.log("Start creat")
            let result= await Command.create({
        
                ID: account.timestamp,
                timestamp: new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE }),
                device:dev,
                io :io,
                value: val,
            });
       
            console.log("End create")

        }
    });
    res.render('guikitchen',{title: 'kitchen'});
});

/**Bath room */
router.get('/bathroom',function(req,res){
    res.render('guibathroom',{title: 'bath room'});
});
router.post('/bathroom',async function(req,res){
    let account;

    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    
    let dev = parseInt(req.body.device);
    let io = parseInt(req.body.io);
    let val = parseInt(req.body.value);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, async function(err, result) {
        assert.equal(null, err);
        account = result[0];

        if(account!==undefined){
            console.log("Start creat")
            let result= await Command.create({
        
                ID: account.timestamp,
                timestamp: new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE }),
                device:dev,
                io :io,
                value: val,
            });
       
            console.log("End create")

        }
    });
    res.render('guibathroom',{title: 'bath room'});
});

/**Toilet */
router.get('/toilet',function(req,res){
    res.render('guitoilet',{title: 'toilet'});
});
router.post('/toilet',async function(req,res){
    let account;

    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    
    let dev = parseInt(req.body.device);
    let io = parseInt(req.body.io);
    let val = parseInt(req.body.value);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, async function(err, result) {
        assert.equal(null, err);
        account = result[0];

        if(account!==undefined){
            console.log("Start creat")
            let result= await Command.create({
        
                ID: account.timestamp,
                timestamp: new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE }),
                device:dev,
                io :io,
                value: val,
            });
       
            console.log("End create")

        }
    });
    res.render('guitoilet',{title: 'toilet'});
});

/* export user/GUI */ 
module.exports = router