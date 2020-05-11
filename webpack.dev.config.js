const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  watch: true,
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    clientLogLevel: 'info',
    hot: true,
    overlay: true,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    namedModules: true,
    namedChunks: true,
  },
});
