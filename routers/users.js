var express = require('express');
var router = express.Router();

//---timestamp module  if have a even happen---//
var timestamp = require('../models/timestamp');
router.use(timestamp);

//--module user ,history in ./models --//
var User = require('../models/user');
var History = require('../models/history');

//--module JWT --//
var jwt = require('jsonwebtoken');

//module validation---//
var updateValidation = require('../middleware/update.validate');
var deleteValidation = require('../middleware/delete.validate');

//--module controll--//
var updateController = require('../controllers/update.controller.js');
var deleteController = require('../controllers/delete.controller');

//-----------------------------------//

router.get('/', function(req, res) {
    res.render('user', {
        title: 'myAccount',
        status: 'Click Active if this is the first time you come here or account will be auto remove after 15 day'
    });
});

//------------active ------------//
router.get('/active', async function(req, res) {

    var decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    //check token on database--//
    User.find({ email: decoded.accessToken }, function(err, doc) {
        doc[0].status = 1;
        doc[0].save();
    });

    console.log("done");
    res.send("<h1> Active Successfull</h1>");


});

//---------------update----------/
router.get('/update', updateController.get);
router.post('/update', updateValidation.checkFilled, updateValidation.checkAccount, updateController.post);

//--------------log out-------------------------//
router.get('/logout', async function(req, res) {

    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    console.log("start logout")
    await History.create({
        timestamp: Date.now(),
        email: decoded.accessToken ,
        act : 0
    }, function(err, result) {
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(result);
    });
    
    res.clearCookie('access_token');
    res.redirect('/login');
});

//--------------delete----------//
router.get('/delete', deleteController.get);
router.post('/delete', deleteValidation.checkFilled, deleteValidation.checkAccount, deleteController.post);

//-------------display----------//
router.get('/display', function(req, res) {
    console.log(req.body);
    res.send('DIsplay page');
});

//----export----/
module.exports = router