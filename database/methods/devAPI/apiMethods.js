import mongoose from 'mongoose';

const Devs = require('../../models/devModel');

//POST
function storePost(req, res, next){
	let post = {};
	for(let key in req.body){
		post[key] = req.body[key];
	}
	res.locals.post = post;
	next();
}

function populateDB(req, res, next){
	const post = res.locals.post;
	const devModel = req.body.devModel;
	devModel(post).save(function(err, results){
		if (err) throw err;
		else res.status(200).json(results);
	});
}

//GET
function showAllData(req, res, next){
	const devModel = req.body.devModel;
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
}

//PUT
function storePut(req, res, next){
	let put = {};
	for(let key in req.body){
		put[key] = req.body[key];
	}
	console.log('initial put object',put);
	res.locals.put = put;
	next();
}

function updateDB(req, res, next){
	// console.log(req.body);
	// console.log(req.body.put);
	const devModel = req.body.devModel;
	let put = res.locals.put;
	const id = req.params.id;
	console.log('put after middleware', put, id);
	devModel.findByIdAndUpdate(id, put, {new: true}, function(err, result){
		if (err) res.sendStatus(400,'Invalid input');
		console.log('result after put', result);
		res.json(result);
	})
}

//DELETE
function remove(req, res, next){
	const devModel = req.body.devModel;
	const id = req.params.id;
	devModel.findByIdAndRemove(id, function(err, result){
		if (err) res.sendsStatus(400,'Invalid input');
		console.log('deleted');
		res.sendStatus(200, 'Document removed');
	})
}

module.exports = { storePost, storePut, showAllData, populateDB, updateDB, remove };