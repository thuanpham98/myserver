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
        // console.log(device.length);
        if (device === undefined) {
            return;
        }
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
    let status_data = [];
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    console.log(req.headers.id);

    //check token on database--//
    await User.find({ email: decoded.accessToken }, async function (err, doc) {
        // assert.equal(null, err);
        account = doc;

        if (account.length) {
            await ManageDev.find({ ID: account[0].timestamp, dev: parseInt(req.headers.id, 10) }, function (err, result0) {

                if (result0 === undefined) {
                    return;
                }

                if ((result0.length) && (result0 !== undefined)) {
                    let child = result0[0].child;
                    for (let i = 0; i < child.length; i++) {
                        status_data.push(child[i].act);
                    }
                    console.log(status_data);
                }
                else {
                    res.json({ init: null });
                }
            });

            await Data.find({ ID: account[0].timestamp, device: parseInt(req.headers.id, 10) }, function (err, result) {

                if (result.length) {
                    data = result;

                    let data_ob = data[0].form[0];
                    let m_label = data[0].datetime;

                    let m_data_temp = Object.values(data_ob);
                    let m_data = [];
                    for (let i = 0; i < m_data_temp.length; i++) {
                        if (status_data[i]) {
                            m_data.push(m_data_temp[i]);
                        }
                    }
                    console.log(m_data);

                    let resAPI = { label: m_label, data: m_data };
                    console.log(resAPI);
                    res.json(resAPI);

                }
                else {
                    let m_data = [];
                    for (let i = 0; i < status_data.length; i++) {
                        if (status_data[i]) {
                            m_data.push(i + 1);
                        }
                    }
                    let m_label = new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE });

                    let resAPI = { label: m_label, data: m_data };
                    res.json(resAPI);
                }
            }).sort({ _id: -1 }).limit(1);
        }
        else {
            res.send("who are you");
            return;
        }
        /** choose data */
        // if (account.length) {
        //     await Data.find({ ID: account[0].timestamp, device: parseInt(req.headers.id, 10) }, function (err, result) {

        //         if (result.length) {
        //             data = result;

        //             let data_ob =data[0].form[0];
        //             let m_label = data[0].datetime;

        //             let m_data_temp = Object.values(data_ob);
        //             let m_data =[];
        //             for(let i = 0 ; i < m_data_temp.length; i++){
        //                 if(status_data[i]){
        //                     m_data.push(m_data_temp[i]);
        //                 }
        //             }
        //             console.log(m_data);

        //             let resAPI = { label: m_label, data: m_data };
        //             console.log(resAPI);
        //             res.json(resAPI);

        //         }
        //         else {
        //             let m_data =[];
        //             for(let i = 0 ; i < status_data.length; i++){
        //                 if(status_data[i]){
        //                     m_data.push(i+1);
        //                 }
        //             }
        //             let m_label = new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE });

        //             let resAPI = { label: m_label, data: m_data };
        //             res.json(resAPI);
        //         }
        //     }).sort({ _id: -1 }).limit(1);
        // }

        // else {
        //     let resAPI = { label: 0, data: [] };
        //     res.json(resAPI);
        // }
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

                if (result === undefined) {
                    return;
                }

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

router.get('/datatable', async function (req, res) {
    let account;
    let status_data = [];
    let mask_data = [];
    let num = req.headers.num;
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    console.log(req.headers.id);
    console.log(num);

    //check token on database--//
    await User.find({ email: decoded.accessToken }, async function (err, doc) {
        account = doc;
        if (account.length) {
            await ManageDev.find({ ID: account[0].timestamp, dev: parseInt(req.headers.id, 10) }, function (err, result0) {

                if (result0 === undefined) {
                    return;
                }

                if ((result0.length) && (result0 !== undefined)) {
                    let child = result0[0].child;
                    for (let i = 0; i < child.length; i++) {
                        status_data.push(child[i].act);
                        mask_data.push(child[i].mask);
                    }
                    console.log(mask_data);
                }
                else {
                    res.json(null);
                    return;
                }
            });

            await Data.find({ ID: account[0].timestamp, device: parseInt(req.headers.id, 10) }, function (err, result) {
                let data_res = [];
                if (result.length) {
                    for (let i = 0; i < result.length; i++) {

                        let data = result[i];
                        let dateTime = data.datetime;

                        let value_data_temp = Object.values(data.form[0]);
                        let value_data = [];
                        let mask_data_temp = [];
                        for (let i = 0; i < value_data_temp.length; i++) {
                            if (status_data[i]) {
                                value_data.push(value_data_temp[i]);
                                mask_data_temp.push(mask_data[i]);
                            }
                        }
                        console.log(mask_data_temp);

                        data_res.push({ time: dateTime, value: value_data, mask: mask_data_temp });
                    }
                    res.json({ ID: account[0].timestamp, data: data_res });

                }
                else {
                    res.json(null);
                    return;
                }
            }).sort({ _id: -1 }).limit(parseInt(num,10));
        }
        else {
            res.send("who are you");
            return;
        }
    });
})
//----export----/
module.exports = router