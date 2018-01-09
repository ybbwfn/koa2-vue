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
import http from 'utils/http'
Vue.use(iView);
// 指令
Object.keys(directives).forEach(function(key) {
    Vue.directive(key, directives[key]);
});

// 过滤器
Object.keys(filters).forEach(function(key) {
    Vue.filter(key, filters[key]);
});
Vue.mixin({
    data() {
        return {
            _this: this
        }
    },
    methods: {
        _initLoading(funcs, callback) {
            this._showLoading();
            Promise.all(funcs).then(() => {
                this._hideLoading();
                if (typeof callback === 'function') {
                    callback();
                }
            });
        },
        _showLoading() {
            this.$Message.loading('正在加载中...', 0);
        },
        _hideLoading() {
            this.$Message.destroy();
        },
        async _post(url, params, callback) {
            const res = await http.post(url, params)
            var data = res.data;
            if (!!data) {
                if (data.success) {
                    callback(data);
                } else if (!data.success) {
                    this.$Message.error(data.error_msg);
                } else {
                    this.$Message.error(`请求失败!`);
                }
            } else {
                this.$Message.error(`请求失败!`);
            }
        },
        async _get(url, params, callback) {
            const res = await http.get(url, params)
            var data = res.data;
            if (!!data) {
                if (data.success) {
                    callback(data);
                } else if (!data.success) {
                    this.$Message.error(data.error_msg);
                } else {
                    this.$Message.error(`请求失败!`);
                }
            } else {
                this.$Message.error(`请求失败!`);
            }
        }
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
})