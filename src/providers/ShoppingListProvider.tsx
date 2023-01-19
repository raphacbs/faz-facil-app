import { PropsWithChildren } from "react";
import {
  IPageInfo,
  IParams,
  IShoppingList,
  ShoppingListContextType,
} from "../@types/shoppingList";
import { ShoppingListContextProvider } from "../context";
import { useState, useCallback, useMemo, useEffect } from "../hooks";
import api from "../services/api";

const initialParams = {
  pageNo: 1,
  pageSize: 10,
  sortBy: "createdAt",
  sortDir: "asc",
};

const initialPageInfo = {
  pageNo: 1,
  pageSize: 10,
  totalElements: 0,
  totalPages: 0,
  last: false,
};
const ShoppingListProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [shoppingLists, setShoppingLists] = useState<IShoppingList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");
  const [params, setParams] = useState<IParams>(initialParams);
  const [pageInfo, setPageInfo] = useState<IPageInfo>(initialPageInfo);
  const endPoint = "/api/v1/shopping-lists";

  const resetParams: ShoppingListContextType["resetParams"] =
    useCallback(async () => {
      setParams({ ...params, description: undefined });
    }, []);

  useEffect(() => {
    console.log(shoppingLists);
  }, [shoppingLists]);

  const get: ShoppingListContextType["get"] = useCallback(
    async (_params: IParams, _shoppingLists: IShoppingList[] | null = null) => {
      setLoading(_shoppingLists == null);
      setParams({ ..._params });
      const url = `${endPoint}?pageNo=${_params.pageNo}&pageSize=${
        _params.pageSize
      }&sortBy=${_params.sortBy}&sortDir=${_params.sortDir}${
        _params.status ? "&status=" + _params.status : ""
      }${_params.description ? "&description=" + _params.description : ""}${
        _params.supermarketId ? "&supermarketId=" + _params.supermarketId : ""
      }`;

      console.log(shoppingLists);

      try {
        const response = await api.get(url);
        const list = response.data.items;
        setPageInfo({
          pageNo: response.data.pageNo,
          pageSize: response.data.pageSize,
          last: response.data.last,
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages,
        });
        _shoppingLists == null
          ? setShoppingLists(list)
          : setShoppingLists(_shoppingLists.concat(list));
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
  const getById: ShoppingListContextType["getById"] = useCallback(
    async (id: string) => {},
    []
  );
  const update: ShoppingListContextType["update"] = useCallback(
    async (shoppingList: IShoppingList) => {},
    []
  );

  const value = useMemo(() => {
    return {
      shoppingLists,
      params,
      loading,
      error,
      pageInfo,
      resetParams,
      get,
      getById,
      update,
    };
  }, [
    shoppingLists,
    params,
    loading,
    error,
    pageInfo,
    get,
    getById,
    update,
    resetParams,
  ]);

  return (
    <ShoppingListContextProvider value={value}>
      {children}
    </ShoppingListContextProvider>
  );
};

export default ShoppingListProvider;
