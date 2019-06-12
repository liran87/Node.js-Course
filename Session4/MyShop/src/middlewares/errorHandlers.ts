import { NextFunction, Request, Response } from 'express';

export const clientErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.isJoi) {
    res.status(400).send(err.details);
  } else {
    res.sendStatus(500);
  }
};
