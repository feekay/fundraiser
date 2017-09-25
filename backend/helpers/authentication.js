var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var jwtStrategy = require('passport-jwt').Strategy;
var authConfig = require('./helpers/auth_config');
var jwt= require('jsonwebtoken');

function generateToken(user){
    secret = process.env.SECRET || 'mysupersecretkey';
    return jwt.sign(user.id,secret);
}
passport.use(new FacebookStrategy({
    clientID:authConfig.facebook.clientID,
    clientSecret:authConfig.facebook.clientSecret,
    callbackURL:authConfig.facebook.callbackURL
  },{
    function (accessToken, refreshToken,profile,done) {
      process.nextTick(function(){

        //MAKE TOKEN AND CREATE USER STUFF
    
        //user.token =generateToken(user);
        return done(null,profile);
      });
    }
  }
));

passport.use(new GoogleStrategy({
    clientID:authConfig.google.clientID,
    clientSecret:authConfig.google.clientSecret,
    callbackURL:authConfig.google.callbackURL
  },{
    function (accessToken, refreshToken,profile,done) {
      process.nextTick(function(){

        //MAKE TOKEN AND CREATE USER STUFF
        //user.token =generateToken(user);
        
        return done(null,profile);
      });
    }
  }
));