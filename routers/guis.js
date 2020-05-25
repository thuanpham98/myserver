"use strict"
/** module express */
var express = require('express');
var router = express.Router();

/** module timestamp */
var timestamp = require('../models/timestamp');
router.use(timestamp);

/* modal  managedev */
var ManageDev = require('../models/manageDev');

/* modal  user */
var User = require('../models/user');

/* module  check error */
var assert = require('assert');

/* module JWT */
var jwt = require('jsonwebtoken');
// ---------------------------------------------------

/** dev config */
router.get('/', function (req, res) {
    res.render('guis', { title: "Gui Page" });
});
router.post('/', async function (req, res) {
    let account, device;
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

    if (req.body.act) {
        await ManageDev.find({ ID: account[0].timestamp, dev: parseInt(req.body.dev, 10) }, async function (errr, result) {
            // assert.equal(null, err);
            device = result;

            if (device.length) {
                result[0].timestamp = Date.now();
                result[0].dev = req.body.dev;
                result[0].mask = req.body.mask;
                result[0].type = req.body.type;
                if (req.body.num > result[0].child.length) {
                    if (parseInt(req.body.type, 10) === 1) {
                        for (let i = result[0].child.length; i < req.body.num; i++) {
                            result[0].child.push({ mask: ("mask" + i.toString()), type: 0, act: false });
                        }
                        result[0].save();
                    }
                    if (parseInt(req.body.type, 10) === 0) {
                        for (let i = result[0].child.length; i < req.body.num; i++) {
                            result[0].child.push({ mask: ("mask" + i.toString()), maskport: "maskPortx", type: 0, value: 0, port: 0, pin: i, act: false });
                        }
                        result[0].save();
                    }
                }
                else if (req.body.num < result[0].child.length) {
                    for (let i = result[0].child.length; i > req.body.num; i--) {

                        result[0].child.pop();
                    }
                    result[0].save();
                }

            }
            else {
                if (parseInt(req.body.type, 10) === 1) {

                    let child = [];
                    for (let i = 0; i < parseInt(req.body.num, 10); i++) {
                        child.push({ mask: ("mask" + i.toString()), type: 0, act: false });
                    }
                    await ManageDev.create({
                        ID: account[0].timestamp,
                        timestamp: Date.now(),
                        dev: req.body.dev,
                        mask: req.body.mask,
                        type: req.body.type,
                        child: child
                    }, function (err2, doc) {
                        console.log(doc);
                    });
                }
                else if (parseInt(req.body.type, 10) === 0) {

                    let child = [];
                    for (let i = 0; i < parseInt(req.body.num, 10); i++) {
                        child.push({ mask: ("mask" + i.toString()), maskport: "maskPortx", type: 0, value: 0, port: 0, pin: i, act: false });
                    }
                    await ManageDev.create({
                        ID: account[0].timestamp,
                        timestamp: Date.now(),
                        dev: req.body.dev,
                        mask: req.body.mask,
                        type: req.body.type,
                        child: child
                    }, function (err2, doc) {
                        console.log(doc);
                    });
                }

            }
        });
        res.json("added");
    }
    else {
        console.log("start delete ");
        await ManageDev.deleteOne({ ID: account[0].timestamp, dev: req.body.dev }, function (err, result) {
            if (err) {
                console.log("error query");
            } else {

                console.log(result);
            }
        }).sort({ _id: -1 }).limit(1);
        console.log("end deleta");
        res.json("removed");
    }
});

/** manager block */
/** sensors config */
router.get('/blocks', async function (req, res) {

    
    let account, device;
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
        res.render('blocks', { title: "Block Page", dev: device });
    });
});

/* export home */
module.exports = router