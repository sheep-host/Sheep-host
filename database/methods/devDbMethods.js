const Devs = require('../models/devModel');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/';


// when user clicks createDB button, rest of his profile populates
function updateDevProfile(req, res, next){
  const query = { userName: req.body.userName };
  const data = {
    database: [{
      id: req.body.dbId,
      name: req.body.dbName,
      collections: [{
        name: req.body.collectionName,
        devSchema: req.body.schema
      }],
    }],
  };

  Devs.findOneAndUpdate(query, { $set: data }, function(err, dev) {
    if (err) throw err;
    res.json(req.body.results);
  });
}

// new DB spooled up using id from dev profile and chosen db name
function createDevDB(req, res, next) {
  const query = {
    userName: req.body.userName,
    'database.name': req.body.dbName
  };
  console.log('in createDB', req.body);
  let dbId;
  Devs.findOne({userName: req.body.userName},function(err, dev){
    dbId = dev._id;
  });
  Devs.findOne(query, function(err, dev){
    console.log('dev', dev);
    if(!dev){
      const devDB = mongoose.createConnection(uri + dbId + '_' + req.body.dbName);
      const devModel = devDB.model('label', new mongoose.Schema({
        createdBy: String
      }));
      devModel({
        createdBy: req.body.userName
    }).save(function (err, results) {
        if (err) throw err;
        req.body.results = results;
        next();
      });
    }
    else (res.json({nah: 'b'}))
  })
}

module.exports = { updateDevProfile, createDevDB };
