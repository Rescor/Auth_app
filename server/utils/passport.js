import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { jwtSecret } from './jwt_secret.js';
import connection from '../db.js';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  connection.query('SELECT id, email FROM accounts WHERE id = ?', [jwt_payload.id], (error, results) => {
    if (error) done(error, false);

    if (results.length > 0) {
      return done(null, results[0]);
    } else {
      return done(null, false);
    }
  });
}));

export default passport;
