const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'development',
  entry: './demo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'demo.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve('node_modules'),
    ],
    alias: {
      'config-forms': path.resolve('../base'),
      'config-forms-react': path.resolve('../react'),
      'config-forms-react-editor': path.resolve('../react-editor'),
    },
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   reportFilename: path.resolve(__dirname, 'report.html'),
    // }),
  ],
}
