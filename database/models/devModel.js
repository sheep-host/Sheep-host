const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


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

devSchema.pre('save', function(next){
	var dev = this;
	if(!dev.isModified('password')) return next();
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if (err) return next(err);
		bcrypt.hash(dev.password, salt, function(err, hash){
			if (err) return next(err);
			dev.password = hash;
			next();
		});
	});
});

devSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Dev', devSchema);
