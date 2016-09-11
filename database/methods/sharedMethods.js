var mongoose = require('mongoose');
var jwt = require ('jsonwebtoken');
var Models = require('../models/devModel');
var sheepDB = require('../SheepDB');

// match password on login
function checkPassword(req, res, next){
  console.log('login body', req.body);
  if(!req.body.userName){
    res.status(400).send('Username required');
    return;
  }
  if(!req.body.password){
    res.status(400).send('Password required');
    return;
  }
  Models.Dev.findOne({userName: req.body.userName}).
  populate('database').
  exec(function(err, dev){
    if(dev === null){
    res.status(401).send('Invalid Username or Password');
    return;
    }
    console.log('dev in checkpassword', dev);
    dev.comparePassword(req.body.password, function(err, isMatch){
      if (err) res.status(401).send('error');
      if(!isMatch){
        res.status(401).send('Invalid Username or Password');
      } else{
        var authKey = new Buffer(dev.api.apiKey + ':' + dev.api.clientKey).toString('base64')
        var sheepToken = jwt.sign({
          secretKey: dev.api.secretKey,
          authKey: authKey,
          userName: dev.userName,
          devID: dev._id,
          email: dev.email,
          permissions: dev.api.clientPermissions
        }, 'sheep host', { expiresIn: 120000});
        console.log('server side token', sheepToken);
        req.body.token = sheepToken;
        req.body.dev = dev;
        next();
	  }
    });
  });
}

// temporary security check to prevent spooling up new DBs with incorrect devID
function checkDevID(req,res,next){
  var _id;
  if(req.params.devID){
    _id = req.params.devID;
  } else {
    _id = req.body._id;
  }
  console.log('check id',_id);
  Models.Dev.findById(_id, function(err, dev){
    if(!dev){
      res.sendStatus(404);
    } else {
      req.body.dev = dev;
      next();
    }
  });
}

// reused middleware to open DB pool connection
function openDB(req, res, next){
  var devID = req.params.devID;
  var dbName = req.params.dbName;
  var colName = req.params.colName;
  console.log(colName);
  Models.DB.findOne({name: dbName, 'collections.name': colName}, {"collections.$":1}, function(err, result){
    console.log('openDB', result);
    var col = result.collections[0];
    var colName = col.name;
    var schema = JSON.parse(col.devSchema);
    var devDB = sheepDB.useDb(devID + '_' + dbName);
    var devModel = devDB.model(colName, new mongoose.Schema(schema));
    req.body.devModel = devModel;
    next();
  });
}

module.exports = { checkPassword, checkDevID, openDB };
