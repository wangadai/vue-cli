<template>
    <section v-if="time">
        <span class="hour">{{day}}</span>{{text[lang||'ch'][0]}}
        <span class="hour">{{hour}}</span>{{text[lang||'ch'][1]}}
        <span class="mini">{{mini}}</span>{{text[lang||'ch'][2]}}
        <span class="sec">{{sec}}</span>{{text[lang||'ch'][3]}}
    </section>
</template>
<script>
/*
 * 倒计时组件
 *  @param Int time 倒计时剩余时间 单位s
 *  @param String lang 语言 'ch';'en'
 *  @param Function callback  计时结束回调函数 
 *
*/ 
export default {
    props: ["time", "lang", "callback"],
    data () {
        return {
            day: '00',
            hour: '00',
            mini: '00',
            sec:  '00',
            s: this.time,
            text: {
                ch: ['天', '时', '分', '秒'],
                en: [':', ':', ':', '']
            }
        }
    },
    mounted(){
        this.init();
    },
    methods: {
        init(){
            if (this.time){
                this.timer();
            }
        },
        zero (n){
            let _n = parseInt(n, 10);
            if(_n > 0){
                if(_n <= 9){
                    _n = "0" + _n
                }
                return String(_n);
            }else{
                return "00";
            }
        },
        timer (){
            if(this.s >= 0){
                this.sec = this.zero(this.s % 60);
                this.mini = Math.floor((this.s / 60)) > 0 ? this.zero(Math.floor((this.s / 60)) % 60) : "00";
                this.hour = Math.floor((this.s / 3600)) > 0 ? this.zero(Math.floor((this.s % 86400) / 3600)) : "00";
                this.day = Math.floor((this.s / 86400)) > 0 ? this.zero(Math.floor(this.s / 86400)) : "00";

                this.s -= 1;
                setTimeout(this.timer, 1000);
            }else{
                this.day = this.hour = this.mini = this.sec = "00";

                this.callback && this.callback();
                return;
            }
        }
    }
}
</script>
