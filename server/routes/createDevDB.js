import express from 'express';
import devDbMethods from '../../database/methods/devDbMethods';

let router = express.Router()

router.post('/', devDbMethods.createDevDB, devDbMethods.updateDevProfile)



export default router;