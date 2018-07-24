const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development'; // 判断是否是开发环境
// 定义css提取loader
const cssExtract = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    // 如果在css文件里引入图片，就需要指定一下相对路径
    publicPath: '../../'
  }
};

// 开发环境使用vue-style-loader直接将css写入style标签，生成环境css单独打包
const cssIsExtract = isDev ? 'vue-style-loader' : cssExtract;

const config = {
  // https://webpack.docschina.org/configuration/target
  // 项目是web项目，webpack将代码编译为浏览器环境可用，target默认是'web'
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