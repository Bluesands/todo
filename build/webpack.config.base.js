const path = require('path');

const config = {
  target: 'web',
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: 'assets/js/[name].[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
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
            name: '[name].[hash:8].[ext]',
            outputPath: 'assets/images'
          }
        }]
      }
    ]
  }
};

module.exports = config;