import type { RouteRecordRaw } from 'vue-router';
//静态路由文件登录、注册等
export default [
    {
        path: '/user/login',
        name: 'login',
        meta: { title: '登录' },
        component: () => import('@views/user/login.vue')
    },
    {
        path: '/user/register',
        name: 'register',
        meta: { title: '注册' },
        component: () => import('@views/user/register.vue')
    },
    {
        path: '/404',
        name: '404',
        meta: { title: '404' },
        component: () => import(/* webpackChunkName: "fail" */ '@views/error/404.vue')
    },
] as RouteRecordRaw[]