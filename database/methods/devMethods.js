'use strict';
const mongoose = require('mongoose');
const Dev = require('../models/devModel');


function addDev(req, res, next){

	console.log('inside addDev');
  const newDev = Dev({
  	userName: req.body.username,
  	password: req.body.password
  });

  newDev.save(function (err) {

  	if (err) throw err;
  	else {
  		console.log('SAVED')
  		//next();
      console.log('RES', res)
  		res.send(true);
      // Dev.findOne({'userName': req.body.user.username}, 'userName', function(err, dev) {
      //   if(!err) {
      //     if(dev.userName === req.body.user.username) {
      //       console.log('INSIDE MONGO');
            

      //       res.send(true);
      //     } else {
      //       console.log('Error from addDev - userName already there')
      //       return ({error: error})
      //     }

        }
      })

  	}
 


//   const newDev ={
//   	userName: req.body.userName,
//   	password: req.body.password
//   };
  
// 	Dev.create(newDev, function(err, result){
// 		if(err) throw err;
// 		console.log('dev saved', result);
// 		res.send(result); //for postman testing
// 	})



module.exports = {
  addDev

}; 
 
