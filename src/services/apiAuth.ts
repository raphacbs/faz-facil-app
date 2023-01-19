import axios, { AxiosRequestConfig } from "axios";

export const apiAuth = axios.create({ baseURL: "http://192.168.1.17:8085" });

apiAuth.interceptors.request.use(async (config: any) => {
  config.headers["Accept"] = "application/json";
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default apiAuth;
