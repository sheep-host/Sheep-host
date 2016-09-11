"use strict";

const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const Dev = require('../database/models/devModel');

//Tests for Dev model.

describe('Sheep DB Test', function() {

	before(function (done) {
        mongoose.connect('mongodb://localhost/testDB');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
          console.log('We are connected!');
          done();
        });	
	});

    describe('Test Database', function() {
        xit('Sheep DB schema saves to Test Database', function(done) {
            var testDev = Dev({
                userName: 'Sheepy',
                password: 'Sleepy',
            });

            testDev.save(done);
        });

		xit('Should not save incorrect object to Test Database', function(done) {
			var wrongSave = Dev({
				userName: 'Sheepy',
				xassword: 'Sleepy'
			});

			wrongSave.save(err => { 
        		if(err) { return done(); }
        		throw new Error('Should generate error!');

        	});
		});

        xit('Should retrieve data from Test Database', function(done) {
        	Dev.find({userName: 'Sheepy'}, (err, sheep) => {
        		if(err) {throw err;} 
        		if(sheep.length === 0) {throw new Error('No data retrieved!');}
        		done();
        	});
        });
    });

    after(function(done){
        mongoose.connection.db.dropDatabase(function(){
            mongoose.connection.close(done);
        });
    });

});
