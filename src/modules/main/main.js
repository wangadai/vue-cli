import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import title from 'components/title.vue'
Vue.use(VueRouter);
Vue.use(VueResource);

const main = resolve => require(['./views/main.vue'], resolve)
const main1 = resolve => require(['./views/main1.vue'], resolve)
const main2 = resolve => require(['./views/main2.vue'], resolve)
const main3 = resolve => require(['./views/main3.vue'], resolve)

const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/main',
    }, {
        path: '/main',
        name: "主页",
        component: main,
    }, {
        path: '/main1',
        name: "主页1",
        component: main1,
    }, {
        path: '/main2',
        name: "主页2",
        component: main2,
    }, {
        path: '/main3',
        name: "主页3",
        component: main3,
    }]
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(title),
    router,
});
