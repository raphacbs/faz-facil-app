import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.9:8080",
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
  console.log(url);
  console.log(params);
  const response = await api.get(url);
  console.log(response.data);
  return response.data;
};

export default api;
