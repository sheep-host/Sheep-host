var express = require('express');
var sharedMethods = require('../../database/methods/shared/sharedMethods');
var cookieMethods = require('../../database/methods/cookieMethods');
var db = require('../../database/SheepDB');

var router = express.Router()

//VALIDATION / AUTHENTICATION GOES HERE!!!!!!!~~~~~~~~~~~~~~~
//and password confirmation

router.post('/',
	sharedMethods.checkPassword,
	cookieMethods.setCookie
);


module.exports = router;
