import { Application } from 'express';
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../routes/productsHandlers';

export function productsController(app: Application) {
  app.get('/api/products', getProducts);

  app.get('/api/products/:id', getProductById);

  app.post('/api/products', addProduct);

  app.put('/api/products/:id', updateProduct);

  app.delete('/api/products/:id', deleteProduct);
}
