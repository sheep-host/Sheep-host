var express = require('express');
var sharedMethods = require('../../database/methods/sharedMethods');
var cookieMethods = require('../../database/methods/cookieMethods');

var router = express.Router();

router.post('/',
  sharedMethods.checkPassword,
  cookieMethods.setCookie
);


module.exports = router;
