import axios from 'axios'
import { useStore } from "vuex";
import { setItem, getItem } from "../store/storage";
const store = useStore()

// 创建实例时设置配置的默认值
const instance = axios.create({
    baseURL: 'https://yxcrapi.vercel.app/',    //例如h：ttps://test-test-test.vercel.app/
    changeOrigin: true,  //跨域
    timeout: 5000,
    withCredentials: true,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});
// 全局
instance.defaults.transformRequest = [function (data) {
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]
// 添加请求拦截器
instance.interceptors.request.use(
    // 在发送请求之前做些什么
    config => {
        config.headers['cookie'] = getItem("TOKEN_KEY")
        if (config.method == 'post') {
            config.data = {
                ...config.data,
                _t: Date.parse(new Date()) / 1000
            }
        } else if (config.method == 'get') {
            config.params = {
                _t: Date.parse(new Date()) / 1000,
                ...config.params
            }
        }
        return config
    },

    error => {
        console.log(error)
        return Promise.reject(error)
    })

// 添加响应拦截器
instance.interceptors.response.use(response => {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

//暴露出去
export default instance;