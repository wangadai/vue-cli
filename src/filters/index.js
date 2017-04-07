import Vue from 'vue'
//import $ from 'jquery'
import * as Utils from '../utils'

Vue.filter('dateFormat', function (date) {
	return date ? Utils.getLocalTime(date) : '';
});
Vue.filter('dayFormat', function (date) {
	return date ? Utils.getLocalTime(date,true) : '';
});
Vue.filter('toFixed', function (data,num) {
	return data ? parseFloat(data).toFixed(num?num:2) : '0.00';
});
Vue.filter('parseNumber', function (v,num) {
  num = typeof(num)=='undefined'? 0 : num;
  return /^[+-]?\d+(\.\d+)?$/.test(v)? (num===0?parseInt(v):parseFloat(v).toFixed(num)) : Number(0).toFixed(num);
});
Vue.filter('MathFloor', function (v) {
  num = typeof(num)=='undefined'? 0 : num;
  // 小数点num位之后舍弃
  return /^[+-]?\d+(\.\d+)?$/.test(v)? (num===0?Math.floor(v):(v.toString().split('.')[0]+'.'+v.toString().split('.')[1].substr(0,2))) : 0;
});
Vue.filter('toString', function (data) {
  	return typeof a === 'object' ? JSON.stringify(data) : '';
});
Vue.filter('toPercent',function(data){
	return data ? ((parseFloat(data)*100).toFixed(2)+"%") : "0.00%";
});
Vue.filter('toRate',function(data,total){
	return (data && total) ? (parseFloat(data/total*100).toFixed(2)+"%") : "0.00%";
});
Vue.filter('toRMB',function(data){
	return data ? ('¥'+parseFloat(data).toFixed(2)) : '¥0.00';
});
Vue.filter('placeholderImg', function (data,format) {
  	var placeholderImg = '';
    switch(format){
        case 'product': placeholderImg = 'https://qncdn.qiakr.com/admin/placeholer_300x300.gif'; break;
        case 'avatar': placeholderImg = 'https://qncdn.qiakr.com/mall/default-photo.png'; break;
        default: placeholderImg ='https://qncdn.qiakr.com/admin/placeholer_300x300.gif'; break;
    }
    if(!data || data.length<5) return placeholderImg;
    return data;
});
Vue.filter('getRefundStatus',function(data,format){
    var statusCn='';
    switch(data){
        case 1: statusCn = '买家发起申请'; break;
        case 2: statusCn = '退款处理中'; break;
        case 3: statusCn = '退款处理中'; break;
        case 4: statusCn = '退款处理中'; break;
        case 5: statusCn = '退款处理中'; break;
        case 10: statusCn = '退款处理中'; break;
        case 80: statusCn = '退款处理中'; break;
        case 88: statusCn = '退款已处理'; break;
        case 99: statusCn = '退款已关闭'; break;
    }
    return statusCn;
});
Vue.filter('orderStatus',function(data,format){
     switch(data){
        case 1 : 
        status="待付款";
        break;
        case 2 :
        status="已发货";
        break;
        case 10 :
        status="待发货";
        break;
        case 3 :
        status="待评价";
        break;
        case 4 :
        status="已评价";
        break;
        case 5 :
        status="已关闭";
        break;
    }
    return status;
});