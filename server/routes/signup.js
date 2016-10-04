var express = require('express');
var devMethods = require('../../database/methods/devMethods');
var cookieMethods = require('../../database/methods/cookieMethods');

var router = express.Router();

router.post('/',
  devMethods.usernameExist,
  devMethods.sendVerification
  // comment in sendVerification and comment out 2 below to disable email verification in development
  // devMethods.addDev,
  // cookieMethods.setCookie
);

router.get('/verify/:key',
  devMethods.verify,
  devMethods.addDev,
  cookieMethods.setCookie
);

module.exports = router;
