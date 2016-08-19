import express from 'express';
import devMethods from '../../database/methods/devMethods';
import db from '../../database/sheepDB';

let router = express.Router()

//VALIDATION / AUTHENTICATION GOES HERE!!!!!!!~~~~~~~~~~~~~~~
//and password confirmation

router.post('/', devMethods.addDev)


export default router;