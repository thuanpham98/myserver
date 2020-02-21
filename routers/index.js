var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', function(req, res) {
    res.redirect('myserver');
    res.sendfile(__dirname + '/views/a.htm ');
});

router.get('/sub/:id', function(req, res) {
    res.send('About birds' + req.params.id);
});

module.exports = router