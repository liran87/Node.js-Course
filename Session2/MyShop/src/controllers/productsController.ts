import { Application } from 'express';
import { addProduct, getProductById, getProducts } from '../routes/productsHandlers';

export function productsController(app: Application) {
  app.get('/api/products', getProducts);

  app.get('/api/products/:id', getProductById);

  app.post('/api/products', addProduct);
}
