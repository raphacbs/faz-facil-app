import { useInfiniteQuery, useQuery } from "react-query";
import { IItemPost, IItemPutAndPost, IParamsItem } from "../@types/item";

import api, { config } from "../services/api";

const endPoint = "/api/v1/items";

export const fetchItems = async (pageParam: number, params: IParamsItem) => {
  config.headers["shoppingListId"] = params.shoppingListId;

  const url = `${endPoint}?pageNo=${params.pageNo}&pageSize=${
    params.pageSize
  }&sortBy=${params.sortBy}&sortDir=${params.sortDir}${
    params.isAdded != undefined ? "&isAdded=" + params.isAdded : ""
  }${params.productDesc ? "&productDesc=" + params.productDesc : ""}`;

  const { data } = await api.get(url, config);
  return data;
};

// const fetchShoppingListsById = async (id: string) => {
//   const url = `${endPoint}/${id}`;
//   const { data } = await api.get(url);
//   return data;
// };

export const postOrPutItem = async (item: IItemPutAndPost) => {
  const url = `${endPoint}`;
  if (item.id) {
    const { data } = await api.put(url, item);
    return data;
  } else {
    const { data } = await api.post(url, item);
    return data;
  }
};

// export const putShoppingList = async (shoppingList: IShoppingListPost) => {
//   const url = `${endPoint}`;

//   const { data } = await api.put(url, shoppingList);
//   return data;
// };

const useQueryItems = (params: IParamsItem) =>
  useInfiniteQuery(
    ["shoppingLists", params],
    ({ pageParam = 1 }) => fetchItems(pageParam, params),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.last) {
          return lastPage.pageNo + 1;
        }
        return false;
      },
      refetchInterval: 60000,
    }
  );

export default useQueryItems;
