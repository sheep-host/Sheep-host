"use strict";

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var chai = require('chai');
var expect = chai.expect;
var api = require('../database/methods/devAPI/api-key-controller');
var Models = require('../database/models/devModel');

//added addDev function directly to test file to avoid potential MongoDB connection issues.
function addDev(req, res, next){
  var newDev ={
    userName: req.body.userName,
    password: req.body.password,
    api: {
      apiKey: api.generateKey(),
      secretKey: api.generateKey(),
      clientKey: api.generateKey()
    }
  };

  Models.Dev.create(newDev, function(err, result){
    if(err) throw err;
    req.body.dev = result;
    next();
  });
}

describe('API Key Generator', function() {
  xit('generateKey function should generate an API key string with length of 36 using Node UUID', function() {
    expect(api.generateKey()).be.a('string');
    expect(api.generateKey().length).to.equal(36);
  });
  xit('And should generate a (psuedo-randomly) different API key string everytime it is invoked', function() {
    expect(api.generateKey()).be.a('string');
    expect(api.generateKey().length).to.equal(36);
    expect(api.generateKey().length).to.not.equal(api.generateKey());
  });
});

describe('API Key Parser', function() {
  xit('parseKey function parses API key and saves correctly decoded values to res.locals.apikey', function(done) {
    //mocked req, res
    var req = { headers: {authorization: 'Basic: OTVkM2FmMDYtMTllZC00NTY0LTkxYTktYmQ2MzMwYjQ1MTlmOjM5MWY2YjIxLWUxMmYtNDY5Ny04MWFkLTVmOWZhMGVmOWJiMQ=='}};
    var res = {locals: { apikey: {} }};
    var key = '95d3af06-19ed-4564-91a9-bd6330b4519f';
    var access = '391f6b21-e12f-4697-81ad-5f9fa0ef9bb1';

    api.parseKey(req,res,function(){
      if(res.locals.apikey.key === key && res.locals.apikey.access === access){
        done();
      } else {
        throw new Error('Incorrect key or password')
      }
    });
     
  });

});

describe('API DB Tests', function() {
  var db;

  before(function (done) {
    mongoose.connect('mongodb://localhost/apiDB');
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      done();
    }); 
  });

  describe('DB specific API function tests', function() {
    var res;
    xit('addDev function saves to API test database', function(done) {
 
      addDev( 
      // call function with expected data structure for req.body
        {
            body: {
                userName: 'Sheepy',
                password: 'Sleepy',
            }
        },
        // There is no res in addDev function so mocking an empty object so function works 
        {}, 
        () => {
          Models.Dev.find({userName: 'Sheepy'}, (err, dev) => {
            if(err) {throw err;}
            res = {
              locals: { 
                apikey: {
                  key: dev[0].api.apiKey,
                  access: dev[0].api.clientKey,
                  method: 'POST',
                  permissions: null,
                  master: null,
                  secretKey: dev[0].api.secretKey, //included for test but not in actual parseKey function
                  apiKey: dev[0].api.apiKey, //included for test but not in actual parseKey function 
                  clientKey: dev[0].api.clientKey, //included for test but not in actual parseKey function
                  test: null, //included for test but not in actual parseKey function
                  clientPermissions: dev[0].api.clientPermissions //included for test not in actua parsekey function  
                }
              },
              json: (obj) => {
                res.locals.apikey.test = false;
                res.callback(); // included for test
              },
              callback : () => {} // included for test
            };
            done();
          });
        }
      );            
    });

    
    xit('keyCheck function queries database to confirm API key, Client key is valid, and sets permission', function() {
      var test = new Promise(function(resolve, reject) {
        api.keyCheck({},res,()=> {
          res.locals.apikey.test = true;
          resolve(res.locals.apikey); 
        });
      });

      return test.then(function(result){
        expect(result.master).to.equal(false);
        expect(result.permissions).to.equal(true);
        expect(result.test).to.equal(true);
        result.master = null;
        result.permissions = null;
        result.test = null;
      });
    });

    xit('keyCheck function queries database to confirm API key, secret key is valid, and sets permission', function() {
      var test = new Promise(function(resolve, reject) {
        res.locals.apikey.access = res.locals.apikey.secretKey;
        api.keyCheck({},res,()=> {
          res.locals.apikey.test = true;
          resolve(res.locals.apikey); 
        });
      });

      return test.then(function(result){
        expect(result.master).to.equal(true);
        expect(result.permissions).to.equal(true);
        expect(result.test).to.equal(true);
        result.access = result.clientKey;
        result.master = null;
        result.permissions = null;
        result.test = null;
      });
    });

    xit('Invalid API key returns error object', function() {
      var test = new Promise(function(resolve, reject) {
        res.locals.apikey.key = 1;
        res.callback = () => { 
          resolve(res.locals.apikey);
        }
        api.keyCheck({},res,()=> {});
      });

      return test.then(function(result){
        expect(result.key).to.equal(1);
        expect(result.test).to.equal(false);
        expect(result.master).to.equal(null);
        expect(result.permissions).to.equal(null);
        result.key = result.apiKey;
        result.test = null;
      });
    });

    xit('Invalid client access key returns error object', function() {
      var test = new Promise(function(resolve, reject) {
        res.locals.apikey.access = 1;
        res.callback = () => { 
          resolve(res.locals.apikey);
        }
        api.keyCheck({},res,()=> {});
      });

      return test.then(function(result){
        expect(result.access).to.equal(1);
        expect(result.test).to.equal(false);
        expect(result.master).to.equal(null);
        expect(result.permissions).to.equal(null);
        result.access = result.clientKey;
        result.test = null;
      });
    });

    xit('keyPermissions checks client key res.locals.apikey.permissions is valid', function() {
      var test = new Promise(function(resolve, reject) {
        api.keyCheck({},res,()=> {
          resolve(res.locals.apikey); 
        });
      });

      return test.then(function(result){
        expect(result.permissions).to.equal(true);
        result.permissions = null;
      });
    });

    xit('keyPermissions checks secret key res.locals.apikey.permissions is valid', function() {
      var test = new Promise(function(resolve, reject) {
        res.locals.apikey.access = res.locals.apikey.secretKey;
        api.keyCheck({},res,()=> {
          resolve(res.locals.apikey); 
        });
      });

      return test.then(function(result){
        expect(result.master).to.equal(true);
        expect(result.permissions).to.equal(true);
        result.access = result.clientKey;
        result.master = null;
        result.permissions = null;
      });
    });

    xit('updatePermissions updates CRUD permissions for client key', function() {
      var test = new Promise(function(resolve, reject) {
        res.locals.apikey.access = res.locals.apikey.secretKey;
        res.locals.apikey.master = true;
        res.locals.apikey.permissions = true;
        res.callback = () => { 
          resolve(res.locals.apikey.clientPermissions);
        }
        
        api.updatePermissions({
          body : {
            get: true,
            post: true,
            put: true,
            del: true
          }
        },res,()=> {});

      });

      return test.then(function(result){
        expect(result.DELETE).to.equal(false);
        expect(result.PUT).to.equal(false);
        Models.Dev.find({userName: 'Sheepy'}, (err, dev) => {
          if(err) {throw err;}
          expect(dev[0].api.clientPermissions.DELETE).to.equal(true);
          expect(dev[0].api.clientPermissions.PUT).to.equal(true);
          res.locals.apikey.access = res.locals.apikey.clientKey;
          res.locals.apikey.master = null;
          res.locals.apikey.permissions = null;
        });
      });            
    });
  });
  

  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
  
});

//Hardcoded API key info for future testing
// var apiKeyHC = '90f35633-7e99-4c30-a2d4-011a911305e6'
// var apiSecretHC = 'a19458e8-1ebc-4979-9f97-06e5e99dab19'
// var apiKey = apiKeyHC
// var secretKey = apiSecretHC
// var combinedKey = apiKey+':'+secretKey;
// var encodedData = new Buffer(combinedKey).toString('base64');
// var authorizationHeader = 'Basic: ' + encodedData;
// var authHeaderHC = 'Basic: OTBmMzU2MzMtN2U5OS00YzMwLWEyZDQtMDExYTkxMTMwNWU2OmExOTQ1OGU4LTFlYmMtNDk3OS05Zjk3LTA2ZTVlOTlkYWIxOQ=='
// var authorizationSplit = authorizationHeader.split(' ')[1];
// var decoded = new Buffer(authorizationSplit, 'base64').toString('utf8');
// var decodedApiKey = decoded.split(':')[0]
// var decodedSecretKey = decoded.split(':')[1]

// console.log('apiKey', apiKey);
// console.log('secretKey', secretKey);
// console.log('combinedKey', combinedKey);
// console.log('encodedData', encodedData);
// console.log('authorizationHeader', authorizationHeader);
// console.log('authorizationSplit', authorizationSplit);
// console.log('decoded', decoded);
// console.log('decodedApiKey bool', decodedApiKey === apiKey);
// console.log('decodedSecretKey bool', decodedSecretKey === secretKey);