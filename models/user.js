var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    timestamp: Number,
    name: String,
    email: String,
    phone: String,
    password: String
});

var User = mongoose.model('User', userSchema, 'user');

module.exports = User;