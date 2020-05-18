"use strict"
/* module hash */
var bcrypt = require('bcrypt');

/* modal User */
var User = require('../models/user');

/* module email to check ID */
var Email = require('../models/email');
var nodemailer = require('nodemailer');

//---------------------------------------------------------------------//
module.exports.get = function(req, res) {
    res.render('update', {
        title: "Update page"
    });
};
module.exports.post = async function(req, res) {
    if(req.body.updatePass){
        let hash = await bcrypt.hash(req.body.n_pass, 10);

        User.find({ email: req.body.email }, function(err, doc) {
            doc[0].password = hash;
            doc[0].save();
        });

        console.log("done");
        res.redirect('/user');
    }
    else if(req.body.updateID){
        let token = Date.now();
        User.find({ email: req.body.email }, function(err, doc) {
            doc[0].timestamp = token;
            doc[0].save();
        });

        console.log("start send mail");
        Email.form.to = req.body.email;
        Email.form.text = "your new ID: " + token.toString();
        Email.mailServer.sendMail(Email.form, function(err, info) {
            // assert.equal(null, err);
        }); /*!> follow this link to  use  this function https://codeburst.io/sending-an-email-using-nodemailer-gmail-7cfa0712a799 */
        console.log("done send mail");
        res.redirect('/user');

    }
};