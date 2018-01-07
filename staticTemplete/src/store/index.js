import Vue from 'vue';
import Vuex from 'vuex';

// import app from './modules/app';
// import user from './modules/user';
import menu from './modules/menu';

Vue.use(Vuex);


const store = new Vuex.Store({
    state: {},
    mutation: {},
    actions: {},
    modules: {
        menu
    }
});

export default store;