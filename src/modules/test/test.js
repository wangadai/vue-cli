import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import 'filters'
import 'components'
Vue.use(VueRouter);
Vue.use(VueResource);

const test = resolve => require(['./view/test.vue'], resolve)
const standard = resolve => require(['./view/standard.vue'], resolve)

const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/test',
    }, {
        path: '/test',
        name: "测试",
        component: test,
    }]
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(),
    router,
});
