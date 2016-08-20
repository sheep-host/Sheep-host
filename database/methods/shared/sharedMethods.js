import mongoose from 'mongoose';
import Devs from'../../models/devModel';
import db from '../../sheepDB';



function extractId(req, res, next){
	Devs.findOne({userName: req.body.userName},function(err, dev){
		req.body.dbId = dev._id;
		next();
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

module.exports = { extractId, openDB };
