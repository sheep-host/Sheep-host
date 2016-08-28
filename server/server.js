var express = require('express');
var expressJwt = require ('express-jwt');
var jwt = require ('jsonwebtoken');
var cookieParser = require('cookie-parser');
var path = require('path');
var signup = require('./routes/signup');
var login = require('./routes/login');
var userCheck = require('./routes/userCheck');
var bodyParser = require('body-parser');
var devMethods = require('../database/methods/devMethods');
var devModel = require('../database/models/devModel');
var db = require('../database/SheepDB');
var api = require('./routes/api');
var create = require('./routes/create');
var env = require('../.env');
var testController = require('../database/methods/testController');
var getDBs = require('./routes/getDashboardData');
var app = express();

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

if (env.NODE_ENV === 'development') {
  var webpack = require('webpack');
  var webpackMiddleware = require('webpack-dev-middleware');
  var webpackConfig = require('../webpack.config.js');
  var webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(webpackConfig);

  app.use(webpackMiddleware(compiler, {
  	hot: true,
  	publicPath: webpackConfig.output.publicPath,
  	onInfo: true,
  	historyApiFallback:true
  }));

  app.use(webpackHotMiddleware(compiler));
}

//node-restful consider post-MVP
// app.use(morgan('dev'));
// app.use(methodOverride());

//node-restful consider post-MVP
// var methodOverride = 'method-override';
// var morgan = 'morgan';
// var restful ='node-restful';

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/dashboard',expressJwt({secret: 'sheep host'}).unless({ path: ['/','/signup','/login']}));

app.use(cookieParser());

app.use(bodyParser.json());

// app.use(bodyParser.json({type:'application/vnd.api+json'}));

//api for creating account
app.use('/signup', signup);

app.use('/login', login);

app.use('/getDBs', getDBs);

//click 'createDB' button
app.use('/create', create);

app.use('/api', api);

app.get('/', (req, res) => {
	res.sendFile('/public/index.html');
});

//for react router - will allow back and forth - will render /index.html no matter what
app.get('*', (req, res) => {
	res.sendFile('/public/index.html');
});

var port = env.NODE_ENV === 'development' ? 3000 : env.PORT;

app.listen(port, () => {
  console.log('listening on port 3000');
});
