import categories from '../mock/categories.json';
import products from '../mock/products.json';
import { Category, Product } from '../models';

interface Store {
  products: Product[];
  categories: Category[];
}

export const store: Store = {
  products,
  categories,
};
