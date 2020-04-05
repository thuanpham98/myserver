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
var dataPWM0=0,dataPWM1=0,dataPWM2=0,dataPWM3=0,dataDAC0=0,dataDAC1=0;
var temp_gui= {
                "dataPWM0" : dataPWM0,"dataPWM1" : dataPWM1,"dataPWM2" : dataPWM2,"dataPWM3" : dataPWM3,
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
            res.render('guis',{title: 'GUI Page' ,  dataPWM0 : temp.dataPWM0, dataPWM1 : temp.dataPWM1,dataPWM2 : temp.dataPWM2,
                                                    dataPWM3 : temp.dataPWM3, dataDAC0 : temp.dataDAC0,dataDAC1 : temp.dataDAC1
            });
        }
    });
});

router.post('/',async function(req,res){

    console.log(req.body);
    console.log(req.cookies.access_token);

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
        case 34:
            dataPWM0 = val.toString();
            datacurrent=dataPWM0;
            break;
        
        case 35:
            dataPWM1 = val.toString();
            datacurrent=dataPWM1;
            break;

        case 36:
            dataPWM2 = val.toString();
            datacurrent=dataPWM2;
            break;  

        case 39:
            dataPWM3 = val.toString();
            datacurrent=dataPWM3
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
        "dataPWM0" : dataPWM0,"dataPWM1" : dataPWM1,"dataPWM2" : dataPWM2,"dataPWM3" : dataPWM3,
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

    /* define number device here */
    Dev_0 : "device 0",Dev_1 : "device 1",Dev_2 : "device 2",Dev_3 : "device 3",

    /** define pin out here */
    Pin_0 : "lam0",Pin_2 : "lam2",Pin_4 : "lam4",Pin_5 : "lam5",
    Pin_12: "lam12",Pin_13 : "lam13",Pin_14 : "lam14",Pin_15 : "lam15",
    Pin_16 : "lam16",Pin_17 : "lam17",
    Pin_18: "lam18",Pin_19 : "lam19",Pin_21 : "lam21",Pin_22 : "lam22",
    Pin_23 : "lam23",Pin_27 : "lam27",Pin_32 : "lam32",Pin_33 : "lam33",
    
    /** Define DAC and PWM value here */

    dataPWM0 : dataPWM0, dataPWM1 : dataPWM1,dataPWM2 : dataPWM2,
    dataPWM3 : dataPWM3,dataDAC0 : dataDAC0,dataDAC1 : dataDAC1
    });

});

router.get('/livingroom',function(req,res){
    res.render('guisLivingRoom',{title: 'GUI Page'});
});

/* export user/GUI */ 
module.exports = router