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

/* modules  check error */
var assert = require('assert');

/* module JWT */
var jwt = require('jsonwebtoken');

/** Method */
router.get('/',function(req,res){

    res.render('GUI',{title: 'GUI Page' ,

    /* define number device here */
    Dev_0 : "device 0",Dev_1 : "device 1",Dev_2 : "device 2",Dev_3 : "device 3",

    /** define pin out here */
    Pin_0 : "lam0",Pin_2 : "lam2",Pin_4 : "lam4",Pin_5 : "lam5",
    Pin_12: "lam12",Pin_13 : "lam13",Pin_14 : "lam14",Pin_15 : "lam15",
    Pin_18: "lam18",Pin_19 : "lam19",Pin_21 : "lam21",Pin_22 : "lam22",
    Pin_23 : "lam23",Pin_27 : "lam27",Pin_32 : "lam32",Pin_33 : "lam33",
    
    /** Define DAC channel here */
    channel_1 : "dac1", channel_2: "dac2"

    /** Define pwm channel here */

    });
});

router.post('/',async function(req,res){

    console.log(req.body);
    console.log(req.cookies.access_token);

    let account;

    var decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, function(err, result) {
        assert.equal(null, err);
        account = result[0];
    });
    console.log(account.timestamp);

    let dev = parseInt(req.body.device);
    let io = parseInt(req.body.io);
    let val = parseInt(req.body.value);

    console.log("Start creat")
    await Command.create({

        ID: account.timestamp,
        timestamp: Date.now(),
        device:dev,
        io :io,
        value: val,
    }, function(err, result) {
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(result);
    });
    console.log("End create")

    res.redirect('/user/GUI');

});

/* export user/GUI */ 
module.exports = router