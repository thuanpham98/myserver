var mongoose = require('mongoose');

var historySchema = new mongoose.Schema({
    timestamp: Number,
    name: String,
    email: String,
    phone: String,
    status: Number,
});

var History = mongoose.model('History', historySchema, 'history');

module.exports = History;