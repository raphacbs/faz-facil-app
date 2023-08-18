import axios from "axios";
import { Env } from "../Env";
import { getUserLogged } from "../store/actions/userAction";
import { UserInfo } from "../types/UserInfo";
//url dev : https://faz-feira-hml.herokuapp.com
// url local: http://192.168.1.16:8080
console.log(Env.API_BASE_URL);
const api = axios.create({
  baseURL: Env.API_BASE_URL,
  // headers: {
  //   Authorization:
  //     "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImY2MDEwNDY0LTFlMGItNDNkNC1iYjlkLWI0YTBmYTE0YzExNCIsImVtYWlsIjoicmFwaGFlbGNvZWxAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiUmFwaGFlbCIsImxhc3ROYW1lIjoiQ29lbGhvIn0.pze8GjKV0gL0ePcLib3QHbJbTZkdHTSDn1FfyB9KIBc",
  // },
});

// api.interceptors.request.use((request) => {
//   console.log("Requisição:", request);
//   return request;
// });

// api.interceptors.response.use((response) => {
//   console.log("Resposta:", response);
//   return response;
// });

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

  const response = await api.get(url);
  return response.data;
};

export const getShoppingList = async (
  pageParam: number = 1,
  description: string | null
) => {
  const params = {
    pageNo: pageParam,
    pageSize: 10,
    sortBy: "description",
    sortDir: "asc",
  };
  let query = "";
  if (description) {
    query = `&description=${description}`;
  }
  const url = `${Env.API_BASE_URL}api/v1/shopping-lists?pageNo=${params.pageNo}&pageSize=${params.pageSize}${query}&sortBy=${params.sortBy}&sortDir=${params.sortDir}`;
  const userLogged: UserInfo = await getUserLogged();

  const shoppingListResponse = await axios(url, {
    headers: {
      Authorization: `Bearer ${userLogged.tokenDto.token}`,
    },
    method: "GET",
  });

  return shoppingListResponse.data;
};

export default api;
