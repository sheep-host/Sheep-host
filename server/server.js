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
var createDevDB = require('./routes/createDevDB');
var env = require('../.env');
var verify = require('./verify.js');
var fs = require('fs');
var https = require('https');
var randomstring = require('randomstring');

var certsPath = path.join(__dirname + '/../certs/');
var certificate = fs.readFileSync(certsPath + 'www_sheep_host.crt');
var privateKey = fs.readFileSync(certsPath + 'sheep-host.pem');
var caBundle = fs.readFileSync(certsPath + 'COMODO_DV_SHA-256_bundle.crt');
var app = express();
var port = env.NODE_ENV === 'development' ? 3000 : env.PORT;

var http = express();
http.get('*', function(req, res) {
  res.redirect('https://sheep.host');
}).listen(80);

https.createServer({
  ca: caBundle,
  key: privateKey,
  cert: certificate
}, app).listen(port, function() {
  console.log('listening to port ', port);
});

app.use(express.static(__dirname + '/../public'));
app.use('/public_api', express.static(__dirname + '/../public/public_api.js'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
  	historyApiFallback: true
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

app.use('/dashboard',expressJwt({ secret: 'sheep host' }).unless({ path: ['/','/signup','/login'] }));

app.use(cookieParser());

app.use(bodyParser.json());

// app.use(bodyParser.json({type:'application/vnd.api+json'}));

//api for creating account
app.use('/signup', signup);

app.use('/login', login);

//click 'createDB' button
app.use('/createDevDB', createDevDB);

app.use('/api', api);

app.get('/', (req, res) => {
	res.sendFile('/public/index.html');
});

//for react router - will allow back and forth - will render /index.html no matter what
app.get('*', (req, res) => {
	res.sendFile('/public/index.html');
});


//app.listen(port, () => {
//  console.log('listening on port', port);
//});
