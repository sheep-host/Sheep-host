import mongoose from 'mongoose';

const Devs = require('../../models/devModel');

//POST
function populateDB(req, res, next){
	const devModel = req.body.devModel;
	devModel({userName: req.body.userName, password: req.body.password}).save(function(err, results){
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
	res.locals.put = put;
	next();
}

function updateDB(req, res, next){
	// console.log(req.body);
	// console.log(req.body.put);
	const devModel = req.body.devModel;
	let put = res.locals.put;
	const id = req.params.id;
	devModel.findByIdAndUpdate(id, put, function(err, result){
		if (err) res.sendsStatus(400,'Invalid input');
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

module.exports = { storePut, showAllData, populateDB, updateDB, remove };