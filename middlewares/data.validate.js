/* modal */
var User = require('../models/user');
var Data = require('../models/data');

/* module  check error */
var assert = require('assert');

module.exports.checkID = async function(req, res, next) {

    let time = new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE });//Date().toString();
    console.log(req.body.ID);
    console.log("start check");
    await User.find({ timestamp: req.body.ID }, function(err, result) {
        assert.equal(null, err);
        if (!result.length) {
            return;
        }
    });

    let ob = {
        ID: req.body.ID,
        device : req.body.dev,
        timestamp: time,
        form: req.body.form
    };

    console.log("start send");
    result = await Data.create(ob);
    console.log(result);
    next();
};
