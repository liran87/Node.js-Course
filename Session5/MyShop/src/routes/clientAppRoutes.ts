import express from 'express';
import { getClientCategories } from '../controllers/clientAppController';

export const router = express.Router();

router.get('/categories', getClientCategories);
