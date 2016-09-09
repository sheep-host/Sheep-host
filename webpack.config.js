var path = require('path');
var env = require('./.env');


if (env.NODE_ENV === 'development') {
  var webpack = require('webpack');

  module.exports = {
    devtools: 'eval-source-map',
    entry: [
      'webpack-hot-middleware/client',
      path.join(__dirname, '/client/index.js')
    ],
    output: {
      path: '/',
      publicPath: '/'
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      loaders: [
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
          loader: 'url-loader?limit=20000',
          include:[path.join(__dirname, 'Public')]
        },
        {
          test: /\.js$/,
          include: [
            path.join(__dirname, 'client'),
            path.join(__dirname, 'server/shared')
          ],
          loaders: [ 'react-hot', 'babel' ]
        },
        {
          test: /\.css$/,
          inclue: [path.join(__dirname, 'Public')],
          loaders: ['style', 'css']
        },
      ]
    },
    resolve: {
      extentions: [ '', '.js' ]
    }
  }
} else {
  module.exports = {
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, '/public'),
        // publicPath: path.join(__dirname + '/'),
        filename: "bundle.js"
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
              test: /\.css$/,
              loaders: ['style', 'css']
            },
            {
              test: /\.scss$/,
              loaders: ['style', 'css', 'sass']
            },
            {
              test: /\.jsx?$/,
              loader: 'babel-loader',
              exclude: /(node_modules)/,
              query: {
                presets: ['es2015', 'react']
              }
          }
        ]
    }
  };
}









