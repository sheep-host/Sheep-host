const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const devMethods = require('../database/methods/devMethods');
const passport = require('passport')


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
})

app.post('/signup', devMethods.addDev)

mongoose.connect('mongodb://localhost/new-practice-db', () => {
  console.log('connected to local mongoDB');
});

//all route handling in routes.js
require('./routes.js')(app, passport)

app.listen(3000, () => {
  console.log('listening on port 3000');
})
