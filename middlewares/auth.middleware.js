/* modal  user */
var User = require('../models/user');

/* module  check error */
var assert = require('assert');

/* module JWT */
var jwt = require('jsonwebtoken');

module.exports.requireAuth = async function(req, res, next) {
    let account;
    if (!req.cookies.access_token) {
        res.redirect('/login');
        return;
    }

    var decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, function(err, result) {
        assert.equal(null, err);
        account = result;
        
        if (!account.length) {
            res.redirect('/login');
            return;
        }
    });


    next();

};