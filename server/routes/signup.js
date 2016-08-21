import express from 'express';
import devMethods from '../../database/methods/devMethods';
import db from '../../database/sheepDB';
import cookieMethods from '../../database/methods/cookieMethods.js';

let router = express.Router()

//VALIDATION / AUTHENTICATION GOES HERE!!!!!!!~~~~~~~~~~~~~~~
//and password confirmation

router.post('/', devMethods.usernameExist, devMethods.addDev, cookieMethods.setCookie);


export default router;
