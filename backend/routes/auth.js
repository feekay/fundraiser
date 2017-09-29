var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('passport');


var response = require('../helpers/response');
var validate = require('../helpers/validate');
var constants = require('../config/constants');
var jwt = require('jsonwebtoken');
var hasher = require('../helpers/hasher');
var uuid = require('uuid');
var literals = require('../helpers/literals');
var createUser = require('../helpers/create_user');
var respondWithToken = require('../helpers/auth_token');
//var mailer = require('');

var user_params = {
  'name': 'string',
  'email': 'string',
  'password': 'string',
  'username': 'string',
}


router.param('token', function (req, res, next, token) {
  //VERIFY THE TOKEN IS VALID AND THE PAYLOAD IS MATCHED AGAINST A MAIL ADDRESS
  secret = process.env.SECRET || secret.superSecret;
  try {
    payload = jwt.verify(token, secret);
    models.Reset.find({
      where: {
        key: payload,
        valid: true
      },
      include: [{
        model: models.User
      }]
    }).then(function (reset) {
      if (reset) {
        req.user = reset.User;
        //       req.user = reset.getUser()
        next();
      } else {
        res.sendStatus(constants.HTTP.CODES.UNAUTHORIZED);
      }
    });
  } catch (err) {
    //If the token failed and the payload is still active
    //Invalidate the payload too.
    payload = jwt.decode(token);
    models.Reset.find({
      where: {
        key: payload
      }
    }).then(function (reset) {
      if (reset) {
        reset.updateAttributes({
          valid: false
        });
      }
    });
    res.sendStatus(constants.HTTP.CODES.UNAUTHORIZED);
  }
});

router.post('/facebook/token',
  passport.authenticate('facebook-token', {
    session: false
  }),
  function (req, res, next) {
    if (req.user) {
      user = req.user;
      req.auth = user.id;
      next();
    } else {
      res.sendStatus(constants.HTTP.CODES.UNAUTHORIZED);
      //res.json();
    }
  }, respondWithToken);

router.post('/google/token',
  passport.authenticate('google-token', {
    session: false
  }),
  function (req, res, next) {
    if (req.user) {
      user = req.user;
      req.auth = user.id;
      next();
    } else {
      res.sendStatus(constants.HTTP.CODES.UNAUTHORIZED);
      //res.json();
    }
  }, respondWithToken);

router.post('/signup', function (req, res, next) {
  var post = req.body;
  if (validate(user_params, post)) {
    createUser(post).then(function (user) {
      if (user) {
        req.auth = user.id;
      }
    }).catch(next);
  } else {
    res.json(response.formatResponse(constants.MESSAGES.GENERAL.FIELDS_REQUIRED));
  }
}, respondWithToken);

router.post('/login', function (req, res, next) {
  var post = req.body;
  models.User.find({
    where: {
      /*$or: [{
        username: post.username
      }, {
        email: post.username
      }]*/
      email: post.email
    }
  }).then(function (user) {
    if (user) {
      if (hasher.compare(post.password, user.password)) {
        //sign_token(user.id);
        req.auth = user.id;
        res.status(constants.HTTP.CODES.SUCCESS);
        next();
      } else {
        res.status(constants.HTTP.CODES.UNAUTHORIZED);
        res.json(response.formatResponse(constants.MESSAGES.LOGIN.AUTH_FAILED));
      }
    } else {
      res.status(constants.HTTP.CODES.UNAUTHORIZED);
      res.json(response.formatResponse(constants.MESSAGES.LOGIN.AUTH_FAILED));
    }
  }).catch(next);
}, respondWithToken);

router.get('/reset/:token', function (req, res, next) {
  res.render('reset-password');
});

router.post('/reset/:token', function (req, res, next) {
  //RESET THE PASSPOST FOR THE USER IN REQUEST
  var user = req.user;
  var post = req.body;
  models.User.find({
    where: {
      id: user.id
    }
  }).then(function (user) {
    if (user) {
      user.updateAttributes({
        password: hasher.hash(post.password)
      });
    }
  }).catch(next);
});

router.get('/forget', function (req, res, next) {
  //SERVE THE FORGOT PASSWORD PAGE
  res.render('forgot-password');
});

router.post('/forget', function (req, res, next) {
  //SAVE A UUID AGAINST THE POSTED MAIL
  //GENERATE TOKEN OF THIS UUID4 PAYLOAD that expires in an hour
  //SEND MAIL TO THE POSTED EMAIL CONTAINING A LINK TO RESET/token
  var post = req.body;
  models.User.find({
    where: {
      email: post.email
    }
  }).then(function (user) {
    if (user) {
      payload = uuid.v4();
      models.Reset.create({
        key: payload,
        valid: true
      }).then(function (reset) {
        reset.setUser(user);
        link = constants.BASE_URL + '/reset/' + sign_token(payload, {
          expiresIn: '1h'
        });
        //mailer.send('success-link-template');
      }).catch(next);
    } else {
      //mailer.sendMail('malicious-template');      
    }
  }).catch(next);
});
module.exports = router;