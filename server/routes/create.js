var express = require('express');
var devMethods = require('../../database/methods/devMethods');
var sharedMethods = require('../../database/methods/sharedMethods');
var cookieMethods = require('../../database/methods/cookieMethods');
var schemaParser = require('../../database/methods/schemaParser')
var db = require('../../database/SheepDB');

var router = express.Router();

// create new database and collection
router.post('/database',
  schemaParser.schemaCheck,
  sharedMethods.checkDevID,
  devMethods.addDB,
  devMethods.createDevDB
);

// create new collection to existing database
router.post('/:devID/:dbName',
  sharedMethods.checkDevID,
  devMethods.addCollection
)

module.exports = router;
