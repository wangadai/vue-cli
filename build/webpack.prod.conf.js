var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var jetpack = require('fs-jetpack');
var htmlXXXInject = require('html-xxx-inject');

//Mutple Page Settings
var path = require('path');
var glob = require('glob');

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({
            sourceMap: false,
            extract: true
        })
    },
    // devtool: '#cheap-module-source-map',
    devtool: 'cheap-eval-source-map',
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.cdnHost + '/',
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
    },
    vue: {
        loaders: utils.cssLoaders({
            sourceMap: false,
            extract: true
        })
    },
    plugins: [
      // new webpack.DllReferencePlugin({
      //     context: __dirname,
      //     manifest: require('../dll/vendor-manifest.json')
      // }),
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      // extract css into its own file
      new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),

    ]
})

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

function getEntry(globPath) {
    var entries = {},
    basename, tmp, pathname;

    glob.sync(globPath).forEach(function(entry) {
        basename = path.basename(entry, path.extname(entry));
        tmp = entry.split('/').splice(-3);
            pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
            entries[pathname] = entry;
        });

    return entries;
}

module.exports = webpackConfig

var pages = getEntry('./src/modules/**/*.html');
var header = jetpack.read(baseWebpackConfig.common_modules.header);
//console.log("prod pages----------------------");
for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  //console.log("filename:" + pathname + '.html');
  //console.log("template:" + pages[pathname]);
    (function(path) {
        var conf = {
            filename: path.replace(/modules/g, 'modules') + '.html',
            templateContent: function(templateParams, compilation) {
                var tc = jetpack.read(pages[path]);
                tc = htmlXXXInject.headMetaDataInject(tc, header);

                return tc;
            },
            inject: true, // js插入位置
            chunksSortMode: 'dependency'
        };

        if (pathname in module.exports.entry) {
            conf.chunks = baseWebpackConfig.libNames.concat(path);
            conf.hash = false;
        }

        // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
        module.exports.plugins.push(new HtmlWebpackPlugin(conf));
    })(pathname);
}