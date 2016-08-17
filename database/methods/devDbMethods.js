const Devs = require('../models/devModel');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/';

function update(req, res, next){
  const query = { userName: req.body.userName };
  const data = {
    database: {
      id: req.body.dbId,
      name: req.body.dbName,
      collection: {
        name: req.body.collectionName,
        schema: req.body.schema,
      }
    }
  };

  Devs.findOneAndUpdate(query, { $set: data }, function(err, dev) {
    if (err) throw err;
    else next();
  });
}

function create(req, res, next) {
  const db = mongoose.createConnection(uri + req.body.dbId + '_' + req.body.dbName);
  const dbModel = new db.model('_label', new mongoose.Schema({
    createdBy: String,
    createdAt: Date,
  }));

  dbModel({
    createdBy: req.body.userName,
    createdAt: new Date(),
  }).save(function (err, results) {
    if (err) throw err;
    else next();
  });
}

module.exports = { update, create };
