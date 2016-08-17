'use strict';
const mongoose = require('mongoose');
const Dev = require('./devModel');
mongoose.connect('mongodb://localhost/sheepDevs');

function addDev(req, res){
	let devID = Math.random().toString(36).substr(2,9);
	let devUser = req.body.username;
	let devPW = req.body.password;
	let dev = new Dev({
		devID: devID;
		devUser: devUser;
		devPW: devPW;
	});
	dev.save(function(error){
		assert.equal(error.errors['devID'].message,
			'Unique `devID` not generated');
		assert.equal(error.errors['devUser'].message,
			'Username required');
		assert.equal(error.errors['devPW'].message,
			'Password required');
		console.log('dev created: ', dev.devUser);
		res.locals.devID = devID;
		res.send();
	});
}


var main = mongoose.connection;
main.on('error', console.error.bind(console, 'connection error:'));
main.once('open', function() {
  console.log('We are connected!');
});
