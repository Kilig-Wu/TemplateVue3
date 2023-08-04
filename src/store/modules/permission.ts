import { defineStore } from 'pinia';

interface PermissionState {
    // 权限代码列表
  permCodeList: string[] | number[];
}

export const usePermissionStore = defineStore('app-permission', {
    state: (): PermissionState => ({
        permCodeList: []
    })
})

export default usePermissionStore