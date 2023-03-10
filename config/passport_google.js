const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../Model/user.js')
const crypto = require('crypto')


passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIEN_ID,
    clientSecret: process.env.GOOGLE_SECRET_KEY,
    callbackURL: process.env.GOOGLE_CALLBACK_URI
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOne({email: profile.emails[0].value }, function (err, user) {
        if(err){console.log("Error in google strategy passport",err); return}
        if(user){
            return done(null,user);
        }else{
            // if user not in database just create
            User.create({
                username:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){console.log("Error in google strategy passport",err); return}
                
                return done(null,user);
            })
        }
    });
  }
));

module.exports = passport;