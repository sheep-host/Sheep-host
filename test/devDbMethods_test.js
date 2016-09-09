"use strict";

const mongoose = require('mongoose');
const chai = require('chai');
const methods = require('../database/methods/devDbMethods');

const expect = chai.expect;
const uri = 'mongodb://localhost/testDB';

describe('devDB middleware functions testing', function() {
  describe('middleware update function', () => {
    let con;
    let mdl;

    before(() => {
      mongoose.connect(uri); // create and connect to test DB
      con = mongoose.connection;
      mdl = con.model('devs', // create a model according to dev schema
        new mongoose.Schema({
          userName: { type: String, required: true },
          password: { type: String, required: true },
          database: { type: Array,
            default: {
              id: { type: String, default: 'null' },
              name: { type: String, default: 'null' },
              collections: {
                name: { type: String, default: 'null' },
                devSchema: { type: String, default: 'null' },
              },
            } },
        }));
      mdl({ // create a user for test
        userName: 'sheep',
        password: 'sleepy',
      }).save();
    });

    after(() => {
      mongoose.connection.db.dropDatabase();
    });

    xit('update function should update correct user\'s database information', (done) => {
      const Devs = mdl; // set to match the variable used within update to hold the model
      methods.updateDevProfile( // call function with expected data
        {
          body: {
            userName: 'sheep',
            dbId: '1234',
            dbName: 'fluffy',
            collectionName: 'fur',
            schema: '{ color: String }',
          }
        },
        {
          json: () => {}
        },
        () => {}
      );

      mdl.find({}, (err, res) => {
        if (err) throw err;
        const dev = res[0];
        expect(dev.userName).to.equal('sheep');
        expect(dev.password).to.equal('sleepy');
        expect(dev.database).to.be.an('array');
        expect(dev.database[0].id).to.equal('1234');
        expect(dev.database[0].name).to.equal('fluffy');
        expect(dev.database[0].collections[0].name).to.equal('fur');
        expect(dev.database[0].collections[0].devSchema).to.equal('{ color: String }');
        done();
      });
    });
  })

  describe('create middle function test', () => {
    before((done) => {
      methods.createDevDB(
        {
          body: {
            userName: 'sheep',
            dbId: '1234',
            dbName: 'fluffy',
            collectionName: 'fur',
            schema: '{ color: String }',
          }
        },
        {},
        done
      );
    });

    xit('create function should create a database with the correct name', (done) => {
      const con = mongoose.connection;
      const devDB = con.useDb('1234_fluffy');
      const devModel = devDB.model('label', new mongoose.Schema({
        createdBy: String
      }));

      devModel.findOne({}, (err, res) => {
        expect(err).to.not.exist;
        expect(res.createdBy).to.equal('sheep');
        devDB.db.dropDatabase();
        done();
      });
    });
  });
});
