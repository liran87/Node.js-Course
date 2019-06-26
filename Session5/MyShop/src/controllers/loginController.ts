import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import config, { KnownConfigKey } from '../utils/config';

const jwtSecret = config.get(KnownConfigKey.jwtSecret);

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', { session: false }, (err: Error, user: any, info: IVerifyOptions) => {
    if (err || !user) {
      return res.status(400).send({
        message: 'Failed',
        user,
      });
    }

    req.login(user, { session: false }, error => {
      if (error) {
        res.send(error);
      }

      const token = jwt.sign(user, jwtSecret);
      return res.send({ user, token });
    });
  })(req, res);
};
