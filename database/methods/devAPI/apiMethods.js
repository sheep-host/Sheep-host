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
function updateDB(req, res, next){
	console.log(req.body);
	const id = req.params.id;
	res.send(200);
	// devModel.findOneAndUpdateAndUpdate(id, )
}

//DELETE
function remove(req, res, next){

}

module.exports = { showAllData, populateDB, updateDB, remove };