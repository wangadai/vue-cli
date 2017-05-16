import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import title from 'components/title.vue'
Vue.use(VueRouter);
Vue.use(VueResource);

const about = resolve => require(['./views/about.vue'], resolve)
const about1 = resolve => require(['./views/about1.vue'], resolve)
const about2 = resolve => require(['./views/about2.vue'], resolve)
const about3 = resolve => require(['./views/about3.vue'], resolve)

const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/about',
    }, {
        path: '/about',
        name: "关于",
        component: about,
    }, {
        path: '/about1',
        name: "关于1",
        component: about1,
    }, {
        path: '/about2',
        name: "关于2",
        component: about2,
    }, {
        path: '/about3',
        name: "关于3",
        component: about3,
    }]
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(title),
    router,
});
