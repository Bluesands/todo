const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssExtract = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    // 如果在css文件里引入图片，就需要指定一下相对路径
    publicPath: '../../'
  }
};

module.exports = (isDev) => {
  const cssIsExtract = isDev ? 'vue-style-loader' : cssExtract;
  return {
    test: /\.(stylus|css)$/,
    use: [
      cssIsExtract,
      {
        loader: 'css-loader',
        options: {
          modules: true,
          camelCase: true,
          localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:5]'
        }
      },
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