import { router } from './index';
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { usePermissionStore } from '@/store/modules/permission';
import { defaultRoutePath } from './generate-route';
const whiteList = ['login', 'register', 'forgetPassword']; //路由白名单
const loginRoutePath = '/user/login'; //登录路径

router.beforeEach(
    async (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
    ) => {
        if (to.meta && to.meta.title) {
            //设置网站标题
            useTitle(to.meta.title as string);
        }
        const token = useStorage('token', null);
        if (token.value) {
            //存在token
            if (to.path === loginRoutePath) {
                //去的页面是登录页 直接进入到菜单
                next({ path: defaultRoutePath });
            } else {
                const userStore = useUserStore();
                const permissionStore = usePermissionStore();

                //去的页面不是登录页
                if (!userStore.userInfo) {
                    try {
                        //获取用户信息
                        await userStore.getUserInfo();

                        // 获取路由菜单的信息
                        const currentRoute = await permissionStore.generateRoutes();
                        await router.addRoute(currentRoute);

                        //获取用户权限列表（如果有的话）
                        
                        // 请求带有 redirect 重定向时，登录自动重定向到该地址
                        const redirect = decodeURIComponent(from.query.redirect || to.path);
                        if (to.path === redirect) {
                            //设置replace：true，这样导航将不会留下历史记录
                            next({ ...to, replace: true });
                        } else {
                            // 跳转到目的路由
                            next({ path: redirect });
                        }
                    } catch (e) {}
                }
            }
        } else {
            //不存在token
            if (whiteList.includes(to.name as string)) {
                // 在免登录白名单，直接进入
                next();
            } else {
                //不在免登白名单，进入登录页
                next({
                    path: loginRoutePath,
                    query: { redirect: encodeURIComponent(to.fullPath) }
                });
            }
        }
    }
);
