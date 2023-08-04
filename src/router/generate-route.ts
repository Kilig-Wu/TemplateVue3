import type { RouteRecordRaw } from 'vue-router'
export const defaultRoutePath = '/dashboard'
const Layout = () => import('@/layout/basic-layout/index.vue');

export type MenuData = MenuDataItem[]
export interface MenuDataItem {
     // 标题
  title: string 
  // 图标
  icon?: string
  // 地址
  path: string
  name: string
}
// 根级路由
const rootRoute: RouteRecordRaw = {
    path: '/',
    name: 'rootPath',
    redirect: defaultRoutePath,
    component: Layout,
    children: [],
}

//构造树形路由结构数据 生成 vue-router 层级路由表--[获取到后台的菜单路由的信息是扁平的]
export const generateTreeRoutes = (menus: MenuData, parent) => {
    return menus.map(item => {
        const route = {
            path: item.path,
            name: item.name,
        }
    })
}