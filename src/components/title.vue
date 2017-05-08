<template lang="html">
    <div>
        <div class="topbar">
           <a href="index.html" class="logo"><img src="http://op28wafvd.bkt.clouddn.com/adai.png" width="50"></span></a>
        </div>
        <div class="contentbar">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
            <footer class="footbar">阿呆</footer>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    created(){},
	mounted(){},
	watch: {},
    methods:{}
}
</script>

<style scoped>
    .topbar{height: 50px;padding: 10px 20px;}
    .footbar{position: absolute;bottom: 0;right: 0;text-align: center;width: 100%;padding: 10px;}
    .contentbar{padding: 10px;}
</style>
