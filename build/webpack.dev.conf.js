var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var jetpack = require('fs-jetpack');
var htmlXXXInject = require('html-xxx-inject');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

//Multiple Page settings
var glob = require('glob');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
//公用css添加到webpack hot middleware
glob.sync('./src/common_css/*.css').forEach(function(v, k) {
    baseWebpackConfig.entry[path.basename(v)] = v;
});
module.exports = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({
            sourceMap: false
        })
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: '/',
        filename: '[name].js'
    },
    devtool: 'eval-source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ]
})

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

var pages = getEntry('./src/modules/**/*.html');
var header = jetpack.read(baseWebpackConfig.common_modules.header);
for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
    (function(path) {

        var conf = {
            filename: path + '.html',
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
            conf.hash = true;
        }

        // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
        module.exports.plugins.push(new HtmlWebpackPlugin(conf));
    })(pathname)
}