

export const setCookie = (c_name, value, expiredays, domain, path) => {
  var exdate = new Date();
  exdate.setSeconds(exdate.getSeconds() + expiredays);
  var cookie_text = c_name + "=" + encodeURIComponent(value) +
      ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) +
      ((domain == null) ? "" : ";domain=" + domain);
  if(path){
      cookie_text += ';path='+ path
  }
  document.cookie = cookie_text;
}

export const getCookie = name => {
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)){
      return decodeURIComponent(arr[2]);
  }
  return '';
}

export const isMobile = () => {
  return !!ua.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
}

export const pageVisiblity = (visibleFn, hideFn) => {
  var eName =  typeof document['hidden'] === 'undefined' ? 'webkitvisibilitychange' : 'visibilitychange';
  document.addEventListener(eName, function() {
    if (document.hidden) {
      hideFn && hideFn();
    } else {
      visibleFn && visibleFn();
    }
  }, false);
}

export const getUrlHash = key => {
  var reg = new RegExp("(#|&)" + key + "=([^&]*)(&|$)", "i");
  var r = location.hash.match(reg);
  if(r) return decodeURIComponent(r[2]);  return "";
}

export const getChildMenus = (channelData, menuName)=>{
  let data = channelData.filter(v => v.name == menuName)[0]
  if(!data || !data['childs']) return [];

  return data['childs'].filter(v=>v.show).sort((a, b)=>a.key-b.key);
}

export const getLocalTime=function(ms,day){
    if(!ms){
        return "";
    }
    ms = Number(ms);
    var _date = new Date(ms);
    var year=_date.getFullYear(),
        month=_date.getMonth()+1,
        date=_date.getDate(),
        hour=_date.getHours(),
        minute=_date.getMinutes(),
        second=_date.getSeconds();
    return year+"-"+(month<10 ? ("0"+month) : month)+"-"+(date<10 ? ("0"+date) : date)+
          (!day ? (" "+(hour<10 ? ("0"+hour) : hour)+":"+(minute<10?("0"+minute):minute)+":"+(second<10?("0"+second):second)) : "");
}

export const getUnixTime=function(localTime){
    return !localTime ? "" : new Date(localTime.replace(/-/g,'/')).getTime();
}

export const  getUrlParam=function(key, url){
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i"), url = url ? (url.split("?")[1]||'') : window.location.href.split("?")[1], r;
    if (url){
        r = url.match(reg);
    }
    return r ? decodeURIComponent(r[2]) : "";
}

export const getMainPageUrl = function(){
    return '/admin/main.htm';
}

export const getOwnObj = function(vueObj){
    if(!vueObj && typeof vueObj != "object"){
      return;
    } 
    let objStr = JSON.stringify(vueObj);
    return JSON.parse(objStr);
}


export const chartsDataFormat = function(list){
    let res = {};
    for(let i in list[0]){
        res[i] = [];
    }
    $.each(list,function(i,e){
        for(let i in e){
            res[i].push(e[i]);
        }
    });
    return res;
}
