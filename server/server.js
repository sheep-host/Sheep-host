
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
app.use('/users', signup)

//api for logging in
app.use('/api/checkUserLogin', userCheck)


mongoose.connect('mongodb://localhost/sheepDB');
const db = mongoose.connection;





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


app.listen(3000, () => console.log('Running on local host 3000 dawg'))



