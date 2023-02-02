import { ISupermarket } from "./supermarket";

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

export interface IShoppingListPutAndPost {
  id: string | undefined;
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
  pageParam: number;
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

export type AppContextType = {
  currentShoppingList: IShoppingList | null;
  setShoppingList: (_shoppingList: IShoppingList | null) => void;
  currentSupermarket: ISupermarket | null;
  setSupermarket: (supermarket: ISupermarket | null) => void;
};
