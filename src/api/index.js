import Vue from 'vue'
import VueResource from 'vue-resource'

//接口主机名，开发环境一般为空，生产环境根据情况设置
const HOST = "";

Vue.use(VueResource)
//服务器无法处理application/json,所以只能把请求当作表单提交
Vue.http.options.emulateJSON = false;
// Vue.http.options.emulateHTTP = true;
Vue.http.options.xhr = {withCredentials: true}

const skipLogin = ["login"]

Vue.http.interceptors.push((request, next) => {
	request.url = HOST + request.url;
	// 请求发送前的处理逻辑
	if (request.url.indexOf('/rest/') === -1){
		request.emulateJSON = true;
		// console.log(request)
	}
	// 请求返回后的处理逻辑
	next((response) => {
		// 外层请求状态判断
		switch(response.status){
			
		}

	})
})

// get: {method: 'GET'},
// save: {method: 'POST'},
// update: {method: 'PUT'},
// delete: {method: 'DELETE'}

// export const getVerifyCode = Vue.resource('/user/getRegisterCodeToSupplier.json')