//RESTFUL API 模拟
const forceRequire = require('require-reload');

module.exports = function(router) {
    let mockData = require('./data');

    //每隔1秒重新解析data，刷新data，新增的路由不会生效
    setInterval(function() {
        mockData = forceRequire('./data');
    }, 1000);

    router.all('/*', (req, res, next) = > {
        //非接口请求，走正常流程
        if (req.url.indexOf('.json') === -1) {
            return next();
        }

        let apiUrl = req.method + req.path, data = mockData[apiUrl] && mockData[apiUrl]() || {
            status: 404,
            message: '接口不存在'
        };
        console.log('=>api: ' + apiUrl)
        // 接口里面带参数的，则遍历mockData用正则匹配
        // for(let url in mockData){
        //  var reg = url.replace(/\{\/.*?\}/g,"\/\?\.*");
        //  if(new RegExp(reg).test(apiUrl)){
        //    data = mockData[url]();
        //    break;
        //  }
        // }

        setTimeout(() = > {
            res.json(data)
        }, data.delay || 0)
    })
};