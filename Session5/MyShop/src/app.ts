import cors from 'cors';
import express from 'express';
import exphbs from 'express-handlebars';
import expressWinston from 'express-winston';
import path from 'path';
import winston from 'winston';
import { clientErrorHandler } from './middlewares/errorHandlers';
import { configRoutes } from './routes';
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

app.use('/public', express.static(path.join(__dirname, 'public')));
app.get('/api', (req, res) => res.send('MyShop API Running'));

app.set('views', path.join(__dirname, 'views'));
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    helpers: {
      increment: (v: number) => v + 1,
    },
  }),
);
app.set('view engine', 'handlebars');

Object.keys(configRoutes).forEach(k => {
  const routeConfig = configRoutes[k];
  app.use(routeConfig.prefix, routeConfig.router);
});

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: alignedWithColorsAndTime,
  }),
);

app.use(clientErrorHandler);
