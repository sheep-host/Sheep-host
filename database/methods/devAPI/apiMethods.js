var mongoose = require('mongoose');

var Devs = require('../../models/devModel');

//POST
function storePost(req, res, next){
	var post = {};
	for(var key in req.body){
		post[key] = req.body[key];
	}
	res.locals.post = post;
	next();
}

function populateDB(req, res, next){
	var post = res.locals.post;
	var devModel = req.body.devModel;
	devModel(post).save(function(err, results){
		if (err) throw err;
		else res.status(200).json(results);
	});
}

//GET
function showAllData(req, res, next){
	var devModel = req.body.devModel;
	if(devModel){
		if(req.query){
			devModel.find(req.query, function(err, data){
				if (err) res.status(422).send('Record not found');
				res.json(data);
			})
		}
		else{
			devModel.find({}, function(err, data){
				if (err) throw err;
				res.json(data);
			})
		}
	} else{
		res.sendStatus(204);
	}
}

//PUT
function storePut(req, res, next){
	var put = {};
	for(var key in req.body){
		put[key] = req.body[key];
	}
	console.log('initial put object',put);
	res.locals.put = put;
	next();
}

function updateDB(req, res, next){
	// console.log(req.body);
	// console.log(req.body.put);
	var devModel = req.body.devModel;
	var put = res.locals.put;
	var id = req.params.id;
	console.log('put after middleware', put, id);
	devModel.findByIdAndUpdate(id, put, {new: true}, function(err, result){
		if (err) res.sendStatus(400,'Invalid input');
		console.log('result after put', result);
		res.json(result);
	})
}

//DELETE
function remove(req, res, next){
	var devModel = req.body.devModel;
	var id = req.params.id;
	devModel.findByIdAndRemove(id, function(err, result){
		if (err) res.sendsStatus(400,'Invalid input');
		console.log('devared');
		res.sendStatus(200, 'Document removed');
	})
}

module.exports = { storePost, storePut, showAllData, populateDB, updateDB, remove };
