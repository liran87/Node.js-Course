import { Request, Response } from 'express';
import { store } from '../store';

export const getClientCategories = (req: Request, res: Response) => {
  const categories = store.categories;
  res.render('categories', {
    pageTitle: 'Categories List',
    categories,
  });
};
