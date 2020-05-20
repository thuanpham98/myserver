"use strict"
var mongoose = require('mongoose');

var manageDevSchema = new mongoose.Schema({
    ID: String, /** unique Account */
    timestamp: Number,
    dev : Number,
    mask: String,
    type : Number,
    child : Array

},{ versionKey: false});

var ManageDev= mongoose.model('ManageDev', manageDevSchema, 'manageDev');

module.exports = ManageDev;