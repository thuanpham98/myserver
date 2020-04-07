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

    res.render('display',{title :"Display Page"});

});
router.get('/getdata', async function(req, res) {
   
    let account;
    let data;

    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    //check token on database--//
    await User.find({ email: decoded.accessToken }, async function(err, result) {
        assert.equal(null, err);
        account = result[0];

        if((account!==undefined) && (account!=="no data")){
            await Data.find({ ID: account.timestamp}, function(err, result) {
                assert.equal(null, err);
                if (!result.length) {
                    console.log("no data");

                    let m_data=[0,0,0,0,0,0,0,0,0,0];
                    let m_label= new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE });
                    
                    respp={label: m_label,data: m_data};
                    respp=JSON.stringify(respp);
                    res.send(respp);
                }
                else 
                {
                    data=result;
                    let m_label=data[0].timestamp;
                    let m_data=[data[0].form.sensor_1.toFixed(2),data[0].form.sensor_2.toFixed(2),
                                data[0].form.sensor_3.toFixed(2),data[0].form.sensor_4.toFixed(2),
                                data[0].form.sensor_5.toFixed(2),data[0].form.sensor_6.toFixed(2),
                                data[0].form.sensor_7.toFixed(2),data[0].form.sensor_8.toFixed(2),
                                data[0].form.sensor_9.toFixed(2),data[0].form.sensor_10.toFixed(2)
                            ];

                    respp={label: m_label,data: m_data};
                    respp=JSON.stringify(respp);
                    res.send(respp);
                }
                
            }).sort({ _id: -1 }).limit(1);
        }
    });

});

//----export----/
module.exports = router