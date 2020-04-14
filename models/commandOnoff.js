"use strict"
var mongoose = require('mongoose');

var commandOnofftSchema = new mongoose.Schema({
    ID: String,
    timestamp: String,
    device: Number,
    io: Object,
},{ versionKey: false});

var CommandOnoff = mongoose.model('CommandOnoff', commandOnofftSchema, 'commandOnoff');

module.exports = CommandOnoff;