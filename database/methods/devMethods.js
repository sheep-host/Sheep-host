var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
var sendMail = require('../../server/verify');
var randomstring = require('randomstring');
var jwt = require('jsonwebtoken');
var Models = require('../models/devModel');
var sheepDB = require('../SheepDB');
var verifyModel = require('../models/verifyModel');
var apiKey = require('./apiKeyMethods');

// When developer clicks validation link in email,
// check that link is still active in temporary collection
function verify(req, res, next) {
  verifyModel.findOne({ key: req.params.key }, (err, result) => {
    if (err) res.json({ error: 'Error' });
    else {
      req.body.userName = result.userName;
      req.body.password = result.password;
      req.body.email = result.email;
      next();
    }
  });
}

// Upon successful entering of information on signup page,
// store info in temporary collection and send email with activation link
function sendVerification(req, res) {
  var randomKey = randomstring.generate();
  verifyModel.create({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    key: randomKey,
  }, (err, result) => {
    if (err) res.json({ error: 'Error' });
    else {
      sendMail(result.email, randomKey, (error, message) => {
        if (error) res.json({ error: 'Error' });
        else res.status(200).send(message);
      });
    }
  });
}

// returns dev's data from all databases to dashboard
function getAllDatabases(req, res) {
  var data = [];
  return Models.DB.find({ _creator: req.params.devID }).execAsync()
  .then((results) => {
    return Promise.each(results, (database) => {
      var devDB = sheepDB.useDb(`${database._creator}_${database.name}`);
      return Promise.each(database.collections, (collection) => {
        var devModel = devDB.model(collection.name, new mongoose.Schema(JSON.parse(collection.devSchema)));
        return devModel.find({}).execAsync()
        .then((result) => {
          result.push({
            database: database.name,
            collection: collection.name,
          });
          data.push(result);
        });
      })
      .then(() => {});
    })
    .then(() => {});
  })
  .then(() => {
    res.send(data);
  })
  .catch((err) => {
    res.send(401).status({ error: err });
  });
}

// returns an array of all collection names/schema (NO ACTUAL DATA) for a dev's database
function getAllCollections(req, res) {
  var data = [];
  Models.DB.find({ _creator: req.params.devID }, (err, result) => {
    if (!result) res.sendStatus(404);
    result.forEach((item) => {
      if (item._id.toString() === req.params.dbID) {
        item.collections.forEach((col) => {
          data.push({ _id: col._id, name: col.name, schema: JSON.parse(col.devSchema) });
        });
      }
      res.send(result);
    });
  });
}

// Signup middleware. If addDev function is changed, need to change function in test file.
function addDev(req, res, next) {
  var newDev = {
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    api: {
      apiKey: apiKey.generateKey(),
      secretKey: apiKey.generateKey(),
      clientKey: apiKey.generateKey(),
    },
  };

  Models.Dev.create(newDev, (err, result) => {
    if (err) res.json({ error: 'Error adding new developer' });
    var authKey = new Buffer(`${result.api.apiKey}: ${result.api.clientKey}`).toString('base64');
    var sheepToken = jwt.sign({
      secretKey: result.api.secretKey,
      authKey,
      userName: result.userName,
      devID: result._id,
      email: result.email,
      permissions: result.api.clientPermissions,
    }, 'sheep host', { expiresIn: '1 day' });
    req.body.dev = result;
    req.body.token = sheepToken;
    next();
  });
}

// login middleware
function usernameExist(req, res, next) {
  // to enable reuse of email for development purposes,
  // remove $or and the email portion of the query
  Models.Dev.findOne({ $or: [{ userName: req.body.userName }, { email: req.body.email }] }, 'userName email', (err, dev) => {
    if (dev === null) {
      next();
    } else {
      res.status(422).send({ error: 'Username/email exists, please choose another username' });
    }
  });
}

// create DB button middleware that adds to DB collection
function addDB(req, res, next) {
  var dev = req.body.dev;
  if (dev.database.length === 3) {
    res.status(422).send({ error: 'You have reached your database limit of 3' });
  }
  var db = new Models.DB({
    name: req.body.database,
    _creator: dev._id,
  });
  var collection = {
    name: req.body.collectionName,
    devSchema: req.body.schema,
  };
  db.collections.push(collection);
  db.save((err) => {
    if (err) res.status(409).send('Error');
    dev.database.push(db);
    dev.save(() => {
      req.body.db = db;
      req.body.dev = dev;
      next();
    });
  });
}

// create DB button middleware that actually spools up database
function createDevDB(req, res) {
  var devDB = sheepDB.useDb(`${req.body._id}_${req.body.database}`);
  var devModel = devDB.model('label', new mongoose.Schema({
    createdBy: String,
  }));
  devModel({
    createdBy: req.body.dev.userName,
  }).save((err) => {
    if (err) res.status(409).send('error');
    Models.DB.findOne({ _creator: req.body._id, name: req.body.database }, (error, db) => {
      if (error) res.json({ error: 'Error' });
      req.body.db = db;
      res.json(db);
    });
  });
}

// saves collection and schema name to devs record of DBs (does not actually instantiate)
function addCollection(req, res) {
  var collection = {
    name: req.body.collectionName,
    devSchema: req.body.schema,
  };
  Models.DB.findOneAndUpdate({ name: req.params.dbName }, { $push: { collections: collection } }, { new: true }, (err, db) => {
    if (err) res.status(409).send('error');
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
  verify,
};
