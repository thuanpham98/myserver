"use strict"
/* modal  user */
var User = require('../models/user');

/* module  check error */
var assert = require('assert');

/* module JWT */
var jwt = require('jsonwebtoken');

/* module hash */
var bcrypt = require('bcrypt');

module.exports.checkFilled = function(req, res, next) {
    let error = [];
    console.log(req.body);
    if (!req.body.email) {
        error.push('email is not fill');
    }
    if (!req.body.pass) {
        error.push('pass is not fill');
    }
    if (error.length) {
        res.render({ title: 'Login Page', status: error });
        return;
    }
    next();
};


module.exports.checkAccount = async function(req, res, next) {

    let account;
    console.log(req.body.email);
    console.log("start check");

    /* test email exist */
    await User.find({ email: req.body.email }, function(err, result) {
        assert.equal(null, err);
        account = result[0];
    });
    console.log(account);

    /* test account */
    if ((account===undefined)||(account===[])) {
        res.render('login', { title: 'Login Page', status: "account is not exist or not correct " });
        return;

    }
    else{
        let test = account;
        console.log(test);
        let match = await bcrypt.compare(req.body.pass, test.password);
        console.log(match);
        if (!match) {
            res.render('login', { title: 'Login Page', status: "password incorrect" });
            return;
    
        }
        else{
            var token = await jwt.sign({ accessToken: test.email }, process.env.PRIVATE_KEY);
            console.log(token);
            res.cookie('access_token', token);
            res.headers={'access_token':token};
        }
    }

    next();
};