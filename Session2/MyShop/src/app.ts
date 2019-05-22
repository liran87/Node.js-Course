import * as cors from 'cors';
import * as express from 'express';
import { productsController } from './controllers';

export const app = express();

// Init Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('MyShop API'));

productsController(app);
