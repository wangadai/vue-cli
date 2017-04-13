const Mock  = require('mockjs')

module.exports = {
  	'GET/admin/xxxxxx.json': ()=>{
	    return {
	      	
	    }
  	},
}


// status 200 正常
// status 403 未授权
// status 404 未找到
// status 500 服务器错误

// 注册&登录API
// 登入/登出对应的服务端资源应该是session，所以相关api应该如下：
// GET /session # 获取会话信息
// PUT /session # 更新会话信息 (心跳)
// POST /session # 创建新的会话（登入）
// DELETE /session # 销毁当前会话（登出）
//
// 而注册对应的资源是user，api如下：
// GET /user/:id # 获取id用户的信息
// PUT /user/:id # 更新id用户的信息
// POST /user # 创建新的用户（注册）
// DELETE /user/:id # 删除id用户（注销）
