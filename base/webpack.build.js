const path = require('path')
const devCfg = require('./webpack.dev.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  ...devCfg,
  mode: 'production',
  plugins: [
    ...devCfg.plugins || [],
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.resolve(__dirname, 'report.html'),
    }),
  ],
}
