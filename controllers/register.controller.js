//---module  check error ---//
var assert = require('assert');

//---module  user---//
var User = require('../models/user');

//--module bcrypt---//
const bcrypt = require('bcrypt');

//----------------------------------------------------//
module.exports.get = function(req, res) {
    res.render('register', { title: 'Register Page' })
};
module.exports.post = async function(req, res) {


    console.log("start hash");
    //----------------//
    let hash = await bcrypt.hash(res.locals.user.password, 10);
    //-------------------//
    console.log("end hash");
    console.log(hash);;

    await User.create({
        timestamp: res.locals.user.token,
        email: res.locals.user.email,
        password: hash,
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