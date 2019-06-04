import products from '../mock/products.json';
import { Product } from '../models';

interface Store {
  products: Product[];
}

export const store: Store = {
  products,
};
