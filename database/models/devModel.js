var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Collections = new Schema({
  name: { type: String, default: 'null' },
  devSchema: { type: String, default: 'null' },
});

var Database = new Schema({
  id: { type: String, default: 'null' },
  name: { type: String, default: 'null' },
  collections: [Collections],
});

var devSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  database: [Database],
});

module.exports = mongoose.model('Dev', devSchema);
