"use strict";

const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const Dev = require('../database/models/devModel');
const devMethods = require('../database/methods/devMethods');


describe('Sheep DB middleware functions testing', function() {
    var db;

	before(function (done) {
        mongoose.connect('mongodb://localhost/testDB');
        db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
          console.log('We are connected!');
          done();
        });	
	});

    describe('addDev function test', function() {
        it('addDev function saves to Test Database', function(done) {
            devMethods.addDev( 
            // call function with expected data structure for req.body
                {
                    body: {
                        userName: 'Sheepy',
                        password: 'Sleepy',
                    }
                },
                // mocking empty object for ressponse 
                {},
                // invoke done in place of next 
                done
            );
            
        });

        it('Retrieves data added with addDev from Test Database', function(done) {
            Dev.find({userName: 'Sheepy'}, (err, dev) => {
                if(err) {throw err;} 
                if(dev.length === 0) {throw new Error('No data retrieved!');}
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
