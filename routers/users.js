"use strict"
/** module express */
var express = require('express');
var router = express.Router();

/** module timestamp */
var timestamp = require('../models/timestamp');
router.use(timestamp);

/* modal message for mongodb */
var User = require('../models/user');
var History = require('../models/history');
var ManageDev = require('../models/manageDev');

/* module JWT */
var jwt = require('jsonwebtoken');

/* middleware */
var updateValidation = require('../middlewares/update.validate');
var deleteValidation = require('../middlewares/delete.validate');

/* controller */
var updateController = require('../controllers/update.controller.js');
var deleteController = require('../controllers/delete.controller');

/** /user */
router.get('/', async function(req, res) {
    // res.render('user', {title: 'User Page'});
    // console.log("ok");

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
        if(device===undefined){
            return;
        }
        if (device.length) {
            for (let i = 0; i < device.length; i++) {
                devices.push({ dev: device[i].dev, mask: device[i].mask });
                console.log(device[i].dev);
            }
            console.log(devices);
            res.render('user', { title: "User Page", devices: devices });
        }
        else {
            devices = [];
            res.render('user', { title: "User Page", devices: devices });
        }
    });
});

// /* user/active */
// router.get('/active', async function(req, res) {
//     res.render('active', {
//         title: 'Active Page',
//         status: 'if you do not receive any ID , go to update to receive again '
//     });
// });
// router.post('/active',async function(req, res) {

//     let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
//     let a =req.body.ID ;
//     /* check token on database */
//     User.find({ email: decoded.accessToken }, function(err, doc) {
//         if(a==doc[0].timestamp){
//             doc[0].status = 1;
//             doc[0].save();
//             console.log("done");
//             res.render('active', {
//                 title: 'Active Page',
//                 status: 'success'
//             });
//         }
//         else{
//             res.render('active', {
//                 title: 'Active Page',
//                 status: 'Not Correct'
//             });
//         }
//     });
// });

/** user/clone */
router.get('/clone',function(req,res){
    res.render('tables', {title: 'Data Table Page'});
});

/* user/update */
router.get('/update', updateController.get);
router.post('/update', updateValidation.checkFilled, updateValidation.checkAccount, updateController.post);

/* user/log out */
router.get('/logout', async function(req, res) {

    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    console.log("start logout")
    await History.create({
        timestamp: new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE }),
        email: decoded.accessToken ,
        act : 0
    }, function(err, result) {
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(result);
    });
    
    res.clearCookie('access_token');
    res.redirect('/login');
});

/* delete */
router.get('/delete', deleteController.get);
router.post('/delete', deleteValidation.checkFilled, deleteValidation.checkAccount, deleteController.post);

/* export user */
module.exports = router