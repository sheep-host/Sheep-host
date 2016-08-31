
var mongoose = require('mongoose');
var Models = require('../../models/devModel');
var sheepDB = require('../../SheepDB');
var jwt = require ('jsonwebtoken');

// match password on login
function checkPassword(req, res, next){
	console.log('login body', req.body);
	if(!req.body.userName){
		res.status(400).send('Username required');
		return;
	}
	if(!req.body.password){
		res.status(400).send('Password required');
		return;
	}
	Models.Dev.findOne({userName: req.body.userName},function(err, dev){
		dev.comparePassword(req.body.password, function(err, isMatch){
			if (err) throw err;
			if(!isMatch){
				res.status(401).send('Invalid Password');
			}
			else{
				var sheepToken = jwt.sign({userName: dev.userName, devID: dev._id}, 'sheep host', { expiresIn: 120000});
				console.log('server side token', sheepToken);
				req.body.token = sheepToken;
				req.body.dev = dev;
				next();
			}
		});
	});
}

// temporary security check to prevent spooling up new DBs with incorrect devID
function checkDevID(req,res,next){
	var _id;
	if(req.params.devID){
		_id = req.params.devID;
	}
	else _id = req.body._id;
	console.log('check id',_id);
	Models.Dev.findById(_id, function(err, dev){
		if(!dev){
			res.sendStatus(404);
		}
		else{
			req.body.dev = dev;
			next();
		}
	});
}

// reused middleware to open DB pool connection
function openDB(req, res, next){
	var devID = req.params.devID;
	var dbName = req.params.dbName;
	var colID = req.params.colID;
	Models.DB.findOne({name: dbName}, function(err, result){
		console.log('openDB', result);
		var col = result.collections.id(colID);
		var colName = col.name;
		var schema = JSON.parse(col.devSchema);
		var devDB = sheepDB.useDb(devID + '_' + dbName);
		var devModel = devDB.model(colName, new mongoose.Schema(schema));
		req.body.devModel = devModel;
		next();
	});
}

module.exports = { checkPassword, checkDevID, openDB };
