import { createRouter, createWebHistory } from 'vue-router';
import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router'
// import { basicRoutes } from './routes';
const basicRoutes:RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        meta: { title: '登录' },
        component: () => import('@views/user/login.vue')
    },
]
console.log(basicRoutes);


const router = createRouter({
    routes: basicRoutes,
    history: createWebHistory(),
    // 是否应该禁止尾部斜杠。默认为假
//   strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function setupRouter(app: App<Element>) {
    app.use(router);
  }