var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', function(req, res) {
    res.render('user', { title: 'User Page' });

});

router.get('/1', function(req, res) {
    res.send('user 1');
})

module.exports = router