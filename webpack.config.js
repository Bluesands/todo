const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const cssExtract = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: '../../'
  }
};
const cssIsExtract = isDev ? 'vue-style-loader' : cssExtract;

const config = {
  target: 'web',
  entry: {
    app: path.join(__dirname, 'src/index.js')
  },
  output: {
    filename: 'assets/js/[name].[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(stylus|css)$/,
        use: [
          cssIsExtract,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 50000,
            name: '[name].[ext]',
            outputPath: 'assets/images'
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Vue And Webpack',
      filename: 'index.html',
      template: 'src/index.html'
    }),
  ]
};


if (isDev) {
  config.devtool = '#cheap-module-eval-source-map';
  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    port: '8000',
    host: '0.0.0.0',
    compress: true,
    overlay: {
      errors: true,
    },
    hot: true
  };

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.entry.vendor = ['vue'];
  config.output.filename = 'assets/js/[name].[chunkhash:8].js';

  config.plugins.push(
    new CleanWebpackPlugin('./dist'),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[chunkhash:8].css"
    }),
  )

  config.optimization = {
    splitChunks: {
      cacheGroups: { // 这里开始设置缓存的 chunks
        commons: {
          chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          minSize: 0, // 最小尺寸，默认0,
          minChunks: 2, // 最小 chunk ，默认1
          maxInitialRequests: 5 // 最大初始化请求书，默认1
        },
        vendor: {
          test: /node_modules/, // 正则规则验证，如果符合就提取 chunk
          chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
          priority: 10, // 缓存组优先级
          enforce: true
        }
      }
    },
    runtimeChunk: true
  }
}

module.exports = config;