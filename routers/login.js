//----module make http server -----//
var express = require('express');
var router = express.Router();

//---timestamp module  if have a even happen---//
var timestamp = require('../models/timestamp');
router.use(timestamp);

//-- module controller login---//
var controller = require('../controllers/login.controller');

//--require middleware for register----//
var validation = require('../middleware/login.validate');

//---timestamp module  if have a even happen---//
var timestamp = require('../models/timestamp');
router.use(timestamp);
//----------------------------------------------------------------------///
//----------------------------------------------------------------------///

//---login page --///
//---Register page--/////
router.get('/', controller.get);

router.post('/', validation.checkFilled, validation.checkAccount, controller.post);

//------export module-------//
module.exports = router