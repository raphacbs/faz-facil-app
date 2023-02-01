import { useInfiniteQuery, useQuery } from "react-query";
import { IItemPost, IItemPutAndPost, IParamsItem } from "../@types/item";
import { IProduct } from "../@types/product";

import api, { config } from "../services/api";

const endPoint = "/api/v1/products";

export const fetchProductByCode = async (code: string) => {
  const url = `${endPoint}?pageNo=1&pageSize=10&sortBy=description&code=${code}`;
  const { data } = await api.get(url);
  return data;
};

export const getProductByCode = (code: string, enabled: boolean) =>
  useQuery(["productByCode", code], () => fetchProductByCode(code), {
    enabled: enabled,
  });

export const fetchProducts = async (pageParam: number, description: string) => {
  const url = `${endPoint}?pageNo=${pageParam}&pageSize=10&sortBy=description&sortDir=asc${
    description ? "&description=" + description : ""
  }`;
  const { data } = await api.get(url);
  return data;
};

// export const postOrPutItem = async (item: IItemPutAndPost) => {
//   const url = `${endPoint}`;
//   if (item.id) {
//     const { data } = await api.put(url, item);
//     return data;
//   } else {
//     const { data } = await api.post(url, item);
//     return data;
//   }
// };

// export const putShoppingList = async (shoppingList: IShoppingListPost) => {
//   const url = `${endPoint}`;

//   const { data } = await api.put(url, shoppingList);
//   return data;
// };

// const useQueryItems = (params: IParamsItem) =>
//   useInfiniteQuery(
//     ["shoppingLists", params],
//     ({ pageParam = 1 }) => fetchItems(pageParam, params),
//     {
//       getNextPageParam: (lastPage) => {
//         if (!lastPage.last) {
//           return lastPage.pageNo + 1;
//         }
//         return false;
//       },
//       refetchInterval: 60000,
//     }
//   );

// export default useQueryItems;
