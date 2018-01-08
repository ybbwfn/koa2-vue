const setTitle = (title) => {
    return {
        title: title
    }
}
import menu from 'page/menu/menu';
const home = resolve => { require(['page/menu/home/home'], resolve); }
const studyNotes = resolve => { require(['page/menu/studyNotes/studyNotes'], resolve); }
    // 个人中心
const pesonalCenter = resolve => { require(['page/menu/pesonalCenter/pesonalCenter'], resolve); }
const journal = resolve => { require(['page/menu/pesonalCenter/journal/journal'], resolve); }
const memo = resolve => { require(['page/menu/pesonalCenter/memo/memo'], resolve); }
const mood = resolve => { require(['page/menu/pesonalCenter/mood/mood'], resolve); }

// login
const login = resolve => { require(['page/login/login'], resolve); }


// 作为Main组件的子页面展示
export const appRouter = [
    // 个人中心
    {
        path: "/pesonalCenter",
        component: pesonalCenter,
        meta: setTitle('个人中心'),
        children: [
            { path: '/mood', meta: setTitle('心情'), component: mood },
            { path: '/journal', meta: setTitle('日志'), component: journal },
            { path: '/memo', meta: setTitle('备忘'), component: memo },
        ]
    },
    // 学习笔记
    { path: '/studyNotes', meta: setTitle('学习笔记'), component: studyNotes },
]


export const routers = [{
        path: '/',
        title: '首页',
        component: menu,
        redirect: "/home",
        children: [
            { path: '/home', meta: setTitle('首页'), component: home },
            ...appRouter
        ]
    },
    { path: "/login", meta: setTitle('登录'), component: login }

];