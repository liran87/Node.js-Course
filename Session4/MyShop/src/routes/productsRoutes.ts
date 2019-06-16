import express from 'express';
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/products/';
import { authenticate, authorize } from '../middlewares/auth';
import { isProductExist, isProductIdNumber, isProductNameCorrect } from '../middlewares/productsValidations';
import { UserRole } from '../models';

export const router = express.Router();

router.get('/', authenticate(), getProducts);

router.get('/:id', authenticate(), isProductIdNumber, isProductExist, getProductById);

router.post('/', authenticate(), authorize(UserRole.Admin), isProductNameCorrect, addProduct);

router.put(
  '/:id',
  authenticate(),
  authorize(UserRole.Admin),
  isProductIdNumber,
  isProductExist,
  isProductNameCorrect,
  updateProduct,
);

router.delete('/:id', authenticate(), authorize(UserRole.Admin), isProductIdNumber, isProductExist, deleteProduct);
