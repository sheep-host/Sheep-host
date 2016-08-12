const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
})

mongoose.connect('mongodb://localhost/new-practice-db', () => {
  console.log('connected to local mongoDB');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
})
