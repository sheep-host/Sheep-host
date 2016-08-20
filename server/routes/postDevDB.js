import express from 'express';
import postDevDBMethods from '../../database/methods/devAPI/postDevDBMethods';
import sharedMethods from '../../database/methods/shared/sharedMethods';

let router = express.Router()

router.post('/', postDevDBMethods.validateDev, sharedMethods.openDB, postDevDBMethods.populateDB);

export default router;