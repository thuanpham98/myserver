//--module user ,history in ./models --//
var User = require('../models/user');
//--mongoose using model.where is very useful

//---module  check error ---//
var assert = require('assert');

//--module JWT --//
var jwt = require('jsonwebtoken');

//--module hash --//
var bcrypt = require('bcrypt');

//------------------------------------//
//------------------------------------//
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

    //Moi
    //neu co access_token tu cookie -> dung jwt verify access_token
    //neu hop le -> gui thong tin user -> req (luc dung o cac controller thi goi req.user)
    //req.user = { userID: userID, email: email }
    //neu khong hop le thi khong lam gi het
    // end moi

    //Khong dung jwt
    //logginSession -> access_token -> exp <= new Date() -> fail (va nguoc lai) -> neu fail loggingSession.delete()

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
        res.render('login', { title: 'Login Page', status: "account is not exist or not correct " });
        return;

    }

    let test = account[0];
    match = await bcrypt.compare(req.body.pass, test.password);
    console.log(match);

    if (!match) {
        res.render('login', { title: 'Login Page', status: "password incorrect" });
        return;

    }

    //login hop le -> dung jwt de ma hoa payload thanh access_token gui ve cookie
    //var privateKey = "thuan";
    var token = await jwt.sign({ accessToken: test.email }, process.env.PRIVATE_KEY);
    console.log(token);
    res.cookie('access_token', token);

    //let access_token = generateAccessToken();
    //let userPayload = { userID, exp: new Date() + 123 };
    //loggingSessions.set(access_token, userPayload);

    next();
};