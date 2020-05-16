"use strict"
var mongoose = require('mongoose');

var manageDevSchema = new mongoose.Schema({
    ID: String, /** unique Account */
    dev : Array

},{ versionKey: false});

var ManageDev= mongoose.model('ManageDev', manageDevSchema, 'manageDev');

module.exports = ManageDev;