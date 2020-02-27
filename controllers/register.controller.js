//---module  check error ---//
var assert = require('assert');

//--module hash --//
var bcrypt = require('bcrypt');


module.exports.get = function(req, res) {
    res.render('register', { title: 'Register Page', error: '' })
};
module.exports.post = function(req, res) {

    console.log('done email');
};