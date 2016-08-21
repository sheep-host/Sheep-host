import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';
import webpackHotMiddleware from 'webpack-hot-middleware';
import signup from './routes/signup';
import login from './routes/login';
import userCheck from './routes/userCheck'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import devMethods from '../database/methods/devMethods';
import devModel from '../database/models/devModel';
import db from '../database/sheepDB';
import postDevDB from './routes/postDevDB';
import createDevDB from './routes/createDevDB';
import getDevDB from './routes/getDevDB';
import sharedMethods from '../database/methods/shared/sharedMethods';

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(bodyParser.json());

//api for creating account
app.use('/signup', signup);

app.use('/login', login);

//api for logging in
app.use('/api/checkUserLogin', userCheck);

//click 'createDB' button
app.use('/createDevDB', createDevDB);

app.use('/getDevDB', getDevDB);

app.use('/postDevDB', postDevDB);


// app.use(webpackMiddleware(webpack(webpackConfig)));

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
	hot: true,
	publicPath: webpackConfig.output.publicPath,
	onInfo: true,
	historyApiFallback:true
}));

app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'));
})


// mongoose.connect('mongodb://localhost/new-practice-db', () => {
//   console.log('connected to local mongoDB');
// });


//for react router - will allow back and forth - will render /index.html no matter what
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
