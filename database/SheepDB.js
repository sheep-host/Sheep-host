"use strict";

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Sheep');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to sheep DB');
});


module.exports = db;
