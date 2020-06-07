"use strict"
/* modal */
var User = require('../models/user');
var Data = require('../models/data');

/* module  check error */
var assert = require('assert');

module.exports.checkID = async function(req, res, next) {

    let time = new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE });//Date().toString();
    
    console.log("start check");
    if((req.body.ID.length ==undefined) || (req.body.ID.length !=13) ||(isNaN(req.body.ID.length))){
        res.send("who are you");
        return;
    }

    await User.find({ timestamp: req.body.ID }, async function(err, result) {
        assert.equal(null, err);
        if (!result.length) {
            res.send("who are you");
            return;
        }
        else{
            let ob = {
                ID: req.body.ID,
                device : req.body.dev,
                datetime : req.body.datetime,
                timestamp: req.body.timestamp,
                form: req.body.form
            };
        
            console.log("start send");
            let doc = await Data.create(ob);
            console.log(doc);
            next();
        }
    });


};
