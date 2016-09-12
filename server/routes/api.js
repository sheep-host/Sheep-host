var express = require('express');
var apiMethods = require('../../database/methods/apiMethods');
var apiController = require('../../database/methods/apiKeyMethods');
var sharedMethods = require('../../database/methods/sharedMethods');

var router = express.Router()

// post to existing collection
router.post('/:devID/:dbName/:colName',
  apiController.checkJwt,
  apiController.parseKey,
  apiController.keyCheck,
  apiController.keyPermissions,
  apiMethods.storePost,
  sharedMethods.checkDevID,
  sharedMethods.openDB,
  apiMethods.postToCollection
);

// get entire collection
router.get('/:devID/:dbName/:colName',
  apiController.checkJwt,
  apiController.parseKey,
  apiController.keyCheck,
  apiController.keyPermissions,
  sharedMethods.checkDevID,
  sharedMethods.openDB,
  apiMethods.getCollection
);

// modify existing document
router.put('/:devID/:dbName/:colName',
  apiController.checkJwt,
  apiController.parseKey,
  apiController.keyCheck,
  apiController.keyPermissions,
  apiMethods.storePut,
  sharedMethods.checkDevID,
  sharedMethods.openDB,
  apiMethods.putToCollection
);

// delete existing document
router.delete('/:devID/:dbName/:colName',
  apiController.checkJwt,
  apiController.parseKey,
  apiController.keyCheck,
  apiController.keyPermissions,
  sharedMethods.checkDevID,
  sharedMethods.openDB,
  apiMethods.removeFromCollection
);


module.exports = router;
