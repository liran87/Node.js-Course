import { Application } from 'express';
import { isProductExist, isProductIdNumber, isProductNameCorrect } from '../middlewares/productsMiddlewares';
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../routes/api/products/productsRequestHandlers';

export function productsController(app: Application) {
  app.get('/api/products', getProducts);

  app.get('/api/products/:id', [isProductIdNumber, isProductExist, getProductById]);

  app.post('/api/products', [isProductNameCorrect, addProduct]);

  app.put('/api/products/:id', [isProductIdNumber, isProductExist, isProductNameCorrect, updateProduct]);

  app.delete('/api/products/:id', [isProductIdNumber, isProductExist, deleteProduct]);
}
