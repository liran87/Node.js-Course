import { NextFunction, Request, Response } from 'express';

export const clientErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.message === '400') {
    res.sendStatus(400).end();
  }
  if (err.message === '409') {
    res.sendStatus(409).end();
  }
  next(err);
};
