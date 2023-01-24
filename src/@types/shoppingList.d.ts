export interface IShoppingList {
  id: string;
  description: string;
  supermarketId: string;
  supermarketName: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  itemsInfo: {
    quantityPlannedProduct: number;
    quantityAddedProduct: number;
    plannedTotalValue: number;
    totalValueAdded: number;
  };
}

export interface IShoppingListPut {
  id: string;
  description: string;
  supermarketId: string;
  status: string;
}

export interface IShoppingListPost {
  description: string;
  supermarketId: string;
  status: string;
}

export interface IParamsShoppingList {
  pageNo: number;
  pageSize: number;
  sortBy: string;
  sortDir: string;
  status?: string;
  supermarketId?: string;
  description?: string;
}

export interface IPageInfo {
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export type ShoppingListContextType = {
  shoppingLists: IShoppingList[];
  shoppingList: IShoppingList | null;
  params: IParamsShoppingList;
  pageInfo: IPageInfo;
  loading: boolean;
  error: any | null;
  resetParams: () => void;
  get: (
    _params: IParamsShoppingList,
    _shoppingList: IShoppingList[] | null = null
  ) => void;
  getById: (id: string) => void;
  update: (shoppingList: IShoppingListPut) => void;
  _setShoppingList: (_shoppingList: IShoppingList | null) => void;
  add: (shoppingList: IShoppingListPost) => void;
};
