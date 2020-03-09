var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
    ID: String,
    timestamp: Number,
    form: Object
},{ versionKey: false});

var Data = mongoose.model('Data', dataSchema, 'data');

module.exports = Data;