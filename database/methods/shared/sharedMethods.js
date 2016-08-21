import mongoose from 'mongoose';
import Devs from'../../models/devModel';
import db from '../../sheepDB';

function checkPassword(req, res, next){
	Devs.findOne({userName: req.body.userName, password: req.body.password},function(err, dev){
		console.log(dev);
		if(dev === null){
			console.log('dev is null');
			res.status(422).send('Incorrect username/password');
		}
		else{
			// res.send(true); // changed to call next() to accomidate cookie setting functionality
      req.body.dev = dev;
      next();
		}
	});
}

function extractId(req, res, next){
	console.log('extractID/req.body.userName: ', req.body.userName);
	Devs.findOne({userName: req.body.userName},function(err, dev){
		console.log('dev: ', dev);
		if(dev === null){
			console.log('dev is null');
			res.status(422).send('Incorrect username/password');
		}
		else{
			req.body.dbId = dev._id;
			next();
		}
	});
}

function openDB(req, res, next){
	let dev = req.body.dev;
	let schema = JSON.parse(dev.database[0].collections[0].devSchema);
	let devDBName = dev._id + '_' + dev.database[0].name;
	const devDB = db.useDb(devDBName);
	const devModel = devDB.model(dev.database[0].collections[0].name, new mongoose.Schema(schema));
	req.body.devModel = devModel;
	next();
}

module.exports = { checkPassword, extractId, openDB };
