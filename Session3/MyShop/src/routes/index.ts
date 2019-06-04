import { Router } from 'express';
import { router as categoriesRoutes } from './categoriesRoutes';
import { router as productsRoutes } from './productsRoutes';

interface RouteConfig {
  prefix: string;
  router: Router;
}

export const config: { [k: string]: RouteConfig } = {
  products: {
    prefix: '/api/products',
    router: productsRoutes,
  },
  categories: {
    prefix: '/api/categories',
    router: categoriesRoutes,
  },
};
