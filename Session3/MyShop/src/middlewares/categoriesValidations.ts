import { NextFunction, Request, Response } from 'express-serve-static-core';
import { store } from '../store';

const categories = store.categories;

export const isCategoryIdNumber = (req: Request, res: Response, next: NextFunction) => {
  if (isNaN(req.params.id)) {
    throw new Error('400');
  }

  next();
};

export const isCategoryExist = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const existing = categories.find(category => category.id === id);

  if (!existing) {
    res.sendStatus(404).end();
    return;
  }

  next();
};
