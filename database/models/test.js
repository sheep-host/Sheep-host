const mongoose = require('mongoose');
const chai = require('chai');

const expect = chai.expect;
const uri = 'mongodb://localhost/testDB';

describe('devDB middleware testing', function() {
  let con;
  let mdl;
  before(() => {
    con = mongoose.connect(uri); // create and connect to test DB
    mdl = con.model('devs', // create a model according to dev schema
      new mongoose.Schema({
        userName: { type: String, required: true },
        password: { type: String, required: true },
        database: { type: Array,
          default: {
            id: { type: String, default: 'null' },
            name: { type: String, default: 'null' },
            collection: {
              name: { type: String, default: 'null' },
              schema: { type: String, default: 'null' },
            },
          }
        },
      }));
    mdl({ // emulate user signup
      userName: 'sheep3',
      password: 'sleepy',
    }).save();
  });

  after(() => {
    mongoose.connection.db.dropDatabase();
  });

  it('should do something', (done) => {
    mdl.find({}, (err, res) => {
      if (err) throw err;
      const dev = res[0];
      expect(dev.userName).to.equal('sheep3');
      expect(dev.password).to.equal('sleepy');
      expect(dev.database).to.be.an('array');
      expect(dev.database[0].name).to.exist;
      expect(dev.database[0].id).to.exist;
      expect(dev.database[0].collection.name).to.exist;
      expect(dev.database[0].collection.schema).to.exist;
      done();
    });
  });
});
