var express = require('express');
var db = require('../../database/SheepDB');
var router = express.Router();
var devMethods = require('../../database/methods/devMethods');
var apiController = require('../../database/methods/apiKeyMethods');


router.get('/:devID',
	apiController.checkJwt,
  devMethods.getAllDatabases
)

router.get('/:devID/:dbID',
  devMethods.getAllCollections
)


module.exports = router;
