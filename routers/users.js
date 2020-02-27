var express = require('express');
var router = express.Router();

//---timestamp module  if have a even happen---//
var timestamp = require('../models/timestamp');
router.use(timestamp);


router.get('/', function(req, res) {
    res.render('user', { title: 'User Page' });

});
router.get('/1', function(req, res) {
    res.send('user 1');
})

module.exports = router