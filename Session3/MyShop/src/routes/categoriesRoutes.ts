import express from 'express';
import { addCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '../controllers/categories/';
import { getProductsByCategory } from '../controllers/products';

export const router = express.Router();

router.get('/', getCategories);

router.get('/:id/products', getProductsByCategory);

router.get('/:id', getCategoryById);

router.post('/', addCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);
