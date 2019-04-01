const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'config-forms-react-native.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            "plugins": [
              "@babel/proposal-class-properties"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new PeerDepsExternalsPlugin()
  ],
  resolve: {
    modules: [
      path.resolve('node_modules'),
      path.resolve('src'),
    ],
  }
};
