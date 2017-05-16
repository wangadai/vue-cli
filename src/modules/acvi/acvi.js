import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import title from 'components/title.vue'
Vue.use(VueRouter);
Vue.use(VueResource);

const acvi = resolve => require(['./views/acvi.vue'], resolve)
const acvi1 = resolve => require(['./views/acvi1.vue'], resolve)
const acvi2 = resolve => require(['./views/acvi2.vue'], resolve)
const acvi3 = resolve => require(['./views/acvi3.vue'], resolve)

const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/acvi',
    }, {
        path: '/acvi',
        name: "活动",
        component: acvi,
    }, {
        path: '/acvi1',
        name: "活动1",
        component: acvi1,
    }, {
        path: '/acvi2',
        name: "活动2",
        component: acvi2,
    }, {
        path: '/acvi3',
        name: "活动3",
        component: acvi3,
    }]
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(title),
    router,
});
