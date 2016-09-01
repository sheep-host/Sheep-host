'use strict';
var Models = require('../models/devModel');
var mongoose = require('mongoose');
var uri = 'mongodb://localhost/';
var sheepDB = require('../SheepDB');
var sendMail = require('../../server/verify.js');
var randomstring = require('randomstring');
var verModel = require('../models/verModel');

function verify(req, res, next) {
  verModel.findOne({ key: req.params.key }, function(err, result) {
    if (err) throw err;
    else {
      req.body.userName = result.userName;
      req.body.password = result.password;
      req.body.email = result.email;
      next();
    }
  });
}

function sendVerification(req, res, next) {
  var randomKey = randomstring.generate();
  verModel.create({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    key: randomKey
  }, function(err, result) {
    if (err) throw err;
    else {
      sendMail(req.body.email, randomKey, function(err, message) {
        if (err) throw err;
        else res.status(200).send(message);
      });
    }
  });
}

// returns all databases names/_id (NO ACTUAL DATA) for a dev
function getAllDatabases(req, res, next){
  Models.DB.find({_creator: req.params.devID}, function(err, result){
    if(!result) res.sendStatus(404);
    console.log(result);
    var data = [];
    result.forEach(function(item){
      data.push({'_id':item._id, 'name':item.name});
    })
    res.json(result);
  })
}

// returns an array of all collection names/schema (NO ACTUAL DATA) for a dev's database
function getAllCollections(req, res, next){
  Models.DB.find({_creator: req.params.devID}, function(err, result){
    if(!result) res.sendStatus(404);
    console.log(result);
    var data = [];
    result.forEach(function(item){
      if(item._id.toString() === req.params.dbID){
        item.collections.forEach(function(col){
          data.push({'_id':col['_id'],'name':col['name'],'schema':JSON.parse(col['devSchema'])});
        })
      }
      res.send(data);
    });
  })
}

// signup middleware
function addDev(req, res, next){
  var newDev = {
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email
  };
  Models.Dev.create(newDev, function(err, dev){
    if(err) throw err;
    console.log('dev saved', dev);
    req.body.dev = dev;
    next();
  });
}

// login middleware
function usernameExist(req, res, next){
  Models.Dev.findOne({'userName': req.body.userName}, 'userName', function(err, dev) {
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

// create DB button middleware that adds to DB collection
function addDB(req, res, next) {
  var dev = req.body.dev;
  var db = new Models.DB({
    name: req.body.database,
    _creator: dev._id
  });
  var collection = {
    name: req.body.collectionName,
    devSchema: req.body.schema
  };
  db.collections.push(collection);
  console.log('db before saved', db);
  db.save(function(err){
    if (err) throw err;
    console.log('db after saved', db);
    req.body.db = db;
    req.body.dev = dev;
    next();
  });
}

// create DB button middleware that actually spools up database
function createDevDB(req, res, next) {
  console.log('in createDB', req.body);
  console.log('dev in createDB', req.body.dev);
  var devDB = sheepDB.useDb(req.body._id + '_' + req.body.database);
  var devModel = devDB.model('label', new mongoose.Schema({
    createdBy: String
  }));
  devModel({
    createdBy: req.body.dev.userName
  }).save(function(err, results){
    if (err) throw err;
    req.body.results = results;
    res.json(results);
  })
}

// saves collection and schema name to devs record of DBs (does not actually instantiate)
function addCollection(req, res, next){
  var collection = {
    name: req.body.collectionName,
    devSchema: req.body.schema
  }
  Models.DB.findOneAndUpdate({name: req.params.dbName}, { $push: { 'collections': collection } }, { new: true }, function(err, db){
    if (err) throw err;
    console.log(db);
    req.body.db = db;
    res.json(db);
  });
}

module.exports = {
  getAllDatabases,
  getAllCollections,
  addDev,
  usernameExist,
  addDB,
  createDevDB,
  addCollection,
  sendVerification,
  verify
};
