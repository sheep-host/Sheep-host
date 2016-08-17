const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devSchema = new Schema({
  userName: String,
  password: String,
  db: [{
    id: { type: String, default: 'null' },
    name: { type: String, default: 'null' },
    collection: {
      name: { type: String, default: 'null' },
      schema: { type: String, default: 'null' }
    },
  }],
});

module.exports = mongoose.model('Dev', devSchema);
