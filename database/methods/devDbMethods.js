'use strict';
var Devs = require('../models/devModel');
var mongoose = require('mongoose');
var uri = 'mongodb://localhost/';
var db = require('../SheepDB');


// when user clicks createDB button, rest of his profile populates
function updateDevProfile(req, res, next){
  console.log('req.body in updateDevProfile: ', req.body);
  var query = { userName: req.body.userName };
  var data = {
    database: [{
      id: req.body.dbId,
      name: req.body.dbName,
      collections: [{
        name: req.body.collectionName,
        devSchema: req.body.schema
      }],
    }],
  };

  Devs.findOneAndUpdate(query, data, { new: true }, function(err, dev) {
    console.log('findOneAndUpdate dev: ', dev);
    if (err) res.json({error : 'Error'});
    req.body.dev = dev;
    console.log('updated dev profile: ', dev)
    next();
  });
}

// new DB spooled up using id from dev profile and chosen db name
function createDevDB(req, res, next) {
  var query = {
    userName: req.body.userName,
    'database.name': req.body.dbName
  };
  console.log('in createDB', req.body);
  Devs.findOne(query, function(err, dev){
    console.log('dev null is good: ', dev);
    if(!dev){
      var devDB = db.useDb(req.body.dbId + '_' + req.body.dbName);
      var devModel = devDB.model('label', new mongoose.Schema({
        createdBy: String
      }));
      devModel({
        createdBy: req.body.userName
    }).save(function (err, results) {
        if (err) res.json({error : 'Error'});
        req.body.results = results;
        next();
      });
    }
    else (res.json({error: 'db exists'}))
  })
}

module.exports = { updateDevProfile, createDevDB };
