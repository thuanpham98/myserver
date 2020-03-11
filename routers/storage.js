var express = require('express');
var router = express.Router();

//---timestamp module  if have a even happen---//
var timestamp = require('../models/timestamp');
router.use(timestamp);

//---------module midleware-----//
var dataValidation = require('../middleware/data.validate');

//---------module controller---//
var dataController = require('../controllers/data.controller');

//--------------------------------//
//-------------------------------//
var ob = {
    name: "thuan ",
    age: 24,
    sex: "Male"
};
var a = JSON.stringify(ob);
var n = 1;
router.get('/', function(req, res) {

    if (n) {
        res.send(null);
        n = 0
    } else {
        res.send(a);
        n = 1;
    }
});

router.post('/', dataValidation.checkID, dataController.post);


module.exports = router