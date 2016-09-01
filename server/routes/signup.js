var express = require('express');
var devMethods = require('../../database/methods/devMethods');
var db = require('../../database/SheepDB');
var cookieMethods = require('../../database/methods/cookieMethods.js');

var router = express.Router()

//VALIDATION / AUTHENTICATION GOES HERE!!!!!!!~~~~~~~~~~~~~~~
//and password confirmation

router.post('/', devMethods.usernameExist, devMethods.sendVerification);

router.get('/verify/:key', devMethods.verify, devMethods.addDev, cookieMethods.setCookie);

module.exports = router;
