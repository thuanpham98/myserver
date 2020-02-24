const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Create a new MongoClient
module.exports = new MongoClient(url, { useUnifiedTopology: true });