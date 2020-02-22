var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


router.get('/', function(req, res) {
    res.render('index', { title: 'Home Page' });
});



router.get('/access', function(req, res) {
    res.send('About birds' + req.params.id);
});

module.exports = router