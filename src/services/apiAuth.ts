import axios, { AxiosRequestConfig } from "axios";

export const apiAuth = axios.create({
  baseURL: process.env.API_URL,
});

apiAuth.interceptors.request.use(async (config: any) => {
  config.headers["Accept"] = "application/json";
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default apiAuth;
