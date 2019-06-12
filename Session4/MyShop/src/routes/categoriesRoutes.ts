import express from 'express';
import { addCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '../controllers/categories/';
import { getProductsByCategory } from '../controllers/products';
import { isCategoryExist, isCategoryIdNumber } from '../middlewares/categoriesValidations';

export const router = express.Router();

router.get('/', getCategories);

router.get('/:id/products', [isCategoryIdNumber, isCategoryExist, getProductsByCategory]);

router.get('/:id', [isCategoryIdNumber, isCategoryExist, getCategoryById]);

router.post('/', addCategory);

router.put('/:id', [isCategoryIdNumber, isCategoryExist, updateCategory]);

router.delete('/:id', [isCategoryIdNumber, isCategoryExist, deleteCategory]);
