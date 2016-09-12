var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var verSchema = new Schema({
  createdAt: { type: Date, default: Date.now, expires: 3000 },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  key: { type: String, required: true },
});

module.exports = mongoose.model('pergatory', verSchema);
