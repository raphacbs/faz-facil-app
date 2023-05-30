export interface ShoppingList {
  id: string;
  description: string;
  supermarketId: string;
  supermarketName: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  itemsInfo: ItemsInfo;
}

export interface ItemsInfo {
  quantityPlannedProduct: number;
  quantityAddedProduct: number;
  plannedTotalValue: number;
  totalValueAdded: number;
}

export interface ShoppingListPost {
  description: string;
  supermarketId: string;
  status: string;
}

export interface InitialState {
  shoppingListToSave: ShoppingListPost;
  selectedShoppingList: ShoppingList;
  shoppingLists: Array<ShoppingList>;
}
