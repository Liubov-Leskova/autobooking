const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.config');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id][hash].css',
    }),

  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            minimize: true,
          },
        }],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          name: 'vendor',
          minChunks: 2,
          chunks: 'all',
        },
      },
    },
    noEmitOnErrors: true,
    concatenateModules: true,
    runtimeChunk: true,
    minimizer: [
      new UglifyJsPlugin({
          cache: true,
          sourceMap: true,
          uglifyOptions: {
            compress: { inline: false }
          }
        }
      ),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
});
