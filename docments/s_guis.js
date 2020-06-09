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
var CommandOnoff =require('../models/commandOnoff');
/* modules  check error */
var assert = require('assert');

/* module JWT */
var jwt = require('jsonwebtoken');

/////////////////////////////////////////////////////////////////
var dataPWM0=0,dataPWM1=0,dataDAC0=0,dataDAC1=0;
var temp_gui= {
                "dataPWM0" : dataPWM0,"dataPWM1" : dataPWM1,
                "dataDAC0" : dataDAC0,"dataDAC1" : dataDAC1,
            };

//////////////////////////////////////////////////////////////////////
/** Gui Page */
router.get('/', async function(req,res){

    let temp ;
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    await User.find({ email: decoded.accessToken }, async function(err, result) {
        assert.equal(null, err);
        let account = result[0];

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
            
        }
        res.render('guis',{title: 'GUI Page',
        "dataPWM0" : temp.dataPWM0,"dataPWM1" : temp.dataPWM1,
        "dataDAC0" : temp.dataDAC0,"dataDAC1" : temp.dataDAC1});
    });

    
});

/** database for GUI post  */
router.post('/postdata',async function(req,res){
    let account;
    console.log(req.body);

    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    
    let dev = parseInt(req.body.device);
    let io = parseInt(req.body.io);
    let val = parseInt(req.body.value);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, async function(err, result) {
        assert.equal(null, err);
        account = result[0];

        if(account!==undefined){
            let result= await Command.create({
        
                ID: account.timestamp,
                timestamp: new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE }),
                device:dev,
                io :io,
                value: val,
            });

            switch (io) {
                case 32:
                    dataPWM0 = val.toString();
                    break;
                
                case 33:
                    dataPWM1 = val.toString();
                    break;
        
                case 25:
                    dataDAC0 = val.toString();
                    break; 
        
                case 26:
                    dataDAC1 = val.toString();
                    break;    
            }
        
            /** history for command */
            temp_gui= {
                "dataPWM0" : dataPWM0,"dataPWM1" : dataPWM1,
                "dataDAC0" : dataDAC0,"dataDAC1" : dataDAC1
            };
            console.log(temp_gui);
            await CommandCurrent.create({
        
                ID: account.timestamp,
                timestamp: new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE }),
                device: dev,
                io : temp_gui,
            });
        }
        console.log("OK");
    });
    res.json({name:"thuan"});
});

//-----------------------------------------------------------------------------------------
var onoff={"s0":1,"s2":1,"s4":1,"s5":1,
        "s12":1,"s13":1,"s14":1,"s15":1,
        "s16":1,"s17":1,"s18":1,"s19":1,
        "s21":1,"s22":1,"s23":1,"s27":1
};
/**Living room */
router.get('/livingroom',function(req,res){
    res.render('guilivingroom',{title: 'living room',test : "checked"});
});
router.get('/livingroom/getdata',async function(req,res){

    let frame_send={"s0":1,"s2":1,"s4":1,"s5":1};
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    await User.find({ email: decoded.accessToken }, async function(err, result) {
        assert.equal(null, err);
        let account = result[0];

        if(account!==undefined){
            console.log("Start creat")
            let result= await CommandOnoff.find({ID: account.timestamp}).sort({ _id: -1 }).limit(1);
            if (!result.length) {
                console.log("no data");
                frame_send=null;
            }
            else{
                frame_send.s0=result[0].io.s0;
                frame_send.s2=result[0].io.s2;
                frame_send.s4=result[0].io.s4;
                frame_send.s5=result[0].io.s5;

                console.log(result[0].io.s0);
                console.log(frame_send);
            }
            res.json(frame_send);
        }
    });
});
router.post('/livingroom/postdata' ,async function(req,res){
    
    console.log(req.body);
    let account;
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    
    let devonoff='s'+req.body.io.toString();
    console.log(devonoff);

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
            onoff[devonoff] = val;
            console.log(onoff[devonoff]);
            await CommandOnoff.create({
                ID: account.timestamp,
                timestamp: new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE }),
                device:dev,
                io :onoff,
            })
        }
    });
    res.json("ok");
});
//----------------------------------------------------------------------------------

/**Bad room */
router.get('/badroom',function(req,res){
    res.render('guibadroom',{title: 'bad room'});
});
router.get('/badroom/getdata',async function(req,res){

    let frame_send={"s12":1,"s13":1,"s14":1,"s15":1};
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    await User.find({ email: decoded.accessToken }, async function(err, result) {
        assert.equal(null, err);
        let account = result[0];

        if(account!==undefined){
            console.log("Start creat")
            let result= await CommandOnoff.find({ID: account.timestamp}).sort({ _id: -1 }).limit(1);
            if (!result.length) {
                console.log("no data");
                frame_send=null;
            }
            else{
                frame_send.s12=result[0].io.s12;
                frame_send.s13=result[0].io.s13;
                frame_send.s14=result[0].io.s14;
                frame_send.s15=result[0].io.s15;
            }
            res.json(frame_send);
        }
    });
});
router.post('/badroom/postdata',async function(req,res){
    console.log(req.body);
    let account;
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    
    let devonoff='s'+req.body.io.toString();
    console.log(devonoff);

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
            onoff[devonoff] = val;
            console.log(onoff[devonoff]);
            await CommandOnoff.create({
                ID: account.timestamp,
                timestamp: new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE }),
                device:dev,
                io :onoff,
            })
        }
    });
    res.json("ok");
});
//-----------------------------------------------------------------------------------

/**Kitchen */
router.get('/kitchen',function(req,res){
    res.render('guikitchen',{title: 'Kitchen'});
});
router.get('/kitchen/getdata',async function(req,res){

    let frame_send={"s16":1,"s17":1,"s18":1,"s19":1};
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    await User.find({ email: decoded.accessToken }, async function(err, result) {
        assert.equal(null, err);
        let account = result[0];

        if(account!==undefined){
            console.log("Start creat")
            let result= await CommandOnoff.find({ID: account.timestamp}).sort({ _id: -1 }).limit(1);
            if (!result.length) {
                console.log("no data");
                frame_send=null;
            }
            else{
                frame_send.s16=result[0].io.s16;
                frame_send.s17=result[0].io.s17;
                frame_send.s18=result[0].io.s18;
                frame_send.s19=result[0].io.s19;
            }
            res.json(frame_send);
        }
    });
});
router.post('/kitchen/postdata',async function(req,res){
    console.log(req.body);
    let account;
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    
    let devonoff='s'+req.body.io.toString();
    console.log(devonoff);

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
            onoff[devonoff] = val;
            console.log(onoff[devonoff]);
            await CommandOnoff.create({
                ID: account.timestamp,
                timestamp: new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE }),
                device:dev,
                io :onoff,
            })
        }
    });
    res.json("ok");
});
//-----------------------------------------------------------------------------------

/**Bath room */
router.get('/bathroom',function(req,res){
    res.render('guibathroom',{title: 'bath room'});
});
router.get('/bathroom/getdata',async function(req,res){

    let frame_send={"s21":1,"s22":1};
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    await User.find({ email: decoded.accessToken }, async function(err, result) {
        assert.equal(null, err);
        let account = result[0];

        if(account!==undefined){
            console.log("Start creat")
            let result= await CommandOnoff.find({ID: account.timestamp}).sort({ _id: -1 }).limit(1);
            if (!result.length) {
                console.log("no data");
                frame_send=null;
            }
            else{
                frame_send.s21=result[0].io.s21;
                frame_send.s22=result[0].io.s22;
            }
            res.json(frame_send);
        }
    });
});
router.post('/bathroom/postdata',async function(req,res){
    console.log(req.body);
    let account;
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    
    let devonoff='s'+req.body.io.toString();
    console.log(devonoff);

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
            onoff[devonoff] = val;
            console.log(onoff[devonoff]);
            await CommandOnoff.create({
                ID: account.timestamp,
                timestamp: new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE }),
                device:dev,
                io :onoff,
            })
        }
    });
    res.json("ok");
});

/**Toilet */
router.get('/toilet',function(req,res){
    res.render('guitoilet',{title: 'toilet'});
});
router.get('/toilet/getdata',async function(req,res){

    let frame_send={"s23":1,"s27":1};
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    await User.find({ email: decoded.accessToken }, async function(err, result) {
        assert.equal(null, err);
        let account = result[0];

        if(account!==undefined){
            console.log("Start creat")
            let result= await CommandOnoff.find({ID: account.timestamp}).sort({ _id: -1 }).limit(1);
            if (!result.length) {
                console.log("no data");
                frame_send=null;
            }
            else{
                frame_send.s23=result[0].io.s23;
                frame_send.s27=result[0].io.s27;
            }
            res.json(frame_send);
        }
    });
});
router.post('/toilet/postdata',async function(req,res){
    console.log(req.body);
    let account;
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    
    let devonoff='s'+req.body.io.toString();
    console.log(devonoff);

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
            onoff[devonoff] = val;
            console.log(onoff[devonoff]);
            await CommandOnoff.create({
                ID: account.timestamp,
                timestamp: new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE }),
                device:dev,
                io :onoff,
            })
        }
    });
    res.json("ok");
});

/* export user/GUI */ 
module.exports = router