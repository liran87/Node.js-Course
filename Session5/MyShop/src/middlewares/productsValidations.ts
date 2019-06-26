import { NextFunction, Request, Response } from 'express-serve-static-core';
import { Product } from '../models';
import { store } from '../store';
import { getOrThrow } from '../validations';
import { idSchema, productNameSchema } from '../validations/common';

const products = store.products;

export const isProductIdNumber = (req: Request, res: Response, next: NextFunction) => {
  getOrThrow<string>(req.params.id, idSchema);

  next();
};

export const isProductNameCorrect = (req: Request, res: Response, next: NextFunction) => {
  const product = req.body as Product;

  getOrThrow<string>(product.name, productNameSchema);

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
