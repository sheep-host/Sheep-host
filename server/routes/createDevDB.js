import express from 'express';
import devDbMethods from '../../database/methods/devDbMethods';
import sharedMethods from '../../database/methods/shared/sharedMethods';
import cookieMethods from '../../database/methods/cookieMethods';

let router = express.Router();

router.post('/',
  sharedMethods.extractId,
  devDbMethods.createDevDB,
  devDbMethods.updateDevProfile,
  cookieMethods.setDatabaseCookieTrue
);

export default router;
