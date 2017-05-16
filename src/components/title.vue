<template lang="html">
    <div>
        <div class="topbar">
            <a href="index.html" class="logo"><img src="http://op28wafvd.bkt.clouddn.com/adai.png" width="50"></span></a>
            <ul>
                <li @click="aaaa(1)"><a href="/main.html">1</a></li>
                <li @click="aaaa(2)"><a href="/acvi.html">2</a></li>
                <li @click="aaaa(3)"><a href="/about.html">3</a></li>
            </ul>
        </div>
        <div class="contentbar">
            <div class="leftbar">
                <ul v-if="id==1">
                    <li><a href="/main.html#/main1">1</a></li>
                    <li><a href="/main.html#/main2">2</a></li>
                    <li><a href="/main.html#/main3">3</a></li>
                </ul>
                <ul v-if="id==2">
                    <li><a href="/acvi.html#/acvi1">1</a></li>
                    <li><a href="/acvi.html#/acvi2">2</a></li>
                    <li><a href="/acvi.html#/acvi3">3</a></li>
                </ul>
                <ul v-if="id==3">
                    <li><a href="/about.html#/about1">1</a></li>
                    <li><a href="/about.html#/about2">2</a></li>
                    <li><a href="/about.html#/about3">3</a></li>
                </ul>
            </div>
            <div class="content">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
            <footer class="footbar">阿呆</footer>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id: 1,
        }
    },
    created(){},
  	mounted(){
        console.log(this.href)
    },
  	watch: {},
    methods:{
        aaaa(id) {
            this.id = id;
        }
    }
}
</script>

<style scoped>
    .topbar{height: 50px;padding: 10px 20px;}
    .footbar{position: absolute;bottom: 0;right: 0;text-align: center;width: 100%;padding: 10px;}
    .contentbar{padding: 10px;}
    .leftbar{border: 1px solid red;width: 20%;float: left;}
    img{display: block;float: left;margin-right: 30px;}
    ul,ul li{display: block;margin: 0;padding: 0;}
    ul li{width: 10%;float: left;}
    ul li>a{display: block;width: 100%;height: 100%;}
    .leftbar ul{height: 100%;overflow: hidden;}
    .leftbar li{width: 100%;text-align: center;padding: 10px 0;}
    .content{float: left;padding: 20px;}
</style>
