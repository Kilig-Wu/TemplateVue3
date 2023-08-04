import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosRequestHeaders, AxiosError } from 'axios';
import { notification } from 'ant-design-vue';
const request: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API ?? '/',
    timeout: 60000 // 请求超时时间
});

//响应格式
export interface ResponseBody<T = any> {
    code: number
    data?: T  // data作为一个可选参数，如果没有返回值，可以不传
    msg: string
}

const requestHandler = (config: InternalAxiosRequestConfig) => {
    (config.headers as AxiosRequestHeaders)['Accept-Language'] = 'zh-Hans';
    const token = useStorage('token', null);
    // 如果 token 存在
    // 让每个请求携带自定义 tokenTODO表单未加token
    if (token.value) {
        (config.headers as AxiosRequestHeaders)['Authorization'] = token.value;
    }
    return config;
}
const requestErrorHandler = (error: AxiosError): Promise<any> => {
    return Promise.reject(error);
}

const responseHandler = (response: any): ResponseBody<any> | AxiosResponse<any> | Promise<AxiosResponse<any>> | any => {
    return response.data
}

const responseErrorHandler = (error: AxiosError): Promise<any> => {
    let err = error.response
    if (err) {
        const { data, status, statusText } = err as AxiosResponse<ResponseBody>
        // 获取 token
        // const token = useStorage('token', null);
        switch (status) {
            case 401: {
                notification?.error({ message: '401', description: data?.msg || statusText, duration: 4 });
                //1.token过期刷新token,
                // if (token) {
                //     store.dispatch('RefreshToken').then(newToken => {
                //         const config = err.response.config;
                //         config.headers['Authorization'] = newToken;
                //     });
                // }
                //2.或者清空token重新登录跳转登录页面
                // token.value = null
                // router
                //     .push({
                //         path: '/login',
                //         query: {
                //             redirect: router.currentRoute.value.path,
                //         },
                //     })
                //     .then(() => { })
                break;
            }
            case 404: {
                notification?.error({
                    message: '系统提示',
                    description: '很抱歉，资源未找到!',
                    duration: 4
                });
                break;
            }
            default: {
                notification?.error({
                    message: '服务错误',
                    description: data?.msg || statusText,
                    duration: 3,
                })
            }
        }
    }
    return Promise.reject(err);
}

request.interceptors.request.use(requestHandler, requestErrorHandler);
request.interceptors.response.use(responseHandler, responseErrorHandler);

export default request;


export function $get<R = any, T = any>(url: string, params?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>>{
    return request.get(url, { params, ...config })
}

export function $post< R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> {
    return request.post(url, data, config)
}

//put
export function $put< R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> {
    return axios.put(url, data, config);
}

//delete
export function $delete< R = any, T = any>(url: string, params?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> {
    return axios.delete(url, { params, ...config })
}

//upload