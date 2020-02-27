var mongoose = require('mongoose');

var viewerSchema = new mongoose.Schema({
    timestamp: Number,
    name: String,
    email: String,
    phone: String,
});

var Viewer = mongoose.model('Viewer', viewerSchema, 'viewer');

module.exports = Viewer;