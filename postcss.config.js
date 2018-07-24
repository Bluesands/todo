// 通过postcss中的autoprefixer可以实现将css3中的一些需要兼容学法的属性添加相应的前缀
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer()
  ]
};