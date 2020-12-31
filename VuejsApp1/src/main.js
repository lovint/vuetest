import Vue from 'vue';

import App from './App.vue';

import router from '@/router';

import Antd from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';

import VueResource from 'vue-resource';


Vue.use(Antd)
Vue.use(VueResource)


new Vue({
    render: h => h(App),
    router
}).$mount('#app');
