import { Router } from 'express';
import { router as categoriesRoutes } from './categoriesRoutes';
import { router as clientAppRoute } from './clientAppRoutes';
import { router as loginRoute } from './loginRoute';
import { router as productsRoutes } from './productsRoutes';

interface RouteConfig {
  prefix: string;
  router: Router;
}

export const configRoutes: { [k: string]: RouteConfig } = {
  products: {
    prefix: '/api/products',
    router: productsRoutes,
  },
  categories: {
    prefix: '/api/categories',
    router: categoriesRoutes,
  },
  login: {
    prefix: '/api/login',
    router: loginRoute,
  },
  clients: {
    prefix: '/app',
    router: clientAppRoute,
  },
};
