import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserCredential } from '../models';
import { store } from '../store';
import config, { KnownConfigKey } from '../utils/config';

export function initPassport() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      (email, password, callback) => {
        const user = store.credentials.find(u => u.email === email && u.password === password);

        if (user) callback(null, user, { message: 'succeeded' });
        else callback(null, false, { message: 'failed' });
      },
    ),
  );

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.get(KnownConfigKey.jwtSecret),
      },

      (jwtPayload: UserCredential, callback) => callback(null, jwtPayload),
    ),
  );
}
