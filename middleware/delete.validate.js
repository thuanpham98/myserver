/* modal User */
var User = require('../models/user');

/* module  check error */
var assert = require('assert');

/* module JWT */
var jwt = require('jsonwebtoken');

/* module hash */
var bcrypt = require('bcrypt');

module.exports.checkFilled = function(req, res, next) {
    let error = [];
    if (!req.body.email) {
        error.push('email is not fill');
    }
    if (!req.body.pass) {
        error.push('pass is not fill');
    }
    if (error.length) {
        res.render('delete', { title: 'Login Page', status: error });
        return;
    }
    next();
};


module.exports.checkAccount = async function(req, res, next) {

    let account;
    console.log(req.body.email);
    console.log("start check");
    //--test email exist---//
    await User.find({ email: req.body.email }, function(err, result) {
        assert.equal(null, err);
        account = result;
    });
    console.log(account);
    //-- if have a account
    if (!account.length) {
        res.render('delete', { title: 'Delete Page', status: "account is not exist or not correct " });
        return;
    }
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    console.log(decoded);
    let test = account[0];
    if (decoded.accessToken != test.email) {
        res.render('delete', {
            title: 'Delete Page',
            status: "This is not your email"
        });
        return;
    }
    match = await bcrypt.compare(req.body.pass, test.password);

    console.log(match);

    if (!match) {
        res.render('delete', { title: 'Login Page', status: "password incorrect" });
        return;
    }
    console.log("start delete ");
    await User.deleteOne({ email: test.email }, function(err, result) {

        if (err) {

            console.log("error query");

        } else {

            console.log(result);

        }

    });
    console.log("end delete");
    next();
};