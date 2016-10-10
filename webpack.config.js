const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (webpackConfig) {
  webpackConfig.output.path = path.resolve(__dirname, './build');

  webpackConfig.devtool = 'cheap-source-map';
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd-mobile',
    style: true,  // if true, use less
  }]);

  Object.keys(webpackConfig.entry).forEach(name => {
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      template: `./src/${name}.ejs`,
      filename: `./${name}.html`,
      chunks: ['common', name]
    }));
  });
  return webpackConfig;
};
