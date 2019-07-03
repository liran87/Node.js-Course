import { NextFunction, Request, Response } from 'express';
import { Category } from '../../models';
import { store } from '../../store';
import { wrapAsyncAndSend } from '../../utils/asyncRouteHandler';
import { createLogger } from '../../utils/logger';

const logger = createLogger('categoriesController');

export const getCategories = (req: Request, res: Response, next: NextFunction) => {
  res.send(store.categories);
};

export const getCategoryById = wrapAsyncAndSend(
  (req: Request, res: Response, next?: NextFunction): Promise<any> => {
    const id = req.params.id;
    const existing = store.categories.find(category => category.id === id);
    logger.info(`Requested category by id - ${id}`);

    return Promise.resolve(existing);
  },
);

export const addCategory = (req: Request, res: Response, next: NextFunction) => {
  const Category = req.body as Category;

  Category.id = (store.categories.length + 1).toString();
  store.categories.push(Category);

  res.status(201).send(Category);
};

export const updateCategory = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const existing = store.categories.find(category => category.id === id);
  const Category = req.body as Category;

  Category.id = id;
  Object.assign(existing, Category);

  res.send(Category);
};

export const deleteCategory = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const existingIndex = store.categories.findIndex(category => category.id === id);

  store.categories.splice(existingIndex, 1);
  res.sendStatus(204).end();
};
