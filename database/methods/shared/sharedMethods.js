
var mongoose = require('mongoose');
var Devs = require('../../models/devModel');
var db = require('../../SheepDB');
var jwt = require ('jsonwebtoken');

function checkPassword(req, res, next){
	if(!req.body.userName){
		res.status(400).send('Username required');
		return;
	}
	if(!req.body.password){
		res.status(400).send('Password required');
		return;
	}
	Devs.findOne({userName: req.body.userName},function(err, dev){
		dev.comparePassword(req.body.password, function(err, isMatch){
			if (err) throw err;
			if(!isMatch){
				res.status(401).send('Invalid Password');
			}
			else{
				var devToken = jwt.sign({userName: dev.userName}, 'sheep host', { expiresIn: 60});
				console.log(devToken);
				req.body.token = devToken;
				req.body.dev = dev;
				next();
			}
		})

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

function validateDev(req, res, next){
	Devs.findById(req.params.dbId, function(err, dev){
		if(!dev){
			res.status(422).send('Incorrect user information');
		}
		else{
			req.body.dev = dev;
			next();
		}
	})
}

function openDB(req, res, next){
	var dev = req.body.dev;
	if(dev.database[0]){
		var schema = JSON.parse(dev.database[0].collections[0].devSchema);
		var devDBName = dev._id + '_' + dev.database[0].name;
		var devDB = db.useDb(devDBName);
		var devModel = devDB.model(dev.database[0].collections[0].name, new mongoose.Schema(schema));
		req.body.devModel = devModel;
	}
	next();
}

module.exports = { checkPassword, extractId, validateDev, openDB };
