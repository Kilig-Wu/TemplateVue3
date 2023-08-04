import { defineStore } from 'pinia';
import type { UserInfo } from '#/store'; 

interface UserState {
    userInfo: Nullable<UserInfo>,
    roles: [],
    token?: string,
    refreshToken?: string
}

export const useUserStore = defineStore('app-user', {
    state: (): UserState => ({
        userInfo: null,
        roles: [],
        token: undefined,
        refreshToken: undefined
    }),
    actions: {
        async getUserInfo() {

        }
    }
})