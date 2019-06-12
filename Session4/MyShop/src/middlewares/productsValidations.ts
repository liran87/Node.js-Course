import { NextFunction, Request, Response } from 'express-serve-static-core';
import { Product } from '../models';
import { store } from '../store';

const products = store.products;

export const isProductIdNumber = (req: Request, res: Response, next: NextFunction) => {
  if (isNaN(req.params.id)) {
    throw new Error('400');
  }

  next();
};

export const isProductNameCorrect = (req: Request, res: Response, next: NextFunction) => {
  const product = req.body as Product;

  if (product.name.length < 3) {
    throw new Error('409');
  }

  next();
};

export const isProductExist = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const existing = products.find(product => product.id === id);

  if (!existing) {
    res.sendStatus(404).end();
    return;
  }

  next();
};
