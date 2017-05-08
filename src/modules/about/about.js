import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import title from 'components/title.vue'
Vue.use(VueRouter);
Vue.use(VueResource);

const about = resolve => require(['./about.vue'], resolve)

const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/about',
    }, {
        path: '/about',
        name: "关于",
        component: about,
    }]
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(title),
    router,
});
