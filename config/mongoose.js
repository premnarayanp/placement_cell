const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/placement_cell');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to mongodb"));

db.once('open', function() {
    console.log('connected to Database :: MongoDB');
});

module.exports = db;