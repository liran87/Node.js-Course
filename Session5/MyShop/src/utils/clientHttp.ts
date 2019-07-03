import request from 'request-promise';
import { store } from '../store';

export async function makeCalls(baseUrl: string) {
  const dataClient = request.defaults({
    baseUrl: `${baseUrl}/public`,
    json: true,
  });

  store.products = await dataClient.get('/data/products.json');
  store.categories = await dataClient.get('/data/categories.json');
}
