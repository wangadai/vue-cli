<template>
    <article v-show="isShow">
        <div class="modal-d">
            <transition name="fade">
                <div class="modal-dialog" v-show="isShow" :style="styleObj">
                    <div class="modal-content ub ub-ver">
                        <!--头部-->
                        <div class="modal-header">
                            <div class="title">{{modal.title}}</div>
                            <a @click="close(0)" class="close" href="javascript:void(0)">x</a>
                        </div>
                        <!--内容区域-->
                        <div class="modal-body">
                            <slot>

                            </slot>
                        </div>
                        <!--尾部,操作按钮-->
                        <div class="modal-footer ub">
                            <!-- <slot name="button"> -->
                                <a v-if="modal.showCancelButton" href="javascript:void(0)" :class="[modal.cancelButtonClass]" class="btn" @click="close(1)">{{modal.cancelButtonText}}</a>
                                <a v-if="modal.showConfirmButton" href="javascript:void(0)" :class="[modal.confirmButtonClass]" class="btn" @click="submit">{{modal.confirmButtonText}}</a>
                            <!-- </slot> -->
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </article>
</template>
<script>
export default {
/**
 * modal 模态接口参数
 * @param {string} modal.title 模态框标题
 * @param {boolean} modal.showCancelButton 是否显示取消按钮
 * @param {string} modal.cancelButtonClass 取消按钮样式
 * @param {string} modal.cancelButtonText 取消按钮文字
 * @param {string} modal.showConfirmButton 是否显示确定按钮
 * @param {string} modal.confirmButtonClass 确定按钮样式
 * @param {string} modal.confirmButtonText 确定按钮标文字
 * @param {string} modal.inputVal prompt类型下 input值
 * @param {function} modal.callback 确定按钮回调
 */
    props: ['styleObj'],
    computed: {
        /**
         * 格式化props进来的参数,对参数赋予默认值
         */
        modal: {
            get() {
                let modal = {};
                modal = {
                    title: modal.title || '提示',
                    showCancelButton: typeof modal.showCancelButton === 'undefined' ? true : modal.showCancelButton,
                    cancelButtonClass: modal.cancelButtonClass ? modal.cancelButtonClass : 'btn-default',
                    cancelButtonText: modal.cancelButtonText ? modal.cancelButtonText : '取消',
                    showConfirmButton: typeof modal.showConfirmButton === 'undefined' ? true : modal.showConfirmButton,
                    confirmButtonClass: modal.confirmButtonClass ? modal.confirmButtonClass : '',
                    confirmButtonText: modal.confirmButtonText ? modal.confirmButtonText : '确定',
                    callback: null
                };
                return modal;
            }
        }
    },
    data() {
        return {
            isShow: false   // 是否显示模态框
        }
    },
    methods: {
        submit(){
            if (this.modal.callback){
                this.modal.callback().then(() => {
                    this.close();
                });
            } else {
                this.close();
            }
        },
        show(ops){
            $("body").css("overflow", "hidden");
            this.modal = Object.assign(this.modal, ops);
            this.isShow = true;
        },
        close(type) {
            if (type && this.modal.cancelFn){
                this.modal.cancelFn();
            }
            $("body").css("overflow", "auto");
            this.isShow = false;
        }
    }
}

</script>
<style scoped>
.modal-d {position: fixed;left: 0;top: 0;width:100%;height:100%;z-index: 1000;background-color: rgba(0, 0, 0, .2);}
.modal-dialog {display: -webkit-box !important;display: box !important;position: absolute;left: 10%;top: 10%;;width: 80%;height:80%;background: #fff;border-radius:3px;}
.modal-header{position:relative;height:56px;line-height: 56px;white-space: nowrap;border-bottom: 1px solid #E5E5E5;padding: 0 20px;font-weight: bolder;}
.close{position: absolute;top: 10px;right: 13px;padding: 0 4px;font-size: 21px;line-height: 1;color: #000;text-shadow: 0 1px 0 #FFF;opacity: .2;filter: alpha(opacity=20);cursor: pointer;background: 0 0;border: 0;-webkit-appearance: none;}
.modal-content{display: -webkit-box !important;display: box !important;position:relative;-webkit-box-orient:vertical;box-orient:vertical;-webkit-box-flex: 1; box-flex: 1;border-radius:3px;}
.modal-body{padding: 15px;position:relative;-webkit-box-flex: 1; box-flex: 1;overflow-y:scroll;/*min-height: 250px;*/}
.modal-footer{position:relative;height:60px;line-height: 60px;border-top: 1px solid #E5E5E5;text-align: right;}
.modal-footer>a{margin-right:10px;}

.fade-enter-active, .fade-leave-active {transition: opacity .3s;-webkit-transition: opacity .3s}
.fade-enter, .fade-leave-active {opacity: 0}
</style>
