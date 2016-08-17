const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const devDbMethods = require('../database/methods/devDbMethods');
// const db = mongoose.createConnection('mongodb://localhost/sheep2');
// const Devs = require('../database/models/devModel');
// const db2 = db.useDb('sheep2');

// const Devs = db2.model('Devs', new mongoose.Schema({
//   name: String,
//   password: String
// }));

// app.get('/sheep', (req, res) => {
//   Devs.find({}, (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

// app.post('/sheep', (req, res) => {
//   let Dev = Devs({
//     name: 'sheepy4',
//     password: 'sleepy4'
//   });
//   Dev.save((err, result) => {
//     console.log('success');
//   });
// });

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
