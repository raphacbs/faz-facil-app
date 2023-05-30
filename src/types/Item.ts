import { Product } from "./Product";
import { ShoppingList } from "./ShoppingList";

export interface Item {
  id: string;
  note: string;
  quantity: number;
  price: number;
  perUnit: number;
  product: Product;
  shoppingList: ShoppingList;
  createdAt: string;
  updatedAt: string;
  added: boolean;
}

export type ItemPost = {
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
};

export interface InitialState {
  itemToSave: ItemPost;
  selectedItem: Item;
  items: Array<Item>;
}
