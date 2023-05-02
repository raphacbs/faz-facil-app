import api from "../../services/api";
import { Supermarket } from "../../types/Supermarket";

export const setSupermarketSelected: any = (
  supermarketSelected: Supermarket
) => {
  return async (dispatch: any) => {
    try {
      await dispatch({
        type: "SET_SUPERMARKET_SELECTED",
        payload: supermarketSelected,
      });
    } catch (error) {
      // trate o erro aqui
      console.error(error);
    }
  };
};

export const searchSupermarket = async (
  pageParam: number,
  latitude?: number,
  longitude?: number,
  radius?: number,
  name?: string
) => {
  const params = {
    pageNo: pageParam,
    pageSize: 4,
    sortBy: "name",
    sortDir: "asc",
  };

  const url = `/api/v1/supermarkets?pageNo=${params.pageNo}&pageSize=${
    params.pageSize
  }&latitude=${latitude}&${
    name ? "name=" + name + "&" : ""
  }longitude=${longitude}&radiusM=${radius}&sortBy=${params.sortBy}&sortDir=${
    params.sortDir
  }`;
  console.log("url", url);
  const response = await api.get(url);
  return response.data;
};
