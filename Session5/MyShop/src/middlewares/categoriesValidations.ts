import { NextFunction, Request, Response } from 'express-serve-static-core';
import { store } from '../store';
import { getOrThrow } from '../validations';
import { idSchema } from '../validations/common';

export const isCategoryIdNumber = (req: Request, res: Response, next: NextFunction) => {
  getOrThrow<string>(req.params.id, idSchema);

  next();
};

export const isCategoryExist = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const existing = store.categories.find(category => category.id === id);

  if (!existing) {
    res.sendStatus(404).end();
    return;
  }

  next();
};
