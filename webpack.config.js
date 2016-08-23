var path = require('path');
// import webpack from 'webpack';
//
// export default {
//   devtools: 'eval-source-map',
//   entry: [
//     'webpack-hot-middleware/client',
//     path.join(__dirname, '/client/index.js')
//   ],
//   output: {
//     path: '/',
//     publicPath: '/'
//   },
//   plugins: [
//     new webpack.NoErrorsPlugin(),
//     new webpack.optimize.OccurenceOrderPlugin(),
//     new webpack.HotModuleReplacementPlugin()
//   ],
//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         include: [
//           path.join(__dirname, 'client'),
//           path.join(__dirname, 'server/shared')
//         ],
//         loaders: [ 'react-hot', 'babel' ]
//       }
//     ]
//   },
//   resolve: {
//     extentions: [ '', '.js' ]
//   }
// }

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
