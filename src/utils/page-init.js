/**
 * PC页面初始化脚本 [v0.0.1] 不需要手工引入，已经压缩内嵌到公共的头部
 * 功能：检测是否支持webp
 * 支持
 *   html添加class名称 `webp`
 *   localStorage与cookie中写入 support-webp=1
 *   对外提供接口supportWebp(fn(support))
 * 不支持
 *   localStorage与cookie中写入 support-webp=0
 */
;(function(window, document, undefined){
  window.supportWebp = function(callback){
    if(!window.localStorage) callback(false);

    callback = callback || function(){};
    if(localStorage.getItem('support-webp')==='1'){
      document.documentElement.classList.add('webp');
      return callback(true);
    }

    var image = new Image();
    image.onerror = function(){
      localStorage.setItem('support-webp','0');
      callback(false);
    };
    image.onload = function(){
      if(image.width == 1){
        document.documentElement.classList.add('webp');
        localStorage.setItem('support-webp','1');
        document.cookie = "support-webp=1; max-age=31536000; domain="
        callback(true);
      }else{
        localStorage.setItem('support-webp','0');
        callback(false);
      }
    };
    image.src = 'data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAUAgCdASoBAAEAL/3+/3+CAB/AAAFzrNsAAP5QAAAAAA==';
  }

  window.supportWebp();
})(window, document);
