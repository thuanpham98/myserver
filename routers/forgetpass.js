"use strict"
/** module express */
var express = require('express');
var router = express.Router();

/** module timestamp */
var timestamp = require('../models/timestamp');
router.use(timestamp);

/* modal  user */
var User = require('../models/user');

/* module  check error */
var assert = require('assert');

/* module bcrypt */
const bcrypt = require('bcrypt');

/* module email to check ID */
var Email = require('../models/email');
var nodemailer = require('nodemailer');

/** /forgetpass */
router.get('/', function(req,res){
    res.render('forgetpass', {title: 'Help Page'});
});
router.post('/', function(req,res){

    var special_number = Math.floor(Math.random() * (Date.now()+1)); 
    console.log(special_number);
    /** save number to check real account */
    User.find({ email: req.body.email }, function(err, doc) {
        let account=doc;
        if (!account.length) {
            res.render('forgetpass', {title: 'Help Page'});
            return;
        }
        else {
            doc[0].status = special_number;
            doc[0].save();

            /** send email verify */
            console.log(req.body.email);
            console.log("start send mail");
            Email.form.to = req.body.email.toString();
            Email.form.text = "your special number: " + special_number.toString();
            Email.form.subject="Veryfi Email";
            Email.mailServer.sendMail(Email.form, function(err, info) {
                // assert.equal(null, err);
            }); /*!> follow this link to  use  this function https://codeburst.io/sending-an-email-using-nodemailer-gmail-7cfa0712a799 */
            console.log("done send mail");

            res.redirect('/forgetpass/verify');
        }
    });
    
});
router.get('/verify', function(req,res){
    res.render('verify', {title: 'Verify Page'});
});
router.post('/verify', function(req,res){
    
    /** save number to check real account */
    User.find({ email: req.body.email }, async function(err, doc) {
        let account=doc;
        if (!account.length) {
            res.render('verify', {title: 'Verify Page'});
            return;
        }
        else {
            if(req.body.number==account[0].status){
                let temp_pass=(Math.floor(Math.random() * (Date.now()+1)) + 248*(Date.now()+1)).toString(); 
                console.log("start hash");
                let hash_pass = await bcrypt.hash(temp_pass, 10);
                console.log("end hash");
                doc[0].password=hash_pass;
                doc[0].status=0;
                doc[0].save();

                /** send email verify */
                console.log("start send mail");
                Email.form.to = req.body.email;
                Email.form.text = "your new pass: " + temp_pass;
                Email.form.subject="Veryfi Number";
                Email.mailServer.sendMail(Email.form, function(err, info) {
                    //assert.equal(null, err);
                }); /*!> follow this link to  use  this function https://codeburst.io/sending-an-email-using-nodemailer-gmail-7cfa0712a799 */
                console.log("done send mail");

                res.redirect('/login');
            }
            else{
                res.render('verify', {title: 'Verify Page'});
                return;
            }
        }
    });
});
/* export login */
module.exports = router