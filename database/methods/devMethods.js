'use strict';
const mongoose = require('mongoose');
const Dev = require('../models/devModel');


function addDev(req, res, next){
	console.log('inside addDev');
  console.log('REQ.body', req.body)
  // const newDev = Dev({
  // 	userName: req.body.userName,
  // 	password: req.body.password
  // });

  // newDev.save(function (err) {

  // 	if (err) throw err;
  // 	else {
  // 		console.log('SAVED')
  // 		//next();

  // 		res.send(true);
  //   }
  // })

  const newDev ={
   userName: req.body.userName,
   password: req.body.password
  };

 Dev.create(newDev, function(err, result){
   if(err) throw err;
   console.log('dev saved', result);
   req.body.dev = result;
  //  res.send(true); //placeholder response - updated for cookie functionality
    next();
 })
}

function usernameExist(req, res, next){
  Dev.findOne({'userName': req.body.userName}, 'userName', function(err, dev) {
    console.log('inside usernameExist')
    console.log('dev username exist',dev);
      if(dev === null) {
        console.log('name does not exist');
        next();
      } else {
        console.log('name exists!');
        res.status(422).send('User exists, please choose another username');
      }
  })
}


module.exports = { addDev, usernameExist };
