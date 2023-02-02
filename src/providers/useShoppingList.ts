import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import {
  IShoppingListPost,
  IShoppingListPutAndPost,
} from "../@types/shoppingList";
import api from "../services/api";

const endPoint = "/api/v1/shopping-lists";

export const fetchShoppingLists = async (
  pageParam: number,
  description?: string
) => {
  //   {
  //   pageParam,
  //   pageSize,
  //   sortBy,
  //   sortDir,
  //   status,
  //   description,
  //   supermarketId,
  // }: IParamsShoppingList) => {
  // const url = `${endPoint}?pageNo=${pageParam}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}${
  //   status ? "&status=" + status : ""
  // }${description ? "&description=" + description : ""}${
  //   supermarketId ? "&supermarketId=" + supermarketId : ""
  // }`;
  const url = `${endPoint}?pageNo=${pageParam}&pageSize=10&sortBy=updatedAt&sortDir=desc${
    description ? "&description=" + description : ""
  }`;
  const { data } = await api.get(url);
  return data;
};

const fetchShoppingListsById = async (id: string) => {
  const url = `${endPoint}/${id}`;
  const { data } = await api.get(url);
  return data;
};

export const postOrPutShoppingList = async (
  shoppingList: IShoppingListPutAndPost
) => {
  const url = `${endPoint}`;
  if (shoppingList.id) {
    const { data } = await api.put(url, shoppingList);
    return data;
  } else {
    const { data } = await api.post(url, shoppingList);
    return data;
  }
};

export const putShoppingList = async (shoppingList: IShoppingListPost) => {
  const url = `${endPoint}`;

  const { data } = await api.put(url, shoppingList);
  return data;
};

export const getShoppingListById = (id: string, enabled: boolean) =>
  useQuery(["shoppingListById", id], () => fetchShoppingListsById(id), {
    enabled: enabled,
  });

const useQueryShoppingLists = (description?: string) =>
  useInfiniteQuery(
    ["shoppingLists"],
    ({ pageParam = 1 }) => fetchShoppingLists(pageParam, description),
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

export default useQueryShoppingLists;
