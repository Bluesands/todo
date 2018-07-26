const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const cssExtract = require('./css-extract.config.js')

let config
const isDev = process.env.NODE_ENV === 'development'
const defaultPlugin = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    title: 'Todo App',
    filename: 'index.html',
    template: 'client/index.html'
  })
]
const cssProcess = cssExtract(isDev)
const devServer = {
  contentBase: path.join(__dirname, 'dist'),
  port: '8000',
  host: '0.0.0.0',
  compress: true,
  overlay: {
    errors: true
  },
  hot: true
}

if (isDev) {
  config = merge(baseConfig, {
    module: {
      rules: [cssProcess]
    },
    devServer,
    plugins: defaultPlugin.concat([
      new webpack.HotModuleReplacementPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      path: path.resolve(__dirname, '../dist/client'),
      filename: 'statics/js/[name].[chunkhash:8].js'
    },
    plugins: defaultPlugin.concat([
      new CleanWebpackPlugin(
        ['dist'], {
          root: path.resolve(__dirname, '../'),
          verbose: true
        }
      ),
      new MiniCssExtractPlugin({
        filename: 'statics/css/[name].[chunkhash:8].css'
      })
    ]),
    module: {
      rules: [cssProcess]
    },
    optimization: {
      runtimeChunk: true,
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minSize: 0,
            minChunks: 2,
            maxInitialRequests: 5
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      }
    }
  })
}

module.exports = config
