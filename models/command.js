var mongoose = require('mongoose');

var commandSchema = new mongoose.Schema({
    ID: String,
    timestamp: String,
    device: Number,
    io: Number,
    value: Number
},{ versionKey: false});

var Command = mongoose.model('Command', commandSchema, 'command');

module.exports = Command;