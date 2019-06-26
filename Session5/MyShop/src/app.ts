import cors from 'cors';
import express from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';
import { clientErrorHandler } from './middlewares/errorHandlers';
import { config } from './routes';
import { alignedWithColorsAndTime } from './utils/logger';
import { initPassport } from './utils/passport';

initPassport();

export const app = express();

// Init Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: alignedWithColorsAndTime,
  }),
);

app.get('/api', (req, res) => res.send('MyShop API Running'));

Object.keys(config).forEach(k => {
  const routeConfig = config[k];
  app.use(routeConfig.prefix, routeConfig.router);
});

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: alignedWithColorsAndTime,
  }),
);

app.use(clientErrorHandler);
