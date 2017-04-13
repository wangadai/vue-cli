import Vue from 'vue'
import VueResource from 'vue-resource'
import {$alert} from '../assets/js/dialog'

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
			case 200:
			// 内层业务处理结果判断
			let data;
			try {
				data = JSON.parse(response.body);
			} catch(e) {
				data = response.body;
			}
			if(data.status==undefined){
				return response;
			}else if (data.status=="403") {
				$alert("对不起，您没有权限进行此项操作");
			} else if (data.status=="1") {
				$alert(data.errmsg || "对不起，系统繁忙，请稍后再试");
			}else if (data.status=="0" || data.status=="2" || typeof data.status != "string") {
				return response;
			} else {
				$alert("对不起，系统繁忙，请稍后再试");
			}
			break;
			case 401:
			location.href="login.html"
			break;
			case 403:
			$alert("对不起，您没有权限进行此项操作");
			break;
			case 404:
			$alert("对不起，您请求的服务不存在");
			break;
			case 422:
			$alert("您提交的数据校验失败，请重新检查");
			break;
			default:
			$alert("对不起，系统繁忙，请稍后再试，错误代码("+response.status+")");
		}

	})
})

// get: {method: 'GET'},
// save: {method: 'POST'},
// update: {method: 'PUT'},
// delete: {method: 'DELETE'}

// export const getVerifyCode = Vue.resource('/user/getRegisterCodeToSupplier.json')