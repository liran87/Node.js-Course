import joi from 'joi';

export const idSchema = joi.number().min(0);
export const productNameSchema = joi.string().min(3);
