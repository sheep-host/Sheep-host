"use strict";

const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

//sheepDB_test.js: unit tests for Sheep DB methods and model.

describe('Sheep DB Test', function() {
	var testDB, testModel;

	before(function (done) {
		testDB = mongoose.connect('mongodb://localhost/testDB');
		
		testModel = testDB.model('Test', new mongoose.Schema({
			name: {type: String, required: true},
			password: {type: String, required: true}
		}));

		done();
	});

    describe('Test Database', function() {
        it('should save to Test Database', function(done) {
        	var errTest = false;
        	var testSave = testModel({
        		name: 'sheepy',
        		password: 'sleepy'
        	});
        	testSave.save(done);
        });

		it('should not save incorrect object to Test Database', function(done) {
			var testSave = testModel({
				name: 'sheepy',
				xassword: 'sleepy'
			});
			testSave.save(err => { 
        		if(err) { return done(); }
        		throw new Error('Should generate error');

        	});
		});

        it('should retrieve data from Test Database', function(done) {
        	testModel.find({name: 'sheepy'}, (err, sheep) => {
        		if(err) {throw err;} 
        		if(sheep.length === 0) {throw new Error('No data retrieved');}
        		done();
        	});
        });

        after(function(done){
        	mongoose.connection.db.dropDatabase(function(){
        		mongoose.connection.close(done);
        	});
        });
    });

});

//Create Dev User Tests

//CRUD middleware tests for Sheep DB