import express from 'express';
import { login } from '../controllers/loginController';

export const router = express.Router();

router.post('/', login);
