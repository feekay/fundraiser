var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');
var GoogleTokenStrategy = require('passport-google-token');
var jwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt
var authConfig = require('./auth_config');
var jwt = require('jsonwebtoken');
var secret = require('../config/constants').SECRET;
var sign_token = require('./token');
var createUser = require('./create_user');
var models = require('../models');
/*
passport.use(new FacebookTokenStrategy({
  clientID: authConfig.facebook.clientID,
  clientSecret: authConfig.facebook.clientSecret,
}, {
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      //MAKE TOKEN AND CREATE USER STUFF
      var u = profile;
      models.User.find({
        where: {
          email: u.email,
          type: literals.ACCOUNTS.FB
        }
      }).then(function (user) {
        if (user) {
          return done(null, user);
        } else {
          u.username = u.name + uuid.v4().slice(0, 4);
          createUser(u, {
            type: literals.ACCOUNTS.FB,
          }).then(function (usr) {
            return done(null, usr);
          }).catch(function (err) {
            done(err);
          });
        }
      }).catch(function (err) {
        done(err);
      });

    });
  }
}));

passport.use(new GoogleTokenStrategy({
  clientID: authConfig.google.clientID,
  clientSecret: authConfig.google.clientSecret,
}, {
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {

      //MAKE TOKEN AND CREATE USER STUFF
      var u = profile;
      models.User.find({
        where: {
          email: u.email,
          type: literals.ACCOUNTS.FB
        }
      }).then(function (user) {
        if (user) {
          return done(null, user);
        } else {
          u.username = u.name + uuid.v4().slice(0, 4);
          createUser(u, {
            type: literals.ACCOUNTS.FB,
          }).then(function (usr) {
            return done(null, usr);
          }).catch(function (err) {
            done(err);
          });

        }

      }).catch(function (err) {
        done(err);
      });

    });
  }
}));
*/
var sec = process.env.SECRET || secret.superSecret;
passport.use(new jwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), ExtractJwt.fromBodyField('user.token'), ExtractJwt.fromBodyField('token')]),
  secretOrKey: sec
}, function (payload, done) { 
  models.User.find({
    where: {
      id: payload.user_id,
      reset_time: {
        $or:{
          $lt: new Date(payload.iat*1000),
          $eq:null
        }
      }
    }
  }).then(function (user) {
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })

}));