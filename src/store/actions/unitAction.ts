import { ShoppingList, ShoppingListPost } from "../../types/ShoppingList";
import useConstants from "../../hooks/useConstants";

import api from "../../services/api";
import { Env } from "../../Env";
import { getUserLogged } from "./userAction";
import { UserInfo } from "../../types/UserInfo";
import axios from "axios";
import { Item, ItemPost } from "../../types/Item";
import { Unit } from "../../types/Unit";

const endPoint = "/api/v1/shopping-lists";

const { SET_UNITS } = useConstants();

export const setUnits: any = (units: Array<Unit>) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_UNITS,
      payload: units,
    });
  };
};

export const getUnits = async (pageParam: number = 1) => {
  const params = {
    pageNo: pageParam,
    pageSize: 10,
    sortBy: "description",
    sortDir: "asc",
  };

  const url = `${Env.API_BASE_URL}api/v1/units?pageNo=${params.pageNo}&pageSize=${params.pageSize}&sortBy=${params.sortBy}&sortDir=${params.sortDir}`;
  const userLogged: UserInfo | undefined = await getUserLogged();

  const itemResponse = await axios(url, {
    headers: {
      Authorization: `Bearer ${userLogged?.tokenDto.token}`,
    },
    method: "GET",
  });
  return itemResponse.data;
};
