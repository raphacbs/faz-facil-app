import { IShoppingList } from "./shoppingList";

export interface IItem {
  id: string;
  note: string;
  quantity: number;
  price: number;
  perUnit: number;
  product: {
    code: string;
    description: string;
    brand: string;
    thumbnail: string | null;
    createdAt: string;
    updateAt: string;
    unit: string | null;
    priceHistories: array;
  };
  shoppingList: IShoppingList;
  createdAt: string;
  updatedAt: string;
  added: boolean;
}

export interface IItemPost {
  note: string;
  quantity: number;
  price: number;
  perUnit: number;
  added: boolean;
  product: {
    code: string;
  };
  shoppingList: {
    id: string;
  };
}
export interface IItemPut {
  id: string;
  note: string;
  quantity: number;
  price: number;
  perUnit: number;
  product: {
    code: string;
  };
  shoppingList: {
    id: string;
  };
  createdAt: string;
  updateAt: string;
  added: boolean;
}

export type ItemContextType = {
  items: IItem[];
  item: IItem | null;
  params: IParamsItem;
  pageInfo: IPageInfo;
  loading: boolean;
  loadingItem: boolean;
  error: any | null;
  _setItem: (_item: IItem | null) => void;
  resetItems: () => void;
  resetParams: () => void;
  get: (
    _params: IParamsItem,
    shoppingListId: string,
    _items: IItem[] | null = null
  ) => void;
  getById: (id: string) => void;
  update: (_item: IItemPut) => void;
  updateBackground: (_item: IItemPut) => void;
  add: (_item: IItemPost) => void;
};

export interface IParamsItem {
  pageNo: number;
  pageSize: number;
  sortBy: string;
  sortDir: string;
  isAdded?: boolean;
  productDesc?: string;
}
