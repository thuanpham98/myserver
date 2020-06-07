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
    // if(req.headers.connection==='close'){
    //     console.log(req.headers.connection);
    //     res.write("who are you");
    //     return;
    // }
    if((req.headers.id.length < 14)&&(isNaN(req.headers.id))){
        res.send("who are you");
        return;
    }
    let esp_id=req.headers.id.slice(0,13);
    let esp_num = req.headers.id.slice(13,req.headers.id.length);

    esp_num =parseInt(esp_num, 10);
    console.log(esp_id);
    console.log(esp_num);

    await Command.find({ID: esp_id,device:esp_num}, async function (err, result) {
        assert.equal(null, err);
        if (!result.length) {
            console.log("no data");
            data_send = null;
        }
        else{
            data = result[0];

            let ob = new Schema.Sensor;
            ob.setId(data.ID);
            ob.setDevice(data.device);
            ob.setIo(data.io);
            ob.setValue(data.value);

            console.log(data);
            data_send = ob.serializeBinary().toString();
            console.log(data_send);
            console.log("start delete ");
            await Command.deleteOne({ID: esp_id,device:esp_num}, function (err, result) {
        
                if (err) {
                    console.log("error query");
                } else {
        
                    console.log(result);
                }
        
            }).sort({ _id: -1 }).limit(1);
            console.log("end deleta");
        }
        res.send(data_send);
    }).sort({ _id: -1 }).limit(1);

});
router.post('/', dataValidation.checkID, dataController.post);

/* export storage */
module.exports = router