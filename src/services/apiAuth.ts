import axios, { AxiosRequestConfig } from "axios";

export const apiAuth = axios.create({
  baseURL: "https://auth-faz-feira-hml.herokuapp.com",
});

apiAuth.interceptors.request.use(async (config: any) => {
  config.headers["Accept"] = "application/json";
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default apiAuth;
