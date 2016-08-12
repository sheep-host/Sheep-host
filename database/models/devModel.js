const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devSchema = new Schema({
	devID: {
		type: String,
		required: true
	},
	devUser: {
		type: String,
		required: true
	},
	devPW: {
		type: String,
		required: true
	},
	devDB:	String
});

const Dev = mongoose.model('Dev', devSchema);

module.exports = Dev;
