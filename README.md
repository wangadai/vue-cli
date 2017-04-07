# adai

## Build Setup

#### install dependencies
`npm install`


#### serve with hot reload at localhost:port
* 修改`.env`文件的`NODE_ENV`为`development`
* 修改`.env`文件的`PORT`为你的端口号，默认`8080`
* 运行 `npm run dev`


#### build for production with minification
* 修改`.env`文件的`NODE_ENV`为`production`
* 运行 `npm run build`
* 打包后的文件生成在`/dist`目录

#### debug
* 修改 `.env` 文件的 `NODE_ENV`为`debug`
* 修改 `/config/index.js` 的 `proxyTable` 的远程代理机器的地址
* `npm run dev` 启动调试


A：在`/config/index.js`中的`cdnHost`修改


Q：如何新建一个页面？

A：在`/src/modules`中创建一个目录，在刚创建的目录中新建与目录名同名的`.vue`和`.js`及`.html`文件，
然后具体如何编写页面，请参考`vuejs 2.0`文档，每次新增页面时，记得重启服务`npm run dev`

Q：文件发生变动时，页面会自动刷新么？

A：会。系统引入了`webpack`热加载模块，会自动监听`vue`模块相关的资源是否发生变动，如有变动，就会自动编译，浏览器自动重载页面。

Q：如何做接口延时调试？
A：在`/ajax/data.js`的接口数据中添加`delay`参数，值的单位为毫秒

## 目录结构

### `/src`目录为源文件
### `/dist`目录为打包后的文件
### `/ajax`目录为mock接口
### `/src/assets`目录为公用的静态资源目录
### `/src/assets/font`目录为`iconfont`目录
### `/src/common_modules`目录为公用的页面模版，如公用的页头页尾，公用的`html meta`配置
### `/src/components`目录为公用的`vuejs`组件，如公用的`ui button`组件
### `/src/libs`目录为公用的类库，如`jquery`、`bootstrap`，默认`jquery`优先加载
### `/src/modules`目录为页面，包括`css`、`js`、`html`、`.vue`
### `/src/common_css`目录为公共的`css`文件。由`/src/webpack_plugins/insert_global_css`把`/src/common_css`目录中的所有`css`文件插入到生成的页面中的`head`标签

