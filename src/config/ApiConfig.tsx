import {setupInterceptorsTo} from "./Interceptor";
const axios = require('axios');

export function Get(url: string, option?: any) {        
    return axios.get(url, option);
}

export function Post(url: string, obj: any, option?: any) {
    return axios.post(url, obj);
}

export function Put(url: string, obj: any, option?: any) {
    return axios.post(url, obj);
}

export function DeleteById(id: string, option?: any) {
    return axios.delete(id, option);
}

setupInterceptorsTo(axios);
