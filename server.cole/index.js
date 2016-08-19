import express from 'express'
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';
import webpackHotMiddleware from 'webpack-hot-middleware';
import users from './routes/users'
import userCheck from './routes/userCheck'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// mongoose.connect('mongodb://localhost/fuckshit');
// var db = mongoose.connection;
// db.once('open', function(){
// 	console.log('yo');
// })
// var userSchema = new Schema({
// 	username: String,
// 	password: String
// });

// var User = mongoose.model('User', userSchema);

// var user = new User({
// 	username: 'Sally',
// 	password: 'silly'
// });

// user.save({});

let app = express();

app.use(bodyParser.json())

//api for creating account
app.use('/users', users)

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





app.listen(3000, () => console.log('Running on local host 3000 dawg'))


