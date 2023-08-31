import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosError } from 'axios';
const notification = useNotification()
const request: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API ?? '/',
    timeout: 60000 // 请求超时时间
});

//响应格式
export interface ResponseBody<T = any> {
    code: number
    result?: T  // data作为一个可选参数，如果没有返回值，可以不传
    message: string
    success: boolean
    timestamp: number
}

const requestHandler = (config: InternalAxiosRequestConfig) => {
    config.headers['Accept-Language'] = 'zh-Hans';
    const token = useAuthorization();
    if (token.value) {
        config.headers['Authorization'] = token.value;
    }
    return config;
}
const requestErrorHandler = (error: AxiosError): Promise<any> => {
    return Promise.reject(error);
}

const responseHandler = (response: any): ResponseBody<any> | AxiosResponse<any> | Promise<AxiosResponse<any>> | any => {
    console.log(response);
    
    return response.data
}

const responseErrorHandler = (error: AxiosError): Promise<any> => {
    let err = error.response;
    if (err) {
        const { data, status, statusText } = err as AxiosResponse<ResponseBody>
        // 获取 token
        const token = useAuthorization();
        switch (status) {
            case 401: {
                notification.error({ message: '401', description: data?.message || statusText, duration: 4 });
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
                notification.error({
                    message: '系统提示',
                    description: '很抱歉，资源未找到!',
                    duration: 4
                });
                break;
            }
            default: {
                notification.error({
                    message: '服务错误',
                    description: data?.message || statusText,
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

//get
export function useGet<R = any, T = any>(url: string, params?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>>{
    return request.get(url, { params, ...config })
}

export function usePost<R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> {
    return request.post(url, data, config)
}

//put
export function usePut<R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> {
    return axios.put(url, data, config);
}

//delete
export function useDelete<R = any, T = any>(url: string, params?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> {
    return axios.delete(url, { params, ...config })
}

//upload
