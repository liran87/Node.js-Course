import express from 'express';
import { addCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '../controllers/categories/';
import { getProductsByCategory } from '../controllers/products';
import { authenticate, authorize } from '../middlewares/auth';
import { isCategoryExist, isCategoryIdNumber } from '../middlewares/categoriesValidations';
import { UserRole } from '../models';

export const router = express.Router();

router.get('/', authenticate(), getCategories);

router.get('/:id/products', authenticate(), isCategoryIdNumber, isCategoryExist, getProductsByCategory);

router.get('/:id', authenticate(), isCategoryIdNumber, isCategoryExist, getCategoryById);

router.post('/', authenticate(), authorize(UserRole.Admin), addCategory);

router.put('/:id', authenticate(), authorize(UserRole.Admin), isCategoryIdNumber, isCategoryExist, updateCategory);

router.delete('/:id', authenticate(), authorize(UserRole.Admin), isCategoryIdNumber, isCategoryExist, deleteCategory);
