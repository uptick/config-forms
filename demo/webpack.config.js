var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './demo.js',
  output: {
    path: __dirname + '/dist',
    filename: 'demo.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('node_modules'),
    ],
    alias: {
    //   'config-forms': path.resolve('../base'),
    //   'config-forms-react': path.resolve('../react'),
      'config-forms-react-editor': path.resolve('../react-editor'),
    },
  },
};
