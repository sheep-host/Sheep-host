import express from 'express';
import getDevDBMethods from '../../database/methods/devAPI/getDevDBMethods';
import postDevDBMethods from '../../database/methods/devAPI/postDevDBMethods';
import sharedMethods from '../../database/methods/shared/sharedMethods';

let router = express.Router()

router.get('/:dbId', getDevDBMethods.validateDev, sharedMethods.openDB, getDevDBMethods.showAllData);

export default router;