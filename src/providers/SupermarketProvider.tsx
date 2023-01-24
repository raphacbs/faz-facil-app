import { PropsWithChildren } from "react";
import { IPageInfo, IParamsShoppingList } from "../@types/shoppingList";
import {
  IParamsSupermarket,
  ISupermarket,
  SupermarketContextType,
} from "../@types/supermarket";
import { SupermarketContextProvider } from "../context/SupermarketContext";
import { useState, useCallback, useMemo, useEffect } from "../hooks";
import api from "../services/api";

const initialParams: IParamsSupermarket = {
  pageNo: 1,
  pageSize: 10,
  sortBy: "name",
  sortDir: "asc",
  radiusM: "5000",
  longitude: 0,
  latitude: 0,
};

const initialPageInfo = {
  pageNo: 1,
  pageSize: 10,
  totalElements: 0,
  totalPages: 0,
  last: false,
};

const SupermarketProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [supermarket, setSupermarket] = useState<ISupermarket | null>(null);
  const [supermarkets, setSupermarkets] = useState<ISupermarket[]>([]);
  const [params, setParams] = useState<IParamsSupermarket>(initialParams);
  const [pageInfo, setPageInfo] = useState<IPageInfo>(initialPageInfo);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const endPoint = "/api/v1/supermarkets";

  function compare(a: any, b: any) {
    if (a.distance < b.distance) {
      return -1;
    }
    if (a.distance > b.distance) {
      return 1;
    }
    return 0;
  }

  const resetParams: SupermarketContextType["resetParams"] =
    useCallback(async () => {
      setParams({ ...params, name: undefined });
    }, []);

  const resetSupermarkets: SupermarketContextType["resetSupermarkets"] =
    useCallback(async () => {
      setSupermarkets([]);
    }, []);

  const get: SupermarketContextType["get"] = useCallback(
    async (
      _params: IParamsSupermarket,
      _supermarkets: ISupermarket[] | null = null
    ) => {
      setLoading(_supermarkets == null);
      setParams({ ..._params });
      const url = `${endPoint}?pageNo=${_params.pageNo}&pageSize=${
        _params.pageSize
      }&sortBy=${_params.sortBy}&sortDir=${_params.sortDir}&latitude=${
        _params.latitude
      }&longitude=${_params.longitude}&radiusM=${_params.radiusM}${
        _params.name ? "&name=" + _params.name : ""
      }`;

      try {
        const response = await api.get(url);
        const list = response.data.items.sort(compare);

        setPageInfo({
          pageNo: response.data.pageNo,
          pageSize: response.data.pageSize,
          last: response.data.last,
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages,
        });
        _supermarkets == null
          ? setSupermarkets(list)
          : setSupermarkets(_supermarkets.concat(list));
        setError(null);
      } catch (err: any) {
        setError(err);
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateSupermarket: SupermarketContextType["updateSupermarket"] =
    useCallback(async (_supermarket: ISupermarket | null) => {
      if (_supermarket != null) {
        setSupermarket({ ..._supermarket });
      } else {
        setSupermarket(null);
      }
    }, []);

  const getById: SupermarketContextType["getById"] = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const response = await api.get(`${endPoint}/${id}`);
        setSupermarket(response.data);
      } catch (err: any) {
        setError(err);
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const value = useMemo(() => {
    return {
      supermarkets,
      supermarket,
      params,
      loading,
      error,
      pageInfo,
      resetParams,
      get,
      getById,
      updateSupermarket,
      resetSupermarkets,
    };
  }, [
    supermarkets,
    supermarket,
    params,
    loading,
    error,
    pageInfo,
    get,
    getById,
    resetParams,
    updateSupermarket,
    resetSupermarkets,
  ]);

  return (
    <SupermarketContextProvider value={value}>
      {children}
    </SupermarketContextProvider>
  );
};

export default SupermarketProvider;
