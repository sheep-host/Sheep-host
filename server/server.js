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
  res.header("Access-Control-Allow-Method", "GET, POST, OPTIONS, HEAD, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

if (env.NODE_ENV === 'production') {
  // app.listen(port, function() {
  //  console.log('listening on port: ', port);
  // });

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
  app.listen(port, function() {
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

app.use('/permission', create);

app.use('/api', api);

// app.get('/public_api', (req, res) => {
//   res.sendFile('/public/public_api.js');
// });

app.get('/', (req, res) => {
	res.sendFile(dirname + 'public/index.html');
});

//for react router - will allow back and forth - will render /index.html no matter what
app.get('*', (req, res) => {
	res.sendFile(dirname + 'public/index.html');
});

// xoauth2
// clientID: 192992451771-ehl3dhf01t1g6bo7rrpd6207t1041ive.apps.googleusercontent.com
// clientSecret: wSFF_2RiQIsOHKuGimMMr52L
// refreshToken: 1/sAly6SN151A12pXQu5ta8iC1Oh8jo19YTSuHF-Zdxm8

