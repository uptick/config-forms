const path = require('path')
const NodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'config-forms.js',
    libraryTarget: 'umd',
    library: 'config-forms',
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
  externals: NodeExternals(),
  resolve: {
    alias: {
      'config-forms': path.resolve('../base'),
    },
  },
}
