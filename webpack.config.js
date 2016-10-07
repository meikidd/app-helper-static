var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var packageObj = require('./package.json');

var webpackConfig = {
  entry: packageObj.entry,
  output: {
    path: 'build',
    filename: '[name].js'
  },
  stats: {children: false}, // 禁用 plugins 的 log
  devtool: 'cheap-source-map',
  module: {
    loaders: [
      // js | jsx
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: [
            'add-module-exports', // 实现 export default
            'transform-decorators-legacy', // 实现 @decorator
            'transform-runtime', // 类似 babel-polyfill，不用手动加载 babel-polyfill
            ['import', [{ 'libraryName': 'antd', style: true }]] // antd 按需加载
          ]
        },
      },

      // css
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css'),
      },
      // less
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css!less'),
      },

      // image
      { test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, loader: 'url?limit=10000' },

      // json
      { test: /\.json$/, loader: 'json' },

      // html
      { test: /\.html?$/, loader: 'file?name=[name].[ext]' },

      // 字体
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml' },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js'), // 抽取 common 代码
    new ExtractTextPlugin('[name].css', {
      disable: false,
      allChunks: true,
    }), // 抽取 css 文件
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        ascii_only: true,
      },
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin()
  ],
};



module.exports = webpackConfig;
