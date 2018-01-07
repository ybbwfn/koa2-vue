// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { router } from './router/index';
import store from './store';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'assets/css/style.css';
import 'assets/css/iview.scss';
import $ from 'jquery';
import * as filters from 'utils/filters';
import * as directives from 'utils/directives';

Vue.use(iView);
// 指令
Object.keys(directives).forEach(function(key) {
    Vue.directive(key, directives[key]);
});

// 过滤器
Object.keys(filters).forEach(function(key) {
    Vue.filter(key, filters[key]);
});


/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
})