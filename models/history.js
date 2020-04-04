var mongoose = require('mongoose');

var historySchema = new mongoose.Schema({
    timestamp: String,
    email: String,
    act : Number
},{ versionKey: false});

var History = mongoose.model('History', historySchema, 'history');

module.exports = History;