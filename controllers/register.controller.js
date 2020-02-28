//---module  check error ---//
var assert = require('assert');

//---module  user---//
var User = require('../models/user');

module.exports.get = function(req, res) {
    res.render('register', { title: 'Register Page' })
};
module.exports.post = async function(req, res) {

    console.log(res.locals.user.email);
    await User.create({
        timestamp: res.locals.user.token,
        email: res.locals.user.email,
        password: res.locals.user.password,
        status: 0,
    }, function(err, result) {
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(result);
    });
    console.log("done make account");

    res.redirect('/login');

};