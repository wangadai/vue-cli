<template lang="html">
    <div id="wrapper" class="forced" :class="{'enlarged':menuMini}">
        <div class="topbar">
            <div class="topbar-left">
                <div class="text-center">
                    <a href="index.html" class="logo"><i class="iconfont icon-magnet icon-c-logo">&#xe67e;</i><span><img src="" width="165"></span></a>
                </div>
            </div>
        </div>
        <div class="content-page">
            <div class="content">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    created(){

    },
	mounted(){
		
	},
    methods:{
        
    }
}
</script>
