export const $alert=function(con,_callback){
    dialog({
       title:"系统提示",
        id:"util-alert",
        fixed: true,
        content: con,
        width:300,
        cancel: false,
        okValue: '确定',
        backdropOpacity:"0.5",
        ok: function () {
            if(_callback){
                _callback();
            }
        }
    }).showModal();
    // alert(con)
}

export const $confirm=function(con,okCallback,cancelCallback){
    dialog({
        title:"系统提示",
        id:"util-confirm",
        fixed: true,
        content: con,
        width:300,
        cssUri:'',
        okValue: '确定',
        cancelValue:'取消',
        backdropOpacity:"0.5",
        ok: okCallback,
        cancel:cancelCallback ? cancelCallback : function(){}
    }).showModal();
}