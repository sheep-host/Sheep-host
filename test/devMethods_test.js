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
        xit('addDev function saves to Test Database', function(done) {
            devMethods.addDev( 
            // call function with expected data structure for req.body
                {
                    body: {
                        userName: 'Sheepy',
                        password: 'Sleepy',
                    }
                },
                // mocking function with done to confirm test passes 
                {
                    send: () => {done();}
                },
                // invoke done in place of next 
                () => {throw new Error('Unit test does not account for Next. Update this test.')} // this doesn't get invoke but is a placeholder in case 'next' is added later
            );
            
        });

        xit('Retrieves data added with addDev from Test Database', function(done) {
            Dev.find({userName: 'Sheepy'}, (err, dev) => {
                if(err) {throw err;} 
                if(dev.length === 0) {throw new Error('No data retrieved!');}
                done();
            });
        });

    describe('usernameExist function test', function() {
    xit('usernameExist should flag that a name already exists in database', function(done) {
        devMethods.usernameExist( 
        // call function with data already saved in Test DB
            {
                body: {
                    userName: 'Sheepy',
                    password: 'Sleepy',
                }
            },
            // mocking to pass test that name exists
            {
                send: () => {done();}
            },
            // Test will not pass if name does not exist 
            () => {throw new Error('Name does not exist in Test DB when it should exist!')}
        );
        
    });

    xit('usernameExist should confirm that a name does not already exists in database', function(done) {
        devMethods.usernameExist( 
        // call function with data that is not already saved in Test DB
            {
                body: {
                    userName: 'Sheepy2',
                    password: 'Sleepy',
                }
            },
            // Test should fail if the name exists
            {
                send: () => {throw new Error('Fail! Name already exists in Test database!')}
            },
            // Test will pass if name does not exist 
            () => {done();}
        );  
    });

    });

    after(function(done){
        mongoose.connection.db.dropDatabase(function(){
            mongoose.connection.close(done);
        });
    });
    });
});
