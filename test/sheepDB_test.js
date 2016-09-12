"use strict";

const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const Dev = require('../database/models/devModel');

//Tests for sheep DB.

describe('Sheep DB Test', function() {
    var db, db2, contactInfo;

	before(function (done) {
        mongoose.connect('mongodb://localhost/sheepTest');
        db = mongoose.connection;
        db2 = db.useDb('sheepTest2');
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            done();
        });	
	});

    describe('Sheep Database', function() {
        xit('Sheep DB schema saves to Sheep Database', function(done) {
            var testDev = Dev({
                userName: 'Sheepy',
                password: 'Sleepy',
            });

            testDev.save(done);
        });

		xit('Should not save incorrect object to Sheep Database', function(done) {
			var wrongSave = Dev({
				userName: 'Sheepy',
				xassword: 'Sleepy'
			});

			wrongSave.save(err => { 
        		if(err) { return done(); }
        		throw new Error('Should generate error!');

        	});
		});

        xit('Should retrieve data from Sheep Database', function(done) {
        	Dev.find({userName: 'Sheepy'}, (err, sheep) => {
        		if(err) {throw err;} 
        		if(sheep.length === 0) {throw new Error('No data retrieved!');}
        		done();
        	});
        });

    });

        describe('Sheep2 Database', function() {
        xit('DB schema saves to Sheep2 Database', function(done) {
            contactInfo = db2.model('User', new mongoose.Schema({
                name: String,
                phone: Number
            }));

            var User = contactInfo({
                name: 'Snoopy',
                phone: 8888888888
            });

            User.save(done);
        });


        xit('Should retrieve data from Sheep2 Database', function(done) {
            contactInfo.find({name: 'Snoopy'}, (err, contact) => {
                if(err) {throw err;} 
                if(contact.length === 0) {throw new Error('No data retrieved!');}
                done();
            });
        });

    });

    after(function(done){
        db2.db.dropDatabase();
        db.db.dropDatabase(function(){
            mongoose.connection.close(done);
        });

    });

});
