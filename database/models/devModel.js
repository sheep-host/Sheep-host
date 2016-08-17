const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const devSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  database: { type: Array,
    default: {
      id: { type: String, default: 'null' },
      name: { type: String, default: 'null' },
      collection: {
        name: { type: String, default: 'null' },
        schema: { type: String, default: 'null' },
      },
    }
  },
});

module.exports = mongoose.model('Dev', devSchema);
