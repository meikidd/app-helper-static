const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pxtorem = require('postcss-pxtorem');

module.exports = function (webpackConfig) {
  webpackConfig.output.path = path.resolve(__dirname, './build');
  webpackConfig.output.publicPath = '/static';

  webpackConfig.devtool = 'cheap-source-map';
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd-mobile',
    style: true,  // if true, use less
  }]);

  // 将 px 单位转换成 rem 单位
  webpackConfig.postcss.push(pxtorem({
    rootValue: 100,
    propWhiteList: [],
    selectorBlackList: [/^html$/, /^\.ant-/, /^\.github-/, /^\.gh-/],
  }));

  Object.keys(webpackConfig.entry).forEach(name => {
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      template: `./src/${name}.ejs`,
      filename: `./${name}.html`,
      chunks: ['common', name]
    }));
  });
  return webpackConfig;
};
