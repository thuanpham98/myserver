"use strict"
var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
    ID: String, /** unique Account */
    device: Number, /** unique device, odd for post/display, even for get/gui */
    datetime : String, /** for display/save realtime */
    timestamp: Number, /** for caulator realtime */
    form: [Object] /** data from device */
},{ versionKey: false});

var Data = mongoose.model('Data', dataSchema, 'data');

module.exports = Data;
