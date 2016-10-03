var express = require('express');
var apiController = require('../../database/methods/apiKeyMethods');

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
