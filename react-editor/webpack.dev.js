const path = require('path')
const NodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'config-forms-react-editor.js',
    libraryTarget: 'umd',
    library: 'config-forms-react-editor',
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
    modules: [
      path.resolve('src'),
    ],
    alias: {
      'config-forms': path.resolve(__dirname, '../base'),
      'config-forms-react': path.resolve(__dirname, '../react'),
    },
  },
}
