import { NextFunction, Request, Response } from 'express';
import { Category } from '../../models';
import { store } from '../../store';
import { wrapAsyncAndSend } from '../../utils/asyncRouteHandler';
import { createLogger } from '../../utils/logger';

const categories = store.categories;
const logger = createLogger('categoriesController');

export const getCategories = (req: Request, res: Response, next: NextFunction) => {
  res.send(categories);
};

export const getCategoryById = wrapAsyncAndSend(
  (req: Request, res: Response, next?: NextFunction): Promise<any> => {
    const id = req.params.id;
    const existing = categories.find(category => category.id === id);
    logger.info(`Requested category by id - ${id}`);

    return Promise.resolve(existing);
  },
);

export const addCategory = (req: Request, res: Response, next: NextFunction) => {
  const Category = req.body as Category;

  Category.id = (categories.length + 1).toString();
  categories.push(Category);

  res.status(201).send(Category);
};

export const updateCategory = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const existing = categories.find(category => category.id === id);
  const Category = req.body as Category;

  Category.id = id;
  Object.assign(existing, Category);

  res.send(Category);
};

export const deleteCategory = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const existingIndex = categories.findIndex(category => category.id === id);

  categories.splice(existingIndex, 1);
  res.sendStatus(204).end();
};
