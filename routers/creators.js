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

router.get('/', function(req, res) {
    console.log(req.body);

    res.send(null);

});

router.post('/', dataValidation.checkID, dataController.post);


module.exports = router