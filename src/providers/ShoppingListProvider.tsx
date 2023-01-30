import { PropsWithChildren } from "react";
import {
  IPageInfo,
  IParamsShoppingList,
  IShoppingList,
  IShoppingListPost,
  IShoppingListPut,
  ShoppingListContextType,
} from "../@types/shoppingList";
import { ShoppingListContextProvider } from "../context";
import { useState, useCallback, useMemo, useEffect } from "../hooks";
import api from "../services/api";

const initialParams = {
  pageNo: 1,
  pageSize: 10,
  sortBy: "updatedAt",
  sortDir: "desc",
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
  const [shoppingList, setShoppingList] = useState<
    IShoppingListPost | IShoppingListPut | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");
  const [params, setParams] = useState<IParamsShoppingList>(initialParams);
  const [pageInfo, setPageInfo] = useState<IPageInfo>(initialPageInfo);
  const endPoint = "/api/v1/shopping-lists";

  const resetParams: ShoppingListContextType["resetParams"] =
    useCallback(async () => {
      setParams({ ...params, description: undefined });
    }, []);

  const get: ShoppingListContextType["get"] = useCallback(
    async (
      _params: IParamsShoppingList,
      _shoppingLists: IShoppingList[] | null = null
    ) => {
      setLoading(_shoppingLists == null);
      setParams({ ..._params });
      const url = `${endPoint}?pageNo=${_params.pageParam}&pageSize=${
        _params.pageSize
      }&sortBy=${_params.sortBy}&sortDir=${_params.sortDir}${
        _params.status ? "&status=" + _params.status : ""
      }${_params.description ? "&description=" + _params.description : ""}${
        _params.supermarketId ? "&supermarketId=" + _params.supermarketId : ""
      }`;

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
    async (id: string) => {
      try {
        setLoading(true);
        const response = await api.get(`${endPoint}/${id}`);
        setShoppingList(response.data);
      } catch (err: any) {
        setError(err);
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const update: ShoppingListContextType["update"] = useCallback(
    async (shoppingList: IShoppingListPut) => {
      try {
        setLoading(true);
        await api.put(endPoint, shoppingList);
        setShoppingList(null);
      } catch (err: any) {
        setError(err);
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const add: ShoppingListContextType["add"] = useCallback(
    async (shoppingList: IShoppingListPost) => {
      try {
        setLoading(true);
        await api.post(endPoint, shoppingList);
        setShoppingList(null);
      } catch (err: any) {
        setError(err);
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const _setShoppingList: ShoppingListContextType["_setShoppingList"] =
    useCallback(async (_shoppingList: IShoppingList | null) => {
      setShoppingList(_shoppingList);
    }, []);

  const value = useMemo(() => {
    return {
      shoppingLists,
      params,
      loading,
      error,
      pageInfo,
      shoppingList,
      _setShoppingList,
      resetParams,
      get,
      getById,
      update,
      add,
    };
  }, [
    shoppingLists,
    params,
    loading,
    error,
    pageInfo,
    shoppingList,
    _setShoppingList,
    get,
    getById,
    update,
    resetParams,
    add,
  ]);

  return (
    <ShoppingListContextProvider value={value}>
      {children}
    </ShoppingListContextProvider>
  );
};

export default ShoppingListProvider;
