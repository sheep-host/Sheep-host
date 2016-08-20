const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Collections = new Schema({
  name: { type: String, default: 'null' },
  devSchema: { type: String, default: 'null' },
});

const Database = new Schema({
  id: { type: String, default: 'null' },
  name: { type: String, default: 'null' },
  collections: [Collections],
});

const devSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  database: [Database],
});

module.exports = mongoose.model('Dev', devSchema);
