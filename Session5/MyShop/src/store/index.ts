import { Category, Product, UserCredential, UserRole } from '../models';

interface Store {
  products: Product[];
  categories: Category[];
  credentials: UserCredential[];
}

export const store: Store = {
  products: [],
  categories: [],
  credentials: [
    { email: 'a', password: 'a', userId: 1, roles: [UserRole.Admin] },
    { email: 'b', password: 'b', userId: 2, roles: [UserRole.Contributor] },
    { email: 'c', password: 'c', userId: 3, roles: [UserRole.Reader] },
  ],
};
