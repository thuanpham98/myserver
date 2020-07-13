"use strict"
var mongoose = require('mongoose');

var notifySchema = new mongoose.Schema({
    ID: String,
    timestamp: String,
    device: Number,
    header: String,
    content: String,
    comment:String
},{ versionKey: false});

var Notify= mongoose.model('Notify', notifySchema, 'notify');

module.exports = Notify;