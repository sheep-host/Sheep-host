'use strict';
const mongoose = require('mongoose');
const Dev = require('../models/devModel');

function addDev(req, res, next){
  const newDev = Dev({
  	userName: req.body.userName,
  	password: req.body.password
  });

  newDev.save(function (err) {
  	if (err) throw err;
  	else next();
  });
}


module.exports = {
  addDev
};