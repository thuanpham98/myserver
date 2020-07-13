"use strict"
/** module express */
var express = require('express');
var router = express.Router();

/** module timestamp */
var timestamp = require('../models/timestamp');
router.use(timestamp);

/* modal */
var User = require('../models/user');
var Notify =require('../models/ announcement');
/* module JWT */
var jwt = require('jsonwebtoken');

/** /login */
router.get('/', function (req, res) {
    res.render('notify', { title: "notify Page" });
});
// router.post('/', validation.checkFilled, validation.checkAccount, controller.post);

/* export login */
module.exports = router