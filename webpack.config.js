module.exports = {
  entry: "./src/app.jsx",
  output: {
      path: __dirname + '/public',
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
