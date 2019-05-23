import { Request, Response } from 'express';
import { Product } from '../models';
import { store } from '../store';

const products = store.products;

export const getProducts = (req: Request, res: Response) => {
  res.send(products);
};

export const getProductById = (req: Request, res: Response) => {
  const id = req.params.id;
  const existing = products.find(p => p.id === id);

  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }

  if (!existing) {
    res.sendStatus(404);
    return;
  }

  res.send(existing);
};

export const addProduct = (req: Request, res: Response) => {
  const product = req.body as Product;

  if (product.name.length < 3) {
    res.sendStatus(409);
    return;
  }

  product.id = (products.length + 1).toString();
  products.push(product);

  res.status(201).send(product);
};

export const updateProduct = (req: Request, res: Response) => {
  const id = req.params.id;
  const existing = products.find(p => p.id === id);

  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }

  if (!existing) {
    res.sendStatus(404);
    return;
  }

  const product = req.body as Product;
  if (product.name.length < 3) {
    res.sendStatus(409);
    return;
  }

  product.id = id;
  Object.assign(existing, product);

  res.send(product);
};

export const deleteProduct = (req: Request, res: Response) => {
  const id = req.params.id;
  const existingIndex = products.findIndex(p => p.id === id);

  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }

  if (existingIndex === -1) {
    res.sendStatus(404);
    return;
  }

  products.splice(existingIndex, 1);
  res.sendStatus(204);
};
