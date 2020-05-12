"use strict"
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    timestamp: Number,
    email: String,
    password: String,
    sensorsline: Array,
    sensorsbar : Array,
    mask: Object, /** for user named sensor  */
    status: Number
});

var User = mongoose.model('User', userSchema, 'user');

module.exports = User;