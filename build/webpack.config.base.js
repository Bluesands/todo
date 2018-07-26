const path = require('path');
const createVueLoaderOptions = require('./vue-loader.config.js');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'assets/js/[name].[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 50000,
            name: 'images/[name].[hash:8].[ext]',
            outputPath: 'statics'
          }
        }]
      }
    ]
  }
};

module.exports = config;