const webpack = require('webpack');
var config = require('../config')
var path = require('path')
const vendors = [
    'echarts',
    'moment',
    'v-qrcode',
    'vue',
    "vue-amap",
    "vue-calendar",
    "vue-clipboards",
    "vue-echarts",
    "vue-resource",
    "vue-router",
    "ztree",
];

module.exports = {
    output: {
        path: config.build.assetsRoot,
        filename: '[name].[chunkhash].js',
        library: '[name]_[chunkhash]',
    },
    entry: {
        vendor: vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(config.build.assetsRoot, '../build/manifest.json'),
            name: '[name]_[chunkhash]',
            context: __dirname,
        }),
    ],
};