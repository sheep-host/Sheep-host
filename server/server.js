import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';
import webpackHotMiddleware from 'webpack-hot-middleware';
import signup from './routes/signup';
import login from './routes/login';
import userCheck from './routes/userCheck'
import bodyParser from 'body-parser';
import devMethods from '../database/methods/devMethods';
import devModel from '../database/models/devModel';
import db from '../database/sheepDB';
import api from './routes/api';
import createDevDB from './routes/createDevDB';

//node-restful consider post-MVP
// import methodOverride from 'method-override';
// import morgan from 'morgan';
// import restful from'node-restful';


let app = express();

//node-restful consider post-MVP
// app.use(morgan('dev'));

// app.use(methodOverride());


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())

app.use(bodyParser.json({type:'application/vnd.api+json'}));


app.use('/signup', signup)

app.use('/login', login)

//click 'createDB' button
app.use('/createDevDB', createDevDB);

app.use('/api', api);


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