import { ShoppingList, ShoppingListPost } from "../../types/ShoppingList";
import useConstants from "../../hooks/useConstants";

import api from "../../services/api";
import { Env } from "../../Env";
import { getUserLogged } from "./userAction";
import { UserInfo } from "../../types/UserInfo";
import axios from "axios";
import { Item, ItemPost } from "../../types/Item";

const endPoint = "/api/v1/shopping-lists";

const { SET_ITEM_TO_SAVE, SET_ITEMS, SET_SELECTED_ITEM, CHANGE_ITEM_IN_ITEMS } =
  useConstants();

export const setItemToSave: any = (itemToSave: ItemPost) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_ITEM_TO_SAVE,
      payload: itemToSave,
    });
  };
};

export const setSelectedItem: any = (selectedItem: ItemPost) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_SELECTED_ITEM,
      payload: selectedItem,
    });
  };
};
export const changeItemFromItems: any = (item: ItemPost) => {
  return (dispatch: any) => {
    dispatch({
      type: CHANGE_ITEM_IN_ITEMS,
      payload: item,
    });
  };
};

export const setItems: any = (items: Array<Item>) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_ITEMS,
      payload: items,
    });
  };
};

export const addItem = async (itemPost: ItemPost) => {
  const userLogged: UserInfo | undefined = await getUserLogged();
  const url = `${Env.API_BASE_URL}api/v1/items`;
  console.log(itemPost);
  const itemResponse = await axios.post(url, itemPost, {
    headers: {
      Authorization: `Bearer ${userLogged?.tokenDto.token}`,
    },
  });
  return itemResponse.data;
};
export const updateItem = async (itemPost: ItemPost) => {
  const userLogged: UserInfo | undefined = await getUserLogged();
  const url = `${Env.API_BASE_URL}api/v1/items`;
  const itemResponse = await axios.put(url, itemPost, {
    headers: {
      Authorization: `Bearer ${userLogged?.tokenDto.token}`,
    },
  });

  return itemResponse.data;
};

export const removeItem = async (itemId: string) => {
  const userLogged: UserInfo | undefined = await getUserLogged();
  const url = `${Env.API_BASE_URL}api/v1/items/${itemId}`;
  const itemResponse = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${userLogged?.tokenDto.token}`,
    },
  });
  return itemResponse.data;
};

export const getItems = async (
  pageParam: number = 1,
  shoppingListId: string,
  productDesc?: string | null,
  isAdded?: boolean | null
) => {
  const params = {
    pageNo: pageParam,
    pageSize: 10,
    sortBy: "createdAt",
    sortDir: "desc",
  };
  let query = "";
  if (productDesc) {
    query = `&productDesc=${productDesc}`;
  }
  if (isAdded) {
    query += `&isAdded=${isAdded}`;
  }
  const url = `${Env.API_BASE_URL}api/v1/items?pageNo=${params.pageNo}&pageSize=${params.pageSize}${query}&sortBy=${params.sortBy}&sortDir=${params.sortDir}`;
  const userLogged: UserInfo | undefined = await getUserLogged();

  const itemResponse = await axios(url, {
    headers: {
      Authorization: `Bearer ${userLogged?.tokenDto.token}`,
      shoppingListId: shoppingListId,
    },
    method: "GET",
  });

  return itemResponse.data;
};
