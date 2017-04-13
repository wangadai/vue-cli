import Vue from 'vue'
import pagination from './pagination'
import select2 from './select2'
import {$alert, $confirm} from 'assets/js/dialog'
import {getUrlParam, getMainPageUrl,getLocalTime, getOwnObj} from 'utils'

Vue.component('pagination', pagination)
Vue.component('select2', select2)

if(sessionStorage.fnPrivilegesCodeList){
	Vue.prototype.fnPrivilegesCodeList = JSON.parse(sessionStorage.fnPrivilegesCodeList);
}else{
	if(location.href.indexOf('login.html')+location.href.indexOf('register.html')<0){
		setTimeout(function(){
			location.reload();
		},300)
	}
}
if($.cookie("supplierId")===undefined || $.cookie("supplier")===undefined){
	window.location.href="";
}
