var express = require('express');
var apiController = require('../../database/methods/apiKeyMethods');
var db = require('../../database/SheepDB');

var router = express.Router();

// change API client key permissions
router.post('/',
  apiController.checkJwt,
  apiController.parseKey,
  apiController.keyCheck,
  apiController.masterKey,
  apiController.updatePermissions
);

module.exports = router;
