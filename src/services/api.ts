import axios from "axios";
import { useEnv } from "../hooks/useEnv";
//url dev : https://faz-feira-hml.herokuapp.com
// url local: http://192.168.1.16:8080
const api = axios.create({
  baseURL: "https://faz-feira-hml.herokuapp.com",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImY2MDEwNDY0LTFlMGItNDNkNC1iYjlkLWI0YTBmYTE0YzExNCIsImVtYWlsIjoicmFwaGFlbGNvZWxAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiUmFwaGFlbCIsImxhc3ROYW1lIjoiQ29lbGhvIn0.pze8GjKV0gL0ePcLib3QHbJbTZkdHTSDn1FfyB9KIBc",
  },
});

export const searchProducts = async (pageParam: number, searchTerm: string) => {
  const params = {
    pageNo: pageParam,
    pageSize: 4,
    sortBy: "description",
    sortDir: "asc",
  };
  let search = "";
  if (/^\d+$/.test(searchTerm)) {
    search = `code=${searchTerm}`;
  } else {
    search = `description=${searchTerm}`;
  }
  const url = `/api/v1/products?pageNo=${params.pageNo}&pageSize=${params.pageSize}&${search}&sortBy=${params.sortBy}&sortDir=${params.sortDir}`;
  console.log("url", url);
  const response = await api.get(url);
  return response.data;
};

export default api;
