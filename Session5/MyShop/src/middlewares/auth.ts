import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { UserCredential, UserRole } from '../models';
import config, { KnownConfigKey } from '../utils/config';

export const authenticate = () => {
  if (config.get(KnownConfigKey.Auth) === 'true') {
    return passport.authenticate('jwt', { session: false });
  }
  return (req: Request, res: Response, next: NextFunction) => {
    next();
  };
};

export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserCredential;
    if (!req.isAuthenticated()) {
      res.sendStatus(401);
      return;
    }

    if (!roles.find(r => user.roles.indexOf(r) >= 0)) {
      res.sendStatus(403);
      return;
    }

    next();
  };
};
