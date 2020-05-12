"use strict"
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    timestamp: Number,
    email: String,
    password: String,
    sensors: Array,
    status: Number
});

var User = mongoose.model('User', userSchema, 'user');

module.exports = User;