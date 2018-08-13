const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const cssExtract = require('./css-extract.config.js')

const defaultPlugin = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'practice/index.html',
    inject: true,
    favicon: path.join(__dirname, '../favicon.ico')
  })
]
const cssProcess = cssExtract(true)
const devServer = {
  contentBase: path.join(__dirname, 'dist'),
  port: '9000',
  host: '0.0.0.0',
  compress: true,
  overlay: {
    errors: true
  },
  hot: true
}

let config = merge(baseConfig, {
  mode: 'development',
  entry: path.join(__dirname, '../practice/index.js'),
  output: {
    path: path.join(__dirname, '../dist/practice'),
    filename: 'assets/js/[name].[hash:8].js'
  },
  module: {
    rules: [cssProcess]
  },
  devServer,
  plugins: defaultPlugin.concat([
    new webpack.HotModuleReplacementPlugin()
  ]),
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  }
})

module.exports = config
