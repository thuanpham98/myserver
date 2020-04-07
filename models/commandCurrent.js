"use strict"
var mongoose = require('mongoose');

var commandCurrentSchema = new mongoose.Schema({
    ID: String,
    timestamp: String,
    device: Number,
    io: Object,
},{ versionKey: false});

var CommandCurrent = mongoose.model('CommandCurrent', commandCurrentSchema, 'commandCurrent');

module.exports = CommandCurrent;