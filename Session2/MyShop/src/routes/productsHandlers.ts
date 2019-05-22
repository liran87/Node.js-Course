import { NextFunction, Request, Response } from 'express';
import { store } from '../store';

const products = store.products;

interface IRequestHandlerProps {
  req: Request;
  res: Response;
  next: NextFunction;
}

export const getProducts = (props: IRequestHandlerProps) => {
  props.res.send(products);
};
