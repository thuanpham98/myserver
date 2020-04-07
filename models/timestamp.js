"use strict"
module.exports = function(req, res, next) {
    console.log('Timestamp: ', Date.now());
    next();
};