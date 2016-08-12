const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devSchema = new Schema({
  'devID':	Number,
  'devUserName':	String,
  'devPassword':	String,
  'devDB':	String,
});

const Dev = mongoose.model('Dev', devSchema);

module.exports = Dev;
