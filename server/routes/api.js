import express from 'express';
import apiMethods from '../../database/methods/devAPI/apiMethods';
import sharedMethods from '../../database/methods/shared/sharedMethods';

let router = express.Router()

router.get('/:dbId', sharedMethods.validateDev, sharedMethods.openDB, apiMethods.showAllData);

router.post('/:dbId', sharedMethods.validateDev, sharedMethods.openDB, apiMethods.populateDB);

router.put('/:dbId/:id', sharedMethods.validateDev, sharedMethods.openDB, apiMethods.updateDB);

router.delete('/:dbId/:id', sharedMethods.validateDev, sharedMethods.openDB, apiMethods.remove);

export default router;