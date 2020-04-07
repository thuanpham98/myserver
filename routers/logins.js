"use strict"
/** module express */
var express = require('express');
var router = express.Router();

/** module timestamp */
var timestamp = require('../models/timestamp');
router.use(timestamp);

/* controller */
var controller = require('../controllers/login.controller');

/* middleware */
var validation = require('../middlewares/login.validate');

/** /login */
router.get('/', controller.get);
router.post('/', validation.checkFilled, validation.checkAccount, controller.post);

/* export login */
module.exports = router