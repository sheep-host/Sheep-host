var express = require('express');
var apiMethods = require('../../database/methods/devAPI/apiMethods');
var sharedMethods = require('../../database/methods/shared/sharedMethods');

var router = express.Router()

router.get('/:dbId', sharedMethods.validateDev, sharedMethods.openDB, apiMethods.showAllData);

router.post('/:dbId', apiMethods.storePost, sharedMethods.validateDev, sharedMethods.openDB, apiMethods.populateDB);

router.put('/:dbId/:id', apiMethods.storePut, sharedMethods.validateDev, sharedMethods.openDB, apiMethods.updateDB);

router.delete('/:dbId/:id', sharedMethods.validateDev, sharedMethods.openDB, apiMethods.remove);

module.exports = router;
