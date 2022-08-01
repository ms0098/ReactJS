import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

function intercept(config: AxiosRequestConfig) {
    config.baseURL = process.env.REACT_APP_BASE_API_URL;
    config.headers = {
        token: 'Bearer ' + 'No Auth'
    }
    return config;
}
const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    return intercept(config);
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}