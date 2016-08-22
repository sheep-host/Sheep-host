"use strict";

const mongoose = require('mongoose');

mongoose.connect('mongodb://heroku_8q1d73wg:ki4b4j303kbtdi6j2cbeurt0vg@ds013916.mlab.com:13916/heroku_8q1d73wg');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to sheep DB');
});


module.exports = db;
