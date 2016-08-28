var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

var devSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  database: [{type: Schema.Types.ObjectId, ref: 'Database'}],
});



var Collections = new Schema({
  name: { type: String, default: 'null' },
  devSchema: { type: String, default: 'null' },
});

var databaseSchema = new Schema({
  _creator: { type: Schema.Types.ObjectId, ref: 'Dev' },
  name: { type: String, default: 'null' },
  collections: [Collections],
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

module.exports = {
  Dev: mongoose.model('Devs', devSchema),
  DB: mongoose.model('Database', databaseSchema),
  Col: mongoose.model('Collections', Collections)
}
