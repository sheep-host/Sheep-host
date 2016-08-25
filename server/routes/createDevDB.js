var express = require('express');
var devDbMethods = require('../../database/methods/devDbMethods');
var sharedMethods = require('../../database/methods/shared/sharedMethods');
var cookieMethods = require('../../database/methods/cookieMethods');
var db = require('../../database/SheepDB');

var router = express.Router();

router.post('/',
  sharedMethods.extractId,
  devDbMethods.createDevDB,
  devDbMethods.updateDevProfile,
  cookieMethods.setDBCookie,
  cookieMethods.setDatabaseCookieTrue
);

module.exports = router;
