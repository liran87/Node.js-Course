import { NextFunction, Request, Response } from 'express';
import { Product } from '../../../models';
import { store } from '../../../store';

const products = store.products;

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
  res.send(products);
};

export const getProductById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const existing = products.find(p => p.id === id);

  res.send(existing);
};

export const addProduct = (req: Request, res: Response, next: NextFunction) => {
  const product = req.body as Product;

  product.id = (products.length + 1).toString();
  products.push(product);

  res.status(201).send(product);
};

export const updateProduct = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const existing = products.find(p => p.id === id);
  const product = req.body as Product;

  product.id = id;
  Object.assign(existing, product);

  res.send(product);
};

export const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const existingIndex = products.findIndex(p => p.id === id);

  products.splice(existingIndex, 1);
  res.sendStatus(204);
};
