//--module user ,history in ./models --//
var User = require('../models/user');
//--mongoose using model.where is very useful

//---module  check error ---//
var assert = require('assert');

//---module email to check ID---//
var Email = require('../models/email');
var nodemailer = require('nodemailer');

//---------------------------------------//
module.exports.checkFilled = function(req, res, next) {
    var error = [];
    if (!req.body.a_email) {
        error.push('email is not fill');
    }
    if (!req.body.a_pass) {
        error.push('pass is not fill');
    }
    if (error.length) {
        res.render('register', { title: 'Register Page', error: error });
        return
    }
    next();
};
module.exports.checkAccount = function(req, res, next) {
    let account;
    User.find({ email: req.body.a_email }, function(err, result) {
        assert.equal(null, err);
        account = result;
        console.log(account);
    });
    if (account) {
        res.render('register', { title: 'Register Page', error: "account is exist " });
        return
    } else {
        Email.form.to = req.body.a_email;
        Email.form.text = "hello thuan";
        Email.mailServer.sendMail(Email.form, function(err, info) {
            assert.equal(null, err);
        }); // follow this link to  use  this function https://codeburst.io/sending-an-email-using-nodemailer-gmail-7cfa0712a799
        res.render('register', { title: 'Register Page', error: "register suscesfully" });
    }
    next();
};