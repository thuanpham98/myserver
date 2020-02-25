//----module make http server -----//
var express = require('express');
var router = express.Router();

var user_account = [];

//---module  check error ---//
var assert = require('assert');

//--module from ./module/database----//
var client = require('../models/database');

//--module hash --//
var bcrypt = require('bcrypt');

//---module email to check ID---//
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({ // config mail server
    service: 'gmail',
    auth: {
        user: 'thuandeptrainek@gmail.com',
        pass: 'thuanthao69'
    }
});
//---timestamp  if have a even happen---//
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

//----------------------------------------------------------------------///
//----------------------------------------------------------------------///
//----Home page ---///
router.get('/', function(req, res) {
    res.render('index', { title: 'Home Page' });
});
//-------------------------//

//---Access page --///
router.get('/access', function(req, res) {
    res.render('access', { title: 'Access Page' });
});

router.post('/access', function(req, res) {
    try {
        let a_account = {
            email: req.body.email,
            password: req.body.pass
        }
        client.connect(function(err) {
            assert.equal(null, err);
            let account = client.db('account');
            let query = { email: a_account.email };
            account.collection("user_account").find(query, function(err, result) {
                assert.equal(null, err);
                console.log(result.password);
                bcrypt.compare(a_account.pass, result.password, function(err, result) {
                    res.redirect('/user');
                    console.log(result);
                });
            });
        });
    } catch {
        res.redirect('/access');
    }
});
//-------------------------//

//---asign page--/////
router.get('/asign', function(req, res) {
    res.render('asign', { title: 'Asign Page' });
});

router.post('/asign', async function(req, res) {
    try {
        //--hash  password to secret---//
        const hash_PassWord = await bcrypt.hash(req.body.a_pass, 10);

        //--object store imfomation user post--//
        let asign_account = {
            id_t: Date.now(),
            id_s: ' ',
            email: req.body.a_email,
            password: hash_PassWord
        };
        //-- connect to database --//
        client.connect(function(err) {
            //-- test error---//
            assert.equal(null, err);
            //-- pointer to  database--//
            let account = client.db('account');
            //---pointer  to colection and  do somthing  with document---//
            account.collection("user_account").insertOne(asign_account, function(err, result) {
                assert.equal(null, err);
                //--- for testing ---//
                asign_account.id_s = result.insertedId.toString();
            });
        });
        let mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'thuandeptrainek',
            to: asign_account.email,
            subject: 'IoT core Te',
            text: 'your ID to use is ' + asign_account.id_t.toString()
        }
        transporter.sendMail(mainOptions, function(err, info) {
            assert.equal(null, err);
        });

        /// floow this link to  use  this function https://codeburst.io/sending-an-email-using-nodemailer-gmail-7cfa0712a799
        res.redirect('/access'); // if suscessfull,  poit to Access page
    } catch {
        res.redirect('/asign'); //if crat , retry
    }

});
//-------------------------//

module.exports = router