var express = require('express');
var db = require('../../database/SheepDB');
var router = express.Router();
var devMethods = require('../../database/methods/devMethods');

router.get('/:devID',
  devMethods.getAllDatabases
)

router.get('/:devID/:dbID',
  devMethods.getAllCollections
)


module.exports = router;
