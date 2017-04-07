<template lang="html">
    <div id="wrapper">
        <div class="topbar">
            
        </div>
        <div >
            <div>
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
        return {}
    },
    created(){
        
    },
	mounted(){
		
	},
    methods:{

    }
}
</script>
