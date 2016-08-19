

import express from 'express'
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';
import webpackHotMiddleware from 'webpack-hot-middleware';
import signup from './routes/signup';
import userCheck from './routes/userCheck'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import devDbMethods from '../database/methods/devDbMethods';
import devMethods from '../database/methods/devMethods';
import devModel from '../database/models/devModel';
import db from '../database/sheepDB';


let app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())

//api for creating account
app.use('/signup', signup)

//api for logging in
app.use('/api/checkUserLogin', userCheck)





// app.use(webpackMiddleware(webpack(webpackConfig)));

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
	hot: true,
	publicPath: webpackConfig.output.publicPath,
	onInfo: true
}));
app.use(webpackHotMiddleware(compiler))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'));
})




// createDB button press on client
app.post('/createDevDB', devDbMethods.updateDevProfile, devDbMethods.createDevDB)

// mongoose.connect('mongodb://localhost/new-practice-db', () => {
//   console.log('connected to local mongoDB');
// });

//all route handling in routes.js


app.listen(3000, () => {
  console.log('listening on port 3000');
})

