"use strict"
/** module express */
var express = require('express');
var router = express.Router();

/** module timestamp */
var timestamp = require('../models/timestamp');
router.use(timestamp);

/** Middlerware */
var dataValidation = require('../middlewares/data.validate');

/** Controller */
var dataController = require('../controllers/data.controller');

/* protobuf */
const Schema = require('../protobuf/message_pb');

/* modal Data */
var Command = require('../models/command');

/* modules  check error */
var assert = require('assert');

/* /storage */
router.get('/', async function (req, res) {

    let data;
    let data_send;
    await Command.find({ ID: req.headers.id }, function (err, result) {
        assert.equal(null, err);
        if (!result.length) {
            console.log("no data");
            data_send = null;
        }
        else {
            data = result[0];

            let ob = new Schema.Sensor;
            ob.setId(data.ID);
            ob.setDevice(data.device);
            ob.setIo(data.io);
            ob.setValue(data.value);

            console.log(data);
            data_send = ob.serializeBinary().toString();
        }
        res.send(data_send);

    }).sort({ _id: -1 }).limit(1);

    // console.log("start delete ");
    // await Command.deleteMany({ ID: req.headers.id }, function (err, result) {

    //     if (err) {
    //         console.log("error query");
    //     } else {

    //         console.log(result);
    //     }

    // });
    // console.log("end deleta");

});
router.post('/', dataValidation.checkID, dataController.post);

/* export storage */
module.exports = router