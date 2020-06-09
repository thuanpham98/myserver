"use strict"
var express = require('express');
var router = express.Router();

//---timestamp module  if have a even happen---//
var timestamp = require('../models/timestamp');
router.use(timestamp);

// modal Data---//
var Data = require('../models/data');

/* modal  managedev */
var ManageDev = require('../models/manageDev');

//---module  user---//
var User = require('../models/user');

//---module  check error ---//
var assert = require('assert');

//--module JWT --//
var jwt = require('jsonwebtoken');

//-------------display----------//
router.get('/', async function (req, res) {
    let account, device, devices = [];
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, function (err, result) {
        assert.equal(null, err);
        account = result;

        if (!account.length) {
            res.json("no user");
            return;
        }
    });
    await ManageDev.find({ ID: account[0].timestamp, type: 1 }, function (errr, result) {
        device = result;
        console.log(device.length);
        if (device.length) {
            for (let i = 0; i < device.length; i++) {
                devices.push({ dev: device[i].dev, mask: device[i].mask });
                console.log(device[i].dev);
            }
            console.log(devices);
            res.render('charts', { title: "Display Page", devices: devices });
        }
        else {
            devices = [];
            res.render('charts', { title: "Display Page", devices: devices });
        }
    });


});
router.get('/getdata', async function (req, res) {

    let account;
    let data;
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    console.log(req.headers.id);
    //check token on database--//
    await User.find({ email: decoded.accessToken }, async function (err, doc) {
        // assert.equal(null, err);
        account = doc;

        if (account.length) {
            await Data.find({ ID: account[0].timestamp, device: parseInt(req.headers.id, 10) }, function (err, result) {
                if (result.length) {
                    data = result;
                    let m_label = data[0].datetime;
                    console.log(data[0].form);
                    let m_data = //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
                    [data[0].form.sensor_1, data[0].form.sensor_2,
                    data[0].form.sensor_3, data[0].form.sensor_4,
                    data[0].form.sensor_5, data[0].form.sensor_6,
                    data[0].form.sensor_7, data[0].form.sensor_8,
                    data[0].form.sensor_9, data[0].form.sensor_10,
                    data[0].form.sensor_11, data[0].form.sensor_12,
                    data[0].form.sensor_13, data[0].form.sensor_14,
                    data[0].form.sensor_15, data[0].form.sensor_16,
                    data[0].form.sensor_17, data[0].form.sensor_18,
                    data[0].form.sensor_19, data[0].form.sensor_20
                    ];
                    let resAPI = { label: m_label, data: m_data };
                    console.log(resAPI);
                    res.json(resAPI);

                }
                else {
                    let m_data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
                    let m_label = new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE });

                    let resAPI = { label: m_label, data: m_data };
                    res.json(resAPI);
                }
            }).sort({ _id: -1 }).limit(1);
        }

        else {
            let resAPI = { label: 0, data: [] };
            res.json(resAPI);
        }
    });

});

router.post('/getdata', async function (req, res) {

    let account, senonor = [];
    //console.log(req.body);
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    //check token on database--//
    await User.find({ email: decoded.accessToken }, async function (err, doc) {
        // assert.equal(null, err);
        account = doc;

        if (account.length) {
            await ManageDev.find({ ID: account[0].timestamp, dev: parseInt(req.body.dev, 10) }, function (err, result) {
                console.log(result);
                
                if ((result.length) && (result !== undefined)) {
                    let child = result[0].child;
                    for (let i = 0; i < child.length; i++) {
                        if (child[i].act) {
                            senonor.push({ type: child[i].type, mask: child[i].mask });
                        }

                    }
                    let resAPI = { init: senonor };
                    console.log(resAPI);
                    res.json(resAPI);
                }
                else {
                    res.json({ init: null });
                }
            });
        }
        else {
            res.send("who are you");
        }
    });


});

//----export----/
module.exports = router