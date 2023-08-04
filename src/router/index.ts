import { createRouter, createWebHistory } from 'vue-router';
import type { App } from 'vue';
import staticRoutes from './static-routes'


export const router = createRouter({
    routes: [
        ...staticRoutes
    ],
    history: createWebHistory(),
    // 是否应该禁止尾部斜杠。默认为假
//   strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// reset router
export function resetRouter() {

}

export function setupRouter(app: App<Element>) {
    app.use(router);
  }