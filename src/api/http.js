/**
 * Created by Administrator on 2019/2/2.
 */
import axios from 'axios';
let ACTIVE_ENV_CONFIG = process.env.ACTIVE_ENV_CONFIG
// 获取配置环境的公共参数值
let envParams = process.env[ACTIVE_ENV_CONFIG]

// console.log('envParams:' + JSON.stringify(envParams))
export function httpRequest(method, url, params, contentType) {
    if (contentType == '') {
        return axios({
            method: method,
            baseURL: process.env.NODE_ENV == 'development' ? envParams.API_PATH : envParams.API_PATH,
            url: url,
            params: params,
            headers: { 'sessionId': sessionStorage.getItem('sessionId') }
        });
    } else if (contentType == 'blob') {
        return axios({
            responseType: 'blob',
            contentType: 'application/json',
            method: method,
            baseURL: process.env.NODE_ENV == 'development' ? envParams.API_PATH : envParams.API_PATH,
            url: url,
            data: params,
            headers: { 'sessionId': sessionStorage.getItem('sessionId') }
        });
    } else {
        return axios({
            contentType: 'application/json',
            method: method,
            baseURL: process.env.NODE_ENV == 'development' ? envParams.API_PATH : envParams.API_PATH,
            url: url,
            data: params,
            headers: { 'sessionId': sessionStorage.getItem('sessionId') }
        });
    }
}

export function httpRequestUpload(url) {
    return (process.env.NODE_ENV == 'development' ? envParams.API_PATH : envParams.API_PATH) + url;
}
export const baseUrl = process.env.NODE_ENV == 'development' ? envParams.API_PATH : envParams.API_PATH;
//拦截请求
axios.interceptors.request.use(function(config) {
    return config;
}, function(error) {
    return Promise.reject(error);
});

//拦截响应
axios.interceptors.response.use(function(resp) {
    if (resp.data.status == '401') {
        location.href = '#/login'
    } else {
        return resp.data;
    }
}, function(error) {
    if (error.response == null)
        error.message = '网络异常';
    return Promise.reject(error);
});
