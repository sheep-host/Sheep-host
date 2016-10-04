var express = require('express');
var devMethods = require('../../database/methods/devMethods');
var apiController = require('../../database/methods/apiKeyMethods');

var router = express.Router();

router.get('/:devID',
	apiController.checkJwt,
  devMethods.getAllDatabases
);

router.get('/:devID/:dbID',
  devMethods.getAllCollections
);


module.exports = router;
