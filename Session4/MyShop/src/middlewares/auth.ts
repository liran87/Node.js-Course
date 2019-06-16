import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { UserCredential, UserRole } from '../models';

export const authenticate = () => {
  return passport.authenticate('jwt', { session: false });
};

export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserCredential;
    if (!req.isAuthenticated()) {
      res.sendStatus(401)
      return;
    };
  
    if (!roles.find(r => user.roles.indexOf(r) >= 0)) {
      res.sendStatus(403)
      return;
    };

    next();
  };
};
