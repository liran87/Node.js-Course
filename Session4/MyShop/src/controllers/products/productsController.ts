import { NextFunction, Request, Response } from 'express';
import { Product } from '../../models';
import { store } from '../../store';
import { wrapAsyncAndSend } from '../../utils/asyncRouteHandler';
import { createLogger } from '../../utils/logger';

const products = store.products;
const logger = createLogger('productsController');

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
  res.send(products);
};

export const getProductsByCategory = (req: Request, res: Response, next: NextFunction) => {
  const categoryId = req.params.id;
  const categoryProducts = products.filter(product => product.categoryId === categoryId);

  res.send(categoryProducts);
};

export const getProductById = wrapAsyncAndSend(
  (req: Request, res: Response, next?: NextFunction): Promise<any> => {
    const id = req.params.id;
    const existing = products.find(product => product.id === id);
    logger.info(`Requested product by id - ${id}`);

    return Promise.resolve(existing);
  },
);

export const addProduct = (req: Request, res: Response, next: NextFunction) => {
  const product = req.body as Product;

  product.id = (products.length + 1).toString();
  products.push(product);

  res.status(201).send(product);
};

export const updateProduct = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const existing = products.find(product => product.id === id);
  const product = req.body as Product;

  product.id = id;
  Object.assign(existing, product);

  res.send(product);
};

export const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const existingIndex = products.findIndex(product => product.id === id);

  products.splice(existingIndex, 1);
  res.sendStatus(204).end();
};
