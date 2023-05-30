import { ShoppingList, ShoppingListPost } from "../../types/ShoppingList";
import useConstants from "../../hooks/useConstants";

import api from "../../services/api";
import { Env } from "../../Env";
import { getUserLogged } from "../../store/actions/userAction";
import { UserInfo } from "../../types/UserInfo";
import axios from "axios";

const endPoint = "/api/v1/shopping-lists";

const {
  SET_SHOPPING_LIST_TO_SAVE,
  SET_SHOPPING_LISTS,
  SET_SELECTED_SHOPPING_LIST,
} = useConstants();

export const setShoppingListToSave: any = (
  shoppingListToSave: ShoppingListPost
) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_SHOPPING_LIST_TO_SAVE,
      payload: shoppingListToSave,
    });
  };
};
export const setSelectedShoppingList: any = (
  selectedShoppingList: ShoppingList
) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_SELECTED_SHOPPING_LIST,
      payload: selectedShoppingList,
    });
  };
};

export const setShoppingLists: any = (shoppingLists: Array<ShoppingList>) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_SHOPPING_LISTS,
      payload: shoppingLists,
    });
  };
};

export const createShoppingList = async (
  shoppingListPost: ShoppingListPost
) => {
  const userLogged: UserInfo | undefined = await getUserLogged();
  const url = `${Env.API_BASE_URL}api/v1/shopping-lists`;
  const shoppingListResponse = await axios.post(url, shoppingListPost, {
    headers: {
      Authorization: `Bearer ${userLogged?.tokenDto.token}`,
    },
  });
  //const { data } = await api.post(endPoint, shoppingListPost);
  return shoppingListResponse.data;
};

export const getShoppingList = async (
  pageParam: number = 1,
  description: string | null
) => {
  const params = {
    pageNo: pageParam,
    pageSize: 10,
    sortBy: "updatedAt",
    sortDir: "desc",
  };
  let query = "";
  if (description) {
    query = `&description=${description}`;
  }
  const url = `${Env.API_BASE_URL}api/v1/shopping-lists?pageNo=${params.pageNo}&pageSize=${params.pageSize}${query}&sortBy=${params.sortBy}&sortDir=${params.sortDir}`;
  const userLogged: UserInfo | undefined = await getUserLogged();

  const shoppingListResponse = await axios(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.

    headers: { Authorization: `Bearer ${userLogged?.tokenDto.token}` },
  });

  // const response = await fetch(url, {
  //   method: "GET", // *GET, POST, PUT, DELETE, etc.
  //   mode: "cors", // no-cors, *cors, same-origin
  //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //   credentials: "same-origin", // include, *same-origin, omit
  //   headers: { Authorization: `Bearer ${userLogged?.tokenDto.token}` },
  //   redirect: "follow", // manual, *follow, error
  //   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  // });
  // return response.json();
  return shoppingListResponse.data;
};
