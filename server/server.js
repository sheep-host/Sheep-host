var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
// var webpack = 'webpack';
// var webpackMiddleware = 'webpack-dev-middleware';
// var webpackConfig = '../webpack.config.js';
// var webpackHotMiddleware = 'webpack-hot-middleware';
var signup = require('./routes/signup');
var login = require('./routes/login');
var userCheck = require('./routes/userCheck');
var bodyParser = require('body-parser');
var devMethods = require('../database/methods/devMethods');
var devModel = require('../database/models/devModel');
var db = require('../database/sheepDB');
var api = require('./routes/api');
var createDevDB = require('./routes/createDevDB');

//node-restful consider post-MVP
// var methodOverride = 'method-override';
// var morgan = 'morgan';
// var restful ='node-restful';


let app = express();

//node-restful consider post-MVP
// app.use(morgan('dev'));

// app.use(methodOverride());


app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(bodyParser.json());

// app.use(bodyParser.json({type:'application/vnd.api+json'}));

//api for creating account
app.use('/signup', signup);

app.use('/login', login);

//click 'createDB' button
app.use('/createDevDB', createDevDB);

app.use('/api', api);

app.use(express.static(path.join(__dirname, '../public/')));


// app.use(webpackMiddleware(webpack(webpackConfig)));

// const compiler = webpack(webpackConfig);
//
// app.use(webpackMiddleware(compiler, {
// 	hot: true,
// 	publicPath: webpackConfig.output.publicPath,
// 	onInfo: true,
// 	historyApiFallback:true
// }));
//
// app.use(webpackHotMiddleware(compiler));
//
// app.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname, './index.html'));
// })


// mongoose.connect('mongodb://localhost/new-practice-db', () => {
//   console.log('connected to local mongoDB');
// });


//for react router - will allow back and forth - will render /index.html no matter what
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on port 3000');
});
