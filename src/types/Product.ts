import { PriceHistory } from "./PriceHistories";

export interface Product {
  code: string;
  description: string;
  brand: string;
  thumbnail?: null | string;
  createdAt: string;
  updateAt: string;
  unit?: null | string;
  priceHistories?: PriceHistory[] | null;
}

export interface InitialState {
  searchTerm: string;
  searchResults: Array<Product>;
  productDetails: Product;
}
