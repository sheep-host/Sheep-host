'use strict';
var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require("mongoose"));
var sendMail = require('../../server/verify.js');
var randomstring = require('randomstring');
var jwt = require ('jsonwebtoken');
var Models = require('../models/devModel');
var uri = 'mongodb://localhost/';
var sheepDB = require('../SheepDB');
var verifyModel = require('../models/verifyModel');
var schemaParser = require('./schemaParser') 
var apiKey = require('./apiKeyMethods');

function verify(req, res, next) {
  verifyModel.findOne({ key: req.params.key }, function(err, result) {
    if (err) res.json({error : 'Error'});
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
  verifyModel.create({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    key: randomKey
  }, function(err, result) {
    if (err) res.json({error : 'Error'});
    else {
      sendMail(req.body.email, randomKey, function(err, message) {
        if (err) res.json({error : 'Error'});
        else res.status(200).send(message);
      });
    }
  });
}

// returns all databases names/_id (NO ACTUAL DATA) for a dev
function getAllDatabases(req, res, next){
  var data = [];
  
  return Models.DB.find({_creator: req.params.devID}).execAsync()
  .then(function(results){
    console.log('results getAllDatabases', results);
    return Promise.each(results, function(database){
      console.log('before nested promise',database._creator, database.name);
      var devDB = sheepDB.useDb(database._creator + '_' + database.name);
      return Promise.each(database.collections, function(collection){ 
        console.log('nested promise',collection.name, collection.devSchema);
        var devModel = devDB.model(collection.name, new mongoose.Schema(JSON.parse(collection.devSchema)));
        return devModel.find({}).execAsync()
        .then(function(result){
      console.log('result', result);
      result.push({
        'database': database.name,
      'collection': collection.name
      });
          data.push(result);
        });
      }).then(function(){});
    }).then(function(){});
  }).then(function(){
    res.send(data);
  }).catch(function(err){
    console.log('error', err);
  });
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
      res.send(result);
    });
  })
}

//Signup middleware. If addDev function is changed, need to change function in test file.
function addDev(req, res, next){
  var newDev ={
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    api: {
      apiKey: apiKey.generateKey(),
      secretKey: apiKey.generateKey(),
      clientKey: apiKey.generateKey()
    }
  };

  Models.Dev.create(newDev, function(err, result){
    if(err) res.json({error : 'Error'});
    console.log('add dev result', result);
    req.body.dev = result;
    var authKey = new Buffer(result.api.apiKey + ':' + result.api.clientKey).toString('base64');
    var sheepToken = jwt.sign({
      secretKey: result.api.secretKey,
      authKey: authKey,
      userName: result.userName,
      devID: result._id,
      email: result.email,
      permissions: result.api.clientPermissions
    }, 'sheep host', { expiresIn: "1 day"});
    console.log('server side token', sheepToken);
    req.body.token = sheepToken;
    next();
  });
}

// login middleware
function usernameExist(req, res, next){
  // to enable reuse of email for development purposes, remove $or and the email portion of the query
  Models.Dev.findOne( { $or: [{ 'userName': req.body.userName }, { 'email': req.body.email } ] } , 'userName email', function(err, dev) {
    console.log('inside usernameExist')
    console.log('dev username exist',dev);
      if(dev === null) {
        console.log('name does not exist');
        next();
      } else {
        console.log('name exists!');
        res.status(422).send('Username/email exists, please choose another username');
      }
  })
}

// create DB button middleware that adds to DB collection
function addDB(req, res, next){
  var dev = req.body.dev;
  if (dev.database.length === 3){
    res.status(422).send('You have reached your database limit of 3');
  }
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
    if (err) res.status(409).send('Error');
    console.log('db after saved', db);
    dev.database.push(db);
    dev.save(function(err){
      req.body.db = db;
      req.body.dev = dev;
      next();
    })
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
    if (err) res.status(409).send('error');
    Models.DB.findOne({_creator: req.body._id, name: req.body.database}, function(err, db){
      if (err) res.json({error : 'Error'});
      console.log('db', db);
      req.body.db = db;
      res.json(db);
    });
  });
}

// saves collection and schema name to devs record of DBs (does not actually instantiate)
function addCollection(req, res, next){
  var collection = {
    name: req.body.collectionName,
    devSchema: req.body.schema
  }
  Models.DB.findOneAndUpdate({name: req.params.dbName}, { $push: { 'collections': collection } }, { new: true }, function(err, db){
    if (err) res.status(409).send('error');
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
