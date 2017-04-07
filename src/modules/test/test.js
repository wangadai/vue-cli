import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import 'filters'
import 'components'
import Wrap from 'components/c-wrap'

Vue.use(VueRouter);
Vue.use(VueResource);

const test = resolve => require(['./view/test.vue'], resolve)

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
    render: h => h(Wrap),
    router,
});
