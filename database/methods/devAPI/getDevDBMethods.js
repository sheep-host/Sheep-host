import db from '../../sheepDB';
const mongoose = require('mongoose');
const Devs = require('../../models/devModel');

function validateDev(req, res, next){
	Devs.findById(req.params.dbId, function(err, dev){
		if(!dev){
			res.send(err);
		}
		req.body.dev = dev;
		next();
	})
}
function showAllData(req, res, next){
	const devModel = req.body.devModel;
	devModel.find({}, function(err, data){
		if (err) throw err;
		res.json(data);
	})
}

module.exports = { validateDev, showAllData };