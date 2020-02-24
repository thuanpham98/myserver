var express = require('express');
var router = express.Router();
var user_account = [];

var popup = require('popups');
var assert = require('assert');

var client = require('../models/database');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// //---midleware to authority url you want-----//
// function requireLogin(req, res, next) {
//     if (req.session.loggedIn) {
//         next(); // allow the next route to run
//     } else {
//         // require the user to log in
//         res.redirect("/access"); // or render a form, etc.
//     }
// }

// // Automatically apply the `requireLogin` middleware to all
// // routes starting with `/admin`
// router.all("/user/*", requireLogin, function(req, res, next) {
//     next(); // if the middleware allowed us to get here,
//     // just move on to the next route handler
// });
//------------------------------------------///

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
    res.redirect('/user');
});
//-------------------------//

//---asign page--/////
router.get('/asign', function(req, res) {
    res.render('asign', { title: 'Asign Page' });
});

router.post('/asign', function(req, res) {
    let i_account = {
            //_id: Date.now(),
            name: req.body.a_name,
            pass: req.body.a_pass
        }
        //user_account.push(i_account);
    client.connect(function(err) {
        assert.equal(null, err);
        var account = client.db('account');
        account.collection("user_account").insertOne(i_account, function(err, res) {
            assert.equal(null, err);
            console.log("your ID is " + res.insertedId);
            popup.alert({
                content: "your ID is " + res.insertedId
            });

        });
    });

    res.redirect('/access');
});
//-------------------------//

module.exports = router