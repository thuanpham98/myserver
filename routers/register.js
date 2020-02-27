//----module make http server -----//
var express = require('express');
var router = express.Router();

//---require controller for register----//
var controller = require('../controllers/register.controller');

//--require middleware for register----//

var validation = require('../middleware/register.validate');

//---timestamp module  if have a even happen---//
var timestamp = require('../models/timestamp');
router.use(timestamp);

//---Register page--/////
router.get('/', controller.get);

router.post('/', validation.checkFilled, validation.checkAccount, controller.post);

//------export module-------//
module.exports = router