import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "./TokenService";

export const api = axios.create({ baseURL: "http://192.168.1.17:8080" });

api.interceptors.request.use(async (config: any) => {
  config.headers["Accept"] = "application/json";
  config.headers["Content-Type"] = "application/json";
  config.headers["Authorization"] = "Bearer " + (await getToken());
  return config;
});
const token = async () => {
  return await getToken();
};

export const config = {
  headers: {
    ["Accept"]: "application/json",
    ["Content-Type"]: "application/json",
    ["Authorization"]: `Bearer ${token()})`,
  },
};

export default api;
