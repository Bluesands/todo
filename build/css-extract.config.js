const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssExtract = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    // 如果在css文件里引入图片，就需要指定一下相对路径
    publicPath: '../../'
  }
};

module.exports = function (isDev) {
  const cssIsExtract = isDev ? 'vue-style-loader' : cssExtract;
  return {
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
  }
};