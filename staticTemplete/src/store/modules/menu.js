const menu = {
    state: {
        session: {},
        menuList: []
    },
    mutations: {
        pushMenu(state, router) {
            var flag = true;
            state.menuList.forEach(function(v, i) {
                if (v.path == router.path) {
                    flag = false;
                    return;
                }
            })
            if (flag) {
                state.menuList.push(router)
            }
        },
        delMenu(state, index) {
            state.menuList.splice(index, 1)
        },
        changeSession(state, obj) {
            state.session = obj;
        },
        delSession(state) {
            state.session = {};
        }
    },
};

export default menu;