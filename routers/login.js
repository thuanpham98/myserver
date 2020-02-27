//----module make http server -----//
var express = require('express');
var router = express.Router();

//--module hash --//
var bcrypt = require('bcrypt');

//---module  check error ---//
var assert = require('assert');

//---timestamp module  if have a even happen---//
var timestamp = require('../models/timestamp');
router.use(timestamp);

//-- module controller login---//
var login = require('../controllers/login.controller');
//----------------------------------------------------------------------///
//----------------------------------------------------------------------///

//---login page --///
router.get('/', login.get);
router.post('/', login.post);

//------export module-------//
module.exports = router