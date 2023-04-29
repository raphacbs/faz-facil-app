import { Product } from "./Product";
import { Supermarket } from "./Supermarket";

export interface PriceHistory {
  id: string;
  price: number;
  product: Product;
  supermarket: Supermarket;
  createdAt: string;
  updatedAt: string;
}

export type PriceHistoryPost = {
  price: number;
  product: {
    code: string;
  };
  supermarket: {
    id: string;
  };
};

export interface InitialState {
  priceHistoryToSave: PriceHistoryPost;
}
