import {Product} from './Product';
import {Supermarket} from './Supermarket';

export interface PriceHistories {
  id: string;
  price: number;
  product: Product;
  supermarket: Supermarket;
  createdAt: string;
  updatedAt: string;
}
