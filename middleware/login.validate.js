//--module user ,history in ./models --//
var User = require('../models/user');
//--mongoose using model.where is very useful

//---module  check error ---//
var assert = require('assert');


module.exports.checkFilled = function(req, res, next) {
    let error = [];
    if (!req.body.email) {
        error.push('email is not fill');
    }
    if (!req.body.pass) {
        error.push('pass is not fill');
    }
    if (error.length) {
        res.render('login', { title: 'Login Page', status: error });
        return;
    }
    next();
};


module.exports.checkAccount = async function(req, res, next) {
    let account;
    console.log(req.body.email);
    console.log("start check");
    await User.find({ email: req.body.email, password: req.body.pass }, function(err, result) {
        assert.equal(null, err);
        account = result;


    });
    console.log(account);
    console.log(account.length);
    console.log("end check");

    if (account.length) {
        next();

    } else {

        //return
        res.render('login', { title: 'Login Page', status: "account is not exist or not correct " });
        return;
    };
};