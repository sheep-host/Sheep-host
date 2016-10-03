var express = require('express');
var devMethods = require('../../database/methods/devMethods');
var sharedMethods = require('../../database/methods/sharedMethods');
var schemaParser = require('../../database/methods/schemaParser');

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
	schemaParser.schemaCheck,
  sharedMethods.checkDevID,
  devMethods.addCollection
);

module.exports = router;
