import db from '../../sheepDB';
const mongoose = require('mongoose');

const Devs = require('../../models/devModel');

// on initial document insertion, validate that correct devDB is being accessed
function validateDev(req, res, next){
	Devs.findById(req.body.dbId, function(err, dev){
		if(!dev){
			res.send(err);
		}
		req.body.dev = dev;
		next();
	})
}

function populateDB(req, res, next){
	let dev = req.body.dev;
	let schema = JSON.parse(dev.database[0].collections[0].devSchema);
	let devDBName = dev.database[0].id + '_' + dev.database[0].name;
	const devDB = db.useDb(devDBName);
	const devModel = devDB.model(dev.database[0].collections[0].name, new mongoose.Schema(schema));
	devModel({username: req.body.name, password: req.body.type}).save(function(err, results){
		if (err) throw err;
		res.json(results);
	});
}

module.exports = { validateDev, populateDB };