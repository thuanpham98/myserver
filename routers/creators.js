var express = require('express');
var router = express.Router();

//---timestamp module  if have a even happen---//
var timestamp = require('../models/timestamp');
router.use(timestamp);
var ob = {
    ID: "server",
    data: {
        D1: 1,
        D2: 0
    }

}
var a = 1;
ob = JSON.stringify(ob);
router.get('/', function(req, res) {
    console.log(req.body);

    if (a) {
        res.send(ob);
        a = 0;
    } else {
        res.send(null);
        a = 1;
    }
});

router.post('/', function(req, res) {
    console.log(req.body);
    res.send("ok");

});


module.exports = router