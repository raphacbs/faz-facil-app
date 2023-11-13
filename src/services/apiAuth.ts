import axios, { AxiosRequestConfig } from "axios";
console.log(process.env.EXPO_PUBLIC_API_URL);
export const apiAuth = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

apiAuth.interceptors.request.use(async (config: any) => {
  config.headers["Accept"] = "application/json";
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default apiAuth;
