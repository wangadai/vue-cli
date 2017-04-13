var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../');
var env = require("dotenvr").load()
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack')
var InsertGlobalCss = require('../src/webpack_plugins/insert_global_css');;;;
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var chalk = require('chalk');
//Multiple Page settings
var glob = require('glob');
var entries = getEntry('./src/modules/**/*.js');

function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);

    if((tmp[1]+'.js')===tmp[2]){
      pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
      entries[pathname] = entry;
    }
  });
  // console.log("base-entrys:");
  // console.log(entries);
  return entries;
}

console.log("当前NODE_ENV："+env.NODE_ENV);

module.exports = {
  entry: entries,
  externals: {
    'jquery': "jQuery",
    'jQuery': "jQuery"
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'api': path.resolve(__dirname, '../src/api'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'filters': path.resolve(__dirname, '../src/filters'),
      'libs': path.resolve(__dirname, '../src/libs'),
      'utils': path.resolve(__dirname, '../src/utils'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      //{
      //  test: /\.js$/,
      //  loader: 'eslint',
      //  include: projectRoot,
      //  exclude: /node_modules/
      //}
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        include: projectRoot,
        exclude: /node_modules|libs/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader?limit=10000&name='+utils.assetsPath('img/[name].[hash:7].[ext]')
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders()
  },
  //公共的module模版
  common_modules: {
    header_metadata: path.resolve(__dirname, '../src/common_modules/header_metadata.html')
  },
  quiet:true,
  plugins: [
    new InsertGlobalCss(glob.sync('./src/common_css/*.css')),
	new ProgressBarPlugin({
		complete: '>',
		incomplete:'-',
		format: '  build [:bar] ' + chalk.green(':percent') + ' (:elapsed seconds)',
		clear: false
	}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"'+env.NODE_ENV+'"'
      }
    }),
  ]
}

//加载第三方类库
var libs = getLibs('./src/libs/*.js');
function getLibs(globPath) {
  var entries = {},
    basename, tmp, pathname,
    names = [];

  var entries = glob.sync(globPath),
      newEntries = [];
  //把jQuery放在最前
  entries.forEach(function (v, k){
    if(v.indexOf('jquery') === -1){
      newEntries.push(v);
      entries.splice(k, 1);
    }
  });
  newEntries.concat(entries).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    module.exports.entry[basename] = entry;
    names.push(basename);
  });
  module.exports.libNames = names;
  module.exports.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: names
  }));
  return entries;
}
