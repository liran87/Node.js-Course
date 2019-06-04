import express from 'express';
import { addCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '../controllers/categories/';

export const router = express.Router();

router.get('/', getCategories);

router.get('/:id', getCategoryById);

router.post('/', addCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);
