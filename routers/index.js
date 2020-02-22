var express = require('express');
var router = express.Router();
var user_account = [];

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

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
    console.log(user_account[user_account.lenth - 1] + "acessing");
    res.redirect('/user');
});
//-------------------------//

//---asign page--/////
router.get('/asign', function(req, res) {
    res.render('asign', { title: 'Asign Page' });
});

router.post('/asign', function(req, res) {
    let account = {
        id: user_account.length,
        name: req.body.a_name,
        pass: req.body.a_pass
    }
    user_account.push(account);
    console.log(user_account[user_account.length - 1]);
    res.redirect('/asign/te');
});
router.get('/asign/te', function(req, res) {
    res.send(user_account);
});
//-------------------------//

module.exports = router