import express from 'express';
import sharedMethods from '../../database/methods/shared/sharedMethods';
import db from '../../database/sheepDB';

let router = express.Router()

//VALIDATION / AUTHENTICATION GOES HERE!!!!!!!~~~~~~~~~~~~~~~
//and password confirmation

router.post('/', sharedMethods.checkPassword);


export default router;