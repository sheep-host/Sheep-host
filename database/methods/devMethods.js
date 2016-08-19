'use strict';
const mongoose = require('mongoose');
const Dev = require('../models/devModel');


function addDev(req, res, next){

	console.log('inside addDev');
  const newDev = Dev({
  	userName: req.body.user.username,
  	password: req.body.user.password
  });

  newDev.save(function (err) {

  	if (err) throw err;
  	else {
  		console.log('SAVED')
  		//next();
  		res.send(true);
  	}

  });

//   const newDev ={
//   	userName: req.body.userName,
//   	password: req.body.password
//   };
  
// 	Dev.create(newDev, function(err, result){
// 		if(err) throw err;
// 		console.log('dev saved', result);
// 		res.send(result); //for postman testing
// 	})
}


module.exports = {
  addDev

}; 
 
// =======
// mongoose.connect('mongodb://localhost/sheepDevs');

// function addDev(req, res){
// 	let devID = Math.random().toString(36).substr(2,9);
// 	let devUser = req.body.username;
// 	let devPW = req.body.password;
// 	let dev = new Dev({
// 		devID: devID,
// 		devUser: devUser,
// 		devPW: devPW
// 	});
// 	dev.save(function(error){
// 		assert.equal(error.errors['devID'].message,
// 			'Unique `devID` not generated');
// 		assert.equal(error.errors['devUser'].message,
// 			'Username required');
// 		assert.equal(error.errors['devPW'].message,
// 			'Password required');
// 		console.log('dev created: ', dev.devUser);
// 		res.locals.devID = devID;
// 		res.send();
// 	});
// }

// function addDB(req, res){
// 	let devDB = req.body.devDB;
// 	let devID = req.body.devID;
// 	let devUser = req.body.username;
// 	let devPW = req.body.password;
// 	Dev.findOneAndUpdate({
// 		devID: devID,
// 		devUser: devUser,
// 		devPW: devPW
// 	}, { $set:{ devDB: devDB }
// 	}, { new: true }

// 	, function(err, dev){
// 		// define new collection with devID and devDB
// 		// predetermined schema?
// 	})
// }

// var main = mongoose.connection;
// main.on('error', console.error.bind(console, 'connection error:'));
// main.once('open', function() {
//   console.log('We are connected!');
// });

// module.exports = {addDev, addDB};


// >>>>>>> 3c9abd859e3a0f0399caf63fefa80790a97ee319

