import express from 'express';
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/products/';
import { isProductExist, isProductIdNumber, isProductNameCorrect } from '../middlewares/productsMiddlewares';

export const router = express.Router();

router.get('/', getProducts);

router.get('/:id', [isProductIdNumber, isProductExist, getProductById]);

router.post('/', [isProductNameCorrect, addProduct]);

router.put('/:id', [isProductIdNumber, isProductExist, isProductNameCorrect, updateProduct]);

router.delete('/:id', [isProductIdNumber, isProductExist, deleteProduct]);
