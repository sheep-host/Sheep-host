import mongoose from 'mongoose';

const Devs = require('../../models/devModel');

// on initial document insertion, validate that correct devDB is being accessed
function validateDev(req, res, next){
	Devs.findById(req.body.dbId, function(err, dev){
		if(!dev){
			res.send(err);
		}
		req.body.dev = dev;
		next();
	});
}

function populateDB(req, res, next){
	const devModel = req.body.devModel;
	devModel({username: req.body.username, password: req.body.password}).save(function(err, results){
		if (err) throw err;
		res.json(results);
	});
}

module.exports = { validateDev, populateDB };