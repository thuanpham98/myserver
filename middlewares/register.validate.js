"use strict"
/* modal  user */
var User = require('../models/user');

/* module  check error */
var assert = require('assert');

/* module bcrypt */
const bcrypt = require('bcrypt');

/* module email to check ID */
var Email = require('../models/email');
var nodemailer = require('nodemailer');

module.exports.checkFilled = function(req, res, next) {
    var error = [];
    if (!req.body.a_email) {
        error.push('email is not fill');
    }
    if (!req.body.a_pass) {
        error.push('pass is not fill');
    }
    if(req.body.a_pass!==req.body.a_conf_pass){
        error.push('pass is not correct ');
    }
    if (error.length) {
        res.render('register', { title: 'Register Page', status: error });
        return;
    }
    next();
};
module.exports.checkAccount = async function(req, res, next) {
    let account;
    console.log(req.body.a_email);
    console.log("start check");
    await User.find({ email: req.body.a_email }, function(err, result) {
        assert.equal(null, err);
        account = result;


    });
    console.log(account);
    console.log(typeof(account));
    console.log("end check");

    if (account.length) {
        res.render('register', { title: 'Register Page', status: "account is exist " });
        return;

    }
    console.log("start send mail");
    var token = Date.now();
    Email.form.to = req.body.a_email;
    Email.form.text = "your token: " + token.toString();
    Email.mailServer.sendMail(Email.form, function(err, info) {
        assert.equal(null, err);
    }); /*!> follow this link to  use  this function https://codeburst.io/sending-an-email-using-nodemailer-gmail-7cfa0712a799 */
    console.log("done send mail");

    /* coder password */
    console.log("start hash");
    let hash = await bcrypt.hash(req.body.a_pass, 10);
    console.log("end hash");
    console.log(hash);;
    let mask_init= {sensor_1:"mask1",sensor_2:"mask2",sensor_3:"mask3",sensor_4:"mask4",sensor_5:"mask5",sensor_6:"mask6",sensor_7:"mask7",sensor_8:"mask8",sensor_9:"mask9",sensor_10:"mask10",
                    sensor_11:"mask11",sensor_12:"mask12",sensor_13:"mask13",sensor_14:"mask14",sensor_15:"mask15",sensor_16:"mask16",sensor_17:"mask17",sensor_18:"mask18",sensor_19:"mask19",sensor_20:"mask20"
    };
    await User.create({
        timestamp: token,
        email: req.body.a_email,
        password: hash,
        sensors: [
        {name: "sensor_1",mask: "mask1",type:0},{name: "sensor_2",mask: "mask2",type:0},{name: "sensor_3",mask: "mask3",type:0},{name: "sensor_4",mask: "mask4",type:0},{name: "sensor_5",mask: "mask5",type:0},
        {name: "sensor_6",mask: "mask6",type:0},{name: "sensor_7",mask: "mask7",type:0},{name: "sensor_8",mask: "mask8",type:0},{name: "sensor_9",mask: "mask9",type:0},{name: "sensor_10",mask: "mask10",type:0},
        {name: "sensor_11",mask: "mask11",type:1},{name: "sensor_12",mask: "mask12",type:1},{name: "sensor_13",mask: "mask13",type:1},{name: "sensor_14",mask: "mask14",type:1},{name: "sensor_15",mask: "mask15",type:1},
        {name: "sensor_16",mask: "mask16",type:1},{name: "sensor_17",mask: "mask17",type:1},{name: "sensor_18",mask: "mask18",type:1},{name: "sensor_19",mask: "mask19",type:1},{name: "sensor_20",mask: "mask20",type:1}
        ],
        status: 0,
    }, function(err, result) {
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(result);
    });

    next();
};