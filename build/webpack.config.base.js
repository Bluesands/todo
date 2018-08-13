const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config.js')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.resolve(__dirname, '../client/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[hash:8].js'
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
    },
    {
      test: /\.(vue|js|jsx)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      enforce: 'pre'
    }
    ]
  }
}

module.exports = config
