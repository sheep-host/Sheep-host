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
 