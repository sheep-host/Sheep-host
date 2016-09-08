var uuid = require('node-uuid');
var Models = require('../../models/devModel');
var jwt = require ('jsonwebtoken');

//Create an API key using UUID v4 which generates from random (or pseudo-random) id. 
function generateKey(){
  return uuid.v4();
}

function checkJwt(req, res, next){
  console.log('req body permissions', req.body)
  if(!req.headers.authorization){
    res.json({ error: 'Credentials missing' });
  } else {
    var tokenHeader = req.headers.authorization.split(' ')[0];
    console.log('tokenheader',tokenHeader)
    if(tokenHeader === 'Bearer'){
      var token = req.headers.authorization.split(' ')[1];
      console.log('token', token);
      jwt.verify(token, 'sheep host', function(err, decoded){
        if(!decoded) res.status(401).send(err);
        if(decoded.exp*1000 < Date.now()) res.json({ error: 'Token out of date' });
        decoded.exp += (60*60*24);
        res.locals.token = token;
        res.locals.apikey = {
          key: req.body.apiKey,
          permissions: true,
          master: true
        }
        console.log('apikey')
        next();
      });
    }
    else next();
  }
}

//Parse keys from req.headers.authorization
//There may be CORS issues that need to be addressed
function parseKey(req, res, next){
  console.log('res.locals.token in parsekey', res.locals.token);
  if(res.locals.token){
    next();
  } else {
    if(!req.headers.authorization){
      res.json({ error: 'Credentials missing' });
    }
    else{
      var encoded = req.headers.authorization.split(' ')[1];
      var decoded = new Buffer(encoded, 'base64').toString('utf8');
    	res.locals.apikey = {
    	  key: decoded.split(':')[0],
    	  access: decoded.split(':')[1],
    	  method: req.method,
    	  permissions: null,
        master: null
      }
    	next();
    }
  }
}

//Query database to confirm api key and secret/client key match and set permissions in res.locals
function keyCheck(req, res, next){
  console.log('res.locals.token in keycheck', res.locals.token);
  if(res.locals.token){
    next();
  } else{
    var query = {'api.apiKey' : res.locals.apikey.key};
    Models.Dev.findOne(query, {}, function(err, dev) {
      if(dev === null) {
        res.json({error: 'Not Valid'});
      } else if(dev.api.clientKey === res.locals.apikey.access || dev.api.secretKey === res.locals.apikey.access) {
        var permission = dev.api.secretKey === res.locals.apikey.access
        res.locals.apikey.permissions = permission ? true : dev.api.clientPermissions[res.locals.apikey.method];
        res.locals.apikey.master = permission ? true : false;
        next();
      } else {
        res.json({error: 'Not Valid'});
      }
    })
  }
}

//Checks client key vs. permissions. Must run parseKey and keyCheck before.
function keyPermissions(req, res, next){
  console.log('res.locals.token in key permissions', res.locals.token);
  if(res.locals.token){
    next();
  }
  else if(res.locals.apikey.permissions){
        console.log('why is this line logging');

    next();
  } else {
    res.json({error: 'Not Valid'});
  }
}

//Checks master key status in res.locals.apikey. Must run parseKey and keyCheck before.
function masterKey(req, res, next){
  if(res.locals.apikey.master){
    next();
  } else {
    res.json({error: 'Not Valid'});
  }
}

//Set client key specific permissions - CRUD true/false
function updatePermissions(req, res, next){
  console.log('updatepermissions', req.body);
  console.log(res.locals.apikey.key);
  if(res.locals.apikey.master){
    var query = {'api.apiKey' : res.locals.apikey.key};
    console.log('query', query);
    var client = req.body.permissions;
    Models.Dev.findOneAndUpdate(query, { $set: {"api.clientPermissions": client}}, {new: true}, function(err, dev) {
      if (err) res.status(404).send(err);
      console.log('permissionsupdated', dev);
      res.json('updated');
    });
  } else {
    res.json({error: 'Not Valid'});
  }
}



module.exports = { checkJwt, generateKey, parseKey, keyCheck, keyPermissions, masterKey, updatePermissions };

//Hardcoded API key info for future testing
// var apiKeyHC = 'ba359df7-f88e-49f1-be3b-0222621479f6'
// var apiSecretHC = '7cfb9a76-f253-4687-973d-eed229136aac'
// var apiClientKeyHC = '6cde2128-bb01-4ece-a18f-a0b7a2aef251'
// var apiKey = apiKeyHC
// var secretKey = apiClientKeyHC//apiSecretHC
// var combinedKey = apiKey+':'+secretKey;
// var encodedData = new Buffer(combinedKey).toString('base64');
// var authorizationHeader = 'Basic: ' + encodedData;
// var authorizationSplit = authorizationHeader.split(' ')[1];
// var decoded = new Buffer(authorizationSplit, 'base64').toString('utf8');
// var decodedApiKey = decoded.split(':')[0]
// var decodedSecretKey = decoded.split(':')[1]

// console.log('apiKey', apiKey);
// console.log('secretKey', secretKey);
// console.log('combinedKey', combinedKey);
// console.log('encodedData', encodedData);
//console.log('authorizationHeader', authorizationHeader);
// console.log('authorizationSplit', authorizationSplit);
// console.log('decoded', decoded);
// console.log('decodedApiKey bool', decodedApiKey === apiKey);
// console.log('decodedSecretKey bool', decodedSecretKey === secretKey);
