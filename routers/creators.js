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
    age: 24
};
var a = JSON.stringify(ob);
router.get('/', function(req, res) {
    res.send(a);

});

router.post('/', dataValidation.checkID, dataController.post);


module.exports = router