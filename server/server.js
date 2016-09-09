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
var permission = require('./routes/permission');
var getDBs = require('./routes/getDashboardData');
var env = require('../.env');
var port = env.NODE_ENV === 'development' ? 3000 : env.PORT;

var app = express();
var dirname = path.join(__dirname, '/../');

app.use(express.static(dirname + 'public'));
app.use('/public_api', express.static(__dirname + '/../public/public_api.js'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Method", "GET, POST, HEAD, OPTIONS, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization");
  next();
});

if (env.NODE_ENV === 'production') {
  var fs = require('fs');
  var https = require('https');
  var certificate = fs.readFileSync(dirname + 'certs/sheep_host.crt');
  var privateKey = fs.readFileSync(dirname + 'certs/sheep-host.key');
  var caBundle = fs.readFileSync(dirname + 'certs/COMODO_DV_SHA-256_bundle.crt');

  https.createServer({
    ca: caBundle,
    key: privateKey,
    cert: certificate
  }, app).listen(port, function() {
    console.log('listening to port ', port);
  });

  var http = express();
  http.get('*', function(req, res) {
    res.redirect('https://sheep.host');
  });

  http.listen(80, function() {
    console.log('redirecting port 80 to 443');
  });
}

if (env.NODE_ENV === 'backend') {
  var server = app.listen(port, function() {
   console.log('listening on port 3000');
  });
}

if (env.NODE_ENV === 'development') {
  var webpack = require('webpack');
  var webpackMiddleware = require('webpack-dev-middleware');
  var webpackConfig = require('../webpack.config.js');
  var webpackHotMiddleware = require('webpack-hot-middleware');

  app.listen(port, function() {
   console.log('listening on port 3000');
  });

  var compiler = webpack(webpackConfig);

  app.use(webpackMiddleware(compiler, {
  	hot: true,
  	publicPath: webpackConfig.output.publicPath,
  	onInfo: true,
  	historyApiFallback:true
  }));

  app.use(webpackHotMiddleware(compiler));
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(bodyParser.json());

//api for creating account
app.use('/signup', signup);

app.use('/login', login);

app.use('/getDBs', getDBs);

//click 'createDB' button
app.use('/create', create);

app.use('/permission', permission);

app.use('/api', api);

app.get('/', (req, res) => {
	res.sendFile(dirname + 'public/index.html');
});

//for react router - will allow back and forth - will render /index.html no matter what
app.get('*', (req, res) => {
	res.sendFile(dirname + 'public/index.html');
});

module.exports = server;
