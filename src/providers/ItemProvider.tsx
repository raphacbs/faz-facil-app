import { PropsWithChildren } from "react";
import {
  IItem,
  IItemPost,
  IItemPut,
  IParamsItem,
  ItemContextType,
} from "../@types/item";
import { IPageInfo, ShoppingListContextType } from "../@types/shoppingList";
import { ItemContextProvider } from "../context";
import { useState, useCallback, useMemo } from "../hooks";
import api, { config } from "../services/api";

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
const ItemProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [item, setItem] = useState<IItem | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingItem, setLoadingItem] = useState<boolean>(false);
  const [error, setError] = useState<any>("");
  const [params, setParams] = useState<IParamsItem>(initialParams);
  const [pageInfo, setPageInfo] = useState<IPageInfo>(initialPageInfo);
  const endPoint = "/api/v1/items";

  const resetParams: ItemContextType["resetParams"] = useCallback(async () => {
    setParams({ ...params, isAdded: undefined, productDesc: undefined });
  }, []);

  const get: ItemContextType["get"] = useCallback(
    async (
      _params: IParamsItem,
      shoppingListId: string,
      _items: IItem[] | null = null
    ) => {
      setLoading(_items == null);
      setParams({ ..._params });
      const url = `${endPoint}?pageNo=${_params.pageNo}&pageSize=${
        _params.pageSize
      }&sortBy=${_params.sortBy}&sortDir=${_params.sortDir}${
        _params.isAdded != undefined ? "&isAdded=" + _params.isAdded : ""
      }${_params.productDesc ? "&productDesc=" + _params.productDesc : ""}`;

      try {
        config.headers["shoppingListId"] = shoppingListId;

        const response = await api.get(url, config);
        const list = response.data.items;
        setPageInfo({
          pageNo: response.data.pageNo,
          pageSize: response.data.pageSize,
          last: response.data.last,
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages,
        });
        _items == null ? setItems(list) : setItems(_items.concat(list));
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
        setItem(response.data);
      } catch (err: any) {
        setError(err);
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const update: ItemContextType["update"] = useCallback(
    async (_item: IItemPut) => {
      try {
        setLoading(true);
        await api.put(endPoint, _item);

        setItem(null);
      } catch (err: any) {
        setError(err);
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateBackground: ItemContextType["updateBackground"] = useCallback(
    async (_item: IItemPut) => {
      try {
        setLoadingItem(true);
        const response = await api.put(endPoint, _item);
        // get({ ...params }, _item.shoppingList.id);
        setItem(response.data);
      } catch (err: any) {
        setError(err);
        console.log(error);
      } finally {
        setLoadingItem(false);
      }
    },
    []
  );

  const add: ItemContextType["add"] = useCallback(async (_item: IItemPost) => {
    try {
      setLoading(true);
      await api.post(endPoint, _item);
      setItem(null);
    } catch (err: any) {
      setError(err);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const _setItem: ItemContextType["_setItem"] = useCallback(
    async (_item: IItem | null) => {
      setItem(_item);
    },
    []
  );

  const resetItems: ItemContextType["resetItems"] = useCallback(async () => {
    setItems([]);
  }, []);

  const value = useMemo(() => {
    return {
      items,
      params,
      loading,
      error,
      pageInfo,
      item,
      loadingItem,
      _setItem,
      resetParams,
      get,
      getById,
      update,
      add,
      resetItems,
      updateBackground,
    };
  }, [
    items,
    params,
    loading,
    error,
    pageInfo,
    item,
    loadingItem,
    _setItem,
    get,
    getById,
    update,
    resetParams,
    add,
    resetItems,
    updateBackground,
  ]);

  return <ItemContextProvider value={value}>{children}</ItemContextProvider>;
};

export default ItemProvider;
