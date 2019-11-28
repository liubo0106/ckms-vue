/**
 * Created by Administrator on 2019/2/2.
 */
import axios from 'axios';
//let baseProduceUrl = 'https://www.89shi.cn/ckms/';//正式打包地址
//let baseProduceUrl = 'http://39.98.152.8:80/ckmstest/';//测试打包地址
let baseProduceUrl = 'http://localhost:8083/ckmsdev/';//自己测试打包地址
//let baseTestURL = 'http://192.168.60.188:8083/ckmsdev/';//本地联调地址
//let baseTestURL = 'https://www.89shi.cn/ckms/';//正式地址
//let baseTestURL = 'https://www.89shi.cn/ckmsdev/';//测试地址
let baseTestURL = 'https://www.89shi.cn/ckmsdev/'; //自己测试地址
export function httpRequest(method, url, params, contentType) {
    if (contentType == '') {
        return axios({
            method: method,
            baseURL: process.env.NODE_ENV == 'development' ? baseTestURL : baseProduceUrl,
            url: url,
            params: params,
            headers: { 'sessionId': sessionStorage.getItem('sessionId') }
        });
    } else if (contentType == 'blob') {
        return axios({
            responseType: 'blob',
            contentType: 'application/json',
            method: method,
            baseURL: process.env.NODE_ENV == 'development' ? baseTestURL : baseProduceUrl,
            url: url,
            data: params,
            headers: { 'sessionId': sessionStorage.getItem('sessionId') }
        });
    } else {
        return axios({
            contentType: 'application/json',
            method: method,
            baseURL: process.env.NODE_ENV == 'development' ? baseTestURL : baseProduceUrl,
            url: url,
            data: params,
            headers: { 'sessionId': sessionStorage.getItem('sessionId') }
        });
    }
}

export function httpRequestUpload(url) {
    return (process.env.NODE_ENV == 'development' ? baseTestURL : baseProduceUrl) + url;
}
export const baseUrl = process.env.NODE_ENV == 'development' ? baseTestURL : baseProduceUrl;
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
