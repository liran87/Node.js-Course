import { Request, Response } from 'express';
import { Product } from '../models';
import { store } from '../store';

const products = store.products;

export const getProducts = (req: Request, res: Response) => {
  res.send(products);
};

export const getProductById = (req: Request, res: Response) => {
  // TODO: finding existing project repeats in multiple routes, can reuse via multiple route handlers (using 'res.locals')
  const id = req.params.id;
  const existing = products.find(p => p.id === id);

  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }
  if (!existing) {
    // TODO: sending 404 if existing is not found repeats in other routes, can reuse via multiple route handlers
    res.sendStatus(404);
    return;
  }

  res.send(existing);
};

export const addProduct = (req: Request, res: Response) => {
  const product = req.body as Product;

  product.id = (products.length + 1).toString();
  products.push(product);

  res.status(201).send(product);
};
