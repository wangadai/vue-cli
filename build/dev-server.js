var path = require('path')
var env = require("dotenvr").load()
if(env.NODE_ENV !== 'development' &&  env.NODE_ENV !== 'debug') {
  console.error("请把NODE_ENV切换到development或者debug");
  return;
}
var express = require('express')
var webpack = require('webpack')
var bodyParser = require('body-parser')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig =  require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = env.PORT
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var router = express.Router();
var compiler = webpack(webpackConfig)

/**
 * 挂载proxy中间件，一定要在挂载bodyParser之前，
 * 否则，尼玛post请求时，无论怎么搞服务端都拿不到参数
 * 见 https://github.com/chimurai/http-proxy-middleware/issues/40
 */
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  if(env.NODE_ENV === 'debug'){
    app.use(proxyMiddleware(context, options))
  }
})

// 处理请求参数
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use( '/', router );

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)


app.get('/admin5/:viewname.html', function(req, res, next) {
  var viewname = req.params.viewname
    ? req.params.viewname + '.html'
    : 'index.html';
  var filepath = path.join(compiler.outputPath, 'modules/'+viewname);
  // console.log(filepath)
  // 使用webpack提供的outputFileSystem
  compiler.outputFileSystem.readFile(filepath, function(err, result) {
    if (err) {
      // something error
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});


// 接口数据Mock
if( env.NODE_ENV === 'development' ){
  require('../ajax')( router );
}

//404
app.use(function(req, res, next) {
  res.send('404');
  res.end();
});

//error
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err);
  res.send('服务器内部错误');
  res.end();
});

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
