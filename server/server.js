const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const devDbMethods = require('../database/methods/devDbMethods');

mongoose.connect('mongodb://localhost/sheepDB');
const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
