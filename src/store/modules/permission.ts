import { defineStore } from 'pinia';

interface PermissionState {
    routers: []
    // 权限代码列表
  permCodeList: string[] | number[];
}

export const usePermissionStore = defineStore('app-permission', {
    state: (): PermissionState => ({
        routers: [],
        permCodeList: []
    }),
    actions: {
        //动态生成路由
        generateRoutes() {

        }
    }
})

export default usePermissionStore