var express = require('express');
var apiMethods = require('../../database/methods/devAPI/apiMethods');
var apiController = require('../../database/methods/devAPI/api-key-controller');
var sharedMethods = require('../../database/methods/shared/sharedMethods');

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
router.get('/:devID/:dbName/:colID',
	apiController.checkJwt,
	apiController.parseKey,
	apiController.keyCheck,
	apiController.keyPermissions,
	sharedMethods.checkDevID,
	sharedMethods.openDB,
	apiMethods.getCollection
);

// modify existing document
router.put('/:devID/:dbName/:colID/:docID',
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
router.delete('/:devID/:dbName/:colID/:docID',
	apiController.checkJwt,
	apiController.parseKey,
	apiController.keyCheck,
	apiController.keyPermissions,
	sharedMethods.checkDevID,
	sharedMethods.openDB,
	apiMethods.removeFromCollection
);

// old API routes
// router.get('/:dbId', sharedMethods.validateDev, sharedMethods.openDB, apiMethods.showAllData);

// router.post('/:dbId', apiMethods.storePost, sharedMethods.validateDev, sharedMethods.openDB, apiMethods.populateDB);

// router.put('/:dbId/:id', apiMethods.storePut, sharedMethods.validateDev, sharedMethods.openDB, apiMethods.updateDB);

// router.delete('/:dbId/:id', sharedMethods.validateDev, sharedMethods.openDB, apiMethods.remove);

module.exports = router;
