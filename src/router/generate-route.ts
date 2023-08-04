import type { RouteRecordRaw } from 'vue-router';
export const defaultRoutePath = '/dashboard';
const Layout = () => import('@/layout/basic-layout/index.vue');

export type MenuData = MenuDataItem[];
export interface MenuDataItem {
    // 地址
    path: string;
    name: string;
    component: any
}
// 根级路由
const rootRoute: RouteRecordRaw = {
    path: '/',
    name: 'rootPath',
    redirect: defaultRoutePath,
    component: Layout,
    children: []
};
const modules = import.meta.glob('../views/**/*.{vue,tsx}');

//构造树形路由结构数据 生成 vue-router 层级路由表--[获取到后台的菜单路由的信息是扁平的]
export const generateTreeRoutes = (menus: MenuData, parent) => {
    return menus.map(item => {
        const route:MenuDataItem = {
            path: item.path,
            name: item.name
        };
        if (item.component) {
            const comModule =
                modules[`../${item.component}.vue`] || modules[`../${item.component}.tsx`];
            const component = item.component as string;
            if (!comModule && !component.includes('#')) {
                console.error(
                    `未找到${item.component}.vue文件或${item.component}.tsx文件，请创建`
                );
            } else {
                // 动态加载路由文件，可根据实际情况进行自定义逻辑
                route.component = comModule
            }
        }
    });
};

//动态生成菜单
export const generatorDynamicRouter = function() {

}
