"use strict"
var express = require('express');
var router = express.Router();

//---timestamp module  if have a even happen---//
var timestamp = require('../models/timestamp');
router.use(timestamp);

// modal Data---//
var Data = require('../models/data');

//---module  user---//
var User = require('../models/user');

//---module  check error ---//
var assert = require('assert');

//--module JWT --//
var jwt = require('jsonwebtoken');

//-------------display----------//
router.get('/', async function(req, res) {
    
    res.render('charts',{title :"Display Page"});

});
router.get('/getdata', async function(req, res) {
   

    let account;
    let data;
    //console.log(req.body);
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    //check token on database--//
    await User.find({ email: decoded.accessToken }, async function(err, result) {
        assert.equal(null, err);
        account = result[0];

        if((account!==undefined) && (account!=="no data")){
            if(req.body.message=="init"){
                let resAPI={data :account.sensors};
                res.json(resAPI);
            }
            else {
                await Data.find({ ID: account.timestamp, device : 1}, function(err, result) {
                    assert.equal(null, err);
    
                    let m_sensor= account.sensors;
    
                    //console.log(result);
                    if (!result.length) {
                        console.log("no data");
    
                        let m_data=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                        let m_label= new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE });
                        
                        let resAPI={label: m_label,data: m_data};
                        //resAPI=JSON.stringify(resAPI);
                        res.json(resAPI);
                    }
                    else
                    {
                        data=result;
                        let m_label=data[0].timestamp;
                        let m_data=[data[0].form.sensor_1.toFixed(2),data[0].form.sensor_2.toFixed(2),
                                    data[0].form.sensor_3.toFixed(2),data[0].form.sensor_4.toFixed(2),
                                    data[0].form.sensor_5.toFixed(2),data[0].form.sensor_6.toFixed(2),
                                    data[0].form.sensor_7.toFixed(2),data[0].form.sensor_8.toFixed(2),
                                    data[0].form.sensor_9.toFixed(2),data[0].form.sensor_10.toFixed(2),
                                    data[0].form.sensor_11.toFixed(2),data[0].form.sensor_12.toFixed(2),
                                    data[0].form.sensor_13.toFixed(2),data[0].form.sensor_14.toFixed(2),
                                    data[0].form.sensor_15.toFixed(2),data[0].form.sensor_16.toFixed(2),
                                    data[0].form.sensor_17.toFixed(2),data[0].form.sensor_18.toFixed(2),
                                    data[0].form.sensor_19.toFixed(2),data[0].form.sensor_20.toFixed(2)
                                ];
                        let resAPI={label: m_label,data: m_data};
                        //console.log(resAPI);
                        //resAPI=JSON.stringify(resAPI);
                        //console.log(resAPI);
                        res.json(resAPI);
                    }
                }).sort({ _id: -1 }).limit(1);
            }
            
        }
        else{
            console.log("no data");
            res.send(null);
        }
    });

});

//----export----/
module.exports = router