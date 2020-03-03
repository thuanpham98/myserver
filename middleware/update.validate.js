//--module user ,history in ./models --//
var User = require('../models/user');
//--mongoose using model.where is very useful

//---module  check error ---//
var assert = require('assert');

//--module hash --//
var bcrypt = require('bcrypt');

//--module JWT --//
var jwt = require('jsonwebtoken');

//------------------------------------//
//------------------------------------//
module.exports.checkFilled = function(req, res, next) {
    let error = [];
    if (!req.body.email) {
        error.push('email is not fill');
    }
    if (!req.body.o_pass) {
        error.push('old pass is not fill');
    }
    if (!req.body.n_pass) {
        error.push('new pass is not fill');
    }
    if (error.length) {
        res.render('update', { title: 'Update Page', status: error });
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
        res.render('update', {
            title: 'Update Page ',
            status: "not correct email "
        });
        return;
    }
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    console.log(decoded);
    let test = account[0];
    console.log("test mail");
    if (decoded.accessToken != test.email) {
        res.render('update', {
            title: 'Update Page ',
            status: "This is not your email"
        });
        return;
    }
    match = await bcrypt.compare(req.body.o_pass, test.password);
    console.log(match);

    if (!match) {
        res.render('update', {
            title: 'Update Page',
            status: "old password incorrect"
        });
        return;
    }
    next();
};