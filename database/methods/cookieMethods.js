var mongoose = require('mongoose');
var Devs = require('../models/devModel');

function setCookie(req, res, next) {
  // var sheepCookie = {
  //   _id: req.body.dev._id,
  //   userName: req.body.dev.userName,
  //   database: req.body.dev.database.length > 0
  // };
  // res.cookie('sheep', sheepCookie, { maxAge: 60000, httpOnly: true }).send(true);

  // httpOnly not set to true, for MVP purposes!
  console.log('cookie', req.body);
  res.cookie('token', req.body.token, { maxAge: 600000 });
  res.cookie('database', req.body.dev.database.length > 0, { maxAge: 600000 });
  res.redirect('/dashboard/'+req.body.dev.userName);
  // res.json(req.body.dev);
}

function setDatabaseCookieTrue(req, res, next) {
  res.cookie('database', true, { maxAge: 600000 });
  res.json(req.body.result);
}

module.exports = { setCookie, setDatabaseCookieTrue };
