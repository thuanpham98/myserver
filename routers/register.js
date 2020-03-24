/* module express */
var express = require('express');
var router = express.Router();

/** Controller */
var controller = require('../controllers/register.controller');

/* middleware */
var validation = require('../middleware/register.validate');

/* modal timestamp */
var timestamp = require('../models/timestamp');
router.use(timestamp);

/* /register */
router.get('/', controller.get);
router.post('/', validation.checkFilled, validation.checkAccount, controller.post);

/* export register */
module.exports = router