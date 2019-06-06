import cors from 'cors';
import express from 'express';
import { clientErrorHandler } from './middlewares/errorHandlers';
import { config } from './routes';

export const app = express();

// Init Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('MyShop API Running'));

Object.keys(config).forEach(k => {
  const routeConfig = config[k];
  app.use(routeConfig.prefix, routeConfig.router);
});

app.use(clientErrorHandler);
