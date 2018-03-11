import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import { routers } from './router';
import store from '@/store';
Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {

    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

// router.afterEach((to) => {
//     console.log("---------")
//     var session = store.state.menu.session;
//     if (session.user) {
//         Vue._user = session.user;
//         Vue._id = session.id;
//     } else {
//         router.push("/login")
//     }
//     console.log("---------")
//     iView.LoadingBar.finish();
//     window.scrollTo(0, 0);
// });