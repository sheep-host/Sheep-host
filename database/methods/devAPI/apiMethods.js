var mongoose = require('mongoose');
var Devs = require('../../models/devModel');

function storePost(req, res, next){
  console.log('post req body', req.body);
  var post = {};
  for(var key in req.body){
    post[key] = req.body[key];
  }
  res.locals.post = post;
  next();
}

function postToCollection(req, res, next){
  var post = res.locals.post;
  var devModel = req.body.devModel;
  devModel(post).save(function(err, results){
    if (err) res.json({ error: 'Error' });
    else {
      if(req.body.token) res.cookie('token', req.body.token, { maxAge: 600000 });
      res.status(200).json(results);
    }
  });
}

function getCollection(req, res, next){
  var devModel = req.body.devModel;
  devModel.find({}, function(err, data){
    if (err) res.status(401).send('error');
    res.json(data);
  });
}

function storePut(req, res, next){
  var put = {};
  for(var key in req.body){
    put[key] = req.body[key];
  }
  console.log('initial put object',put);
  res.locals.put = put;
  next();
}

function putToCollection(req, res, next){
  var put = res.locals.put;
  var devModel = req.body.devModel;
  var docID = req.params.docID;
  devModel.findOneAndUpdate(req.query, put, { new: true }, function(err, result){
    if (err) res.sendStatus(400,'Invalid input');
    console.log('result after put', result);
    res.json(result);
  })
}

function removeFromCollection(req, res, next){
  console.log('in remove');
  var devModel = req.body.devModel;
  var docID = req.params.docID;
  devModel.findOneAndRemove(req.query, function(err, result){
    if (err) res.sendsStatus(400,'Invalid input');
    res.sendStatus(200, 'Document removed');
  })
}

module.exports = { storePost, postToCollection, getCollection, storePut, putToCollection, removeFromCollection };
