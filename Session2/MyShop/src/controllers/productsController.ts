import { Application } from 'express';
import { getProducts } from '../routes/productsHandlers';

export function productsController(app: Application) {
  app.get('/api/products', getProducts);
}
