import express from 'express';
import devDbMethods from '../../database/methods/devDbMethods';
import sharedMethods from '../../database/methods/shared/sharedMethods';

let router = express.Router();

router.post('/', sharedMethods.extractId, devDbMethods.createDevDB, devDbMethods.updateDevProfile);

export default router;