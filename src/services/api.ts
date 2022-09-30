import axios, { AxiosRequestConfig } from 'axios';

export const api = axios.create({ baseURL: 'https://feira-facil-bff-app-dev.herokuapp.com' });

api.interceptors.request.use(async (config: any) => {
    config.headers['X-API-KEY'] = 'appff22rc';
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    return config;
})

export const config = {
    headers: {
        'X-API-Key': 'appff22rc'
    },
    baseURL: 'https://feira-facil-bff-app-dev.herokuapp.com'
}
export default api;