import request from 'request-promise';
import { store } from '../store';

export async function makeCalls(baseUrl: string) {
  const dataClient = request.defaults({
    baseUrl: `${baseUrl}/data`,
    json: true,
  });

  store.products = await dataClient.get('/products.json');
  store.categories = await dataClient.get('/categories.json');
}
