import axios, { AxiosRequestConfig } from 'axios';

export const api = axios.create({ baseURL: 'https://feira-facil-bff-app-dev.herokuapp.com' });

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
    config.headers['X-API-KEY'] = 'appff22rc';
    return config;
})

export default api;