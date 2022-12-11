const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../Model/user.js')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

    console.log(jwt_payload);

    User.findById(jwt_payload.value, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


module.exports = passport;