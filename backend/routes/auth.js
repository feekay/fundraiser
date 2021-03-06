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
var sign_token = require('../helpers/token');
var secretConfig = require('../config/constants').SECRET;
var user_params = require('../helpers/parameters').USER;
//var mailer = require('');

var Sequelize = require('sequelize');

const Op = Sequelize.Op;

//PASSWORD RESET TOKEN PARAMETER
router.param('token', function (req, res, next, token) {
  //VERIFY THE TOKEN IS VALID AND THE PAYLOAD IS MATCHED AGAINST A MAIL ADDRESS
  secret = process.env.SECRET || secretConfig.superSecret;
  try {
    payload = jwt.verify(token, secret);
    models.Reset.find({
      where: {
        key: payload.key,
        valid: true
      },
      include: [{
        model: models.User
      }]
    }).then(function (reset) {
      if (reset) {
        req.user = reset.User;
        req.key = reset.key;
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
        key: payload.key
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

//SERVE RESET PAGE
router.get('/reset/:token', function (req, res, next) {
  res.render('reset-password');
});

//HANDLE RESET REQUEST
router.post('/reset/:token', function (req, res, next) {
  //RESET THE PASSWORD FOR THE USER IN REQUEST
  var u = req.user;
  var post = req.body;
  models.User.find({
    where: {
      id: u.id
    }
  }).then(function (user) {
    if (user) {
      req.auth = user.id;
      user.updateAttributes({
        password: hasher.hash(post.password),
        reset_time: Date.now()
      }).then(function () {
        models.Reset.find({ where: { key: req.key } }).then(function (r) {
          if (r) {
            r.updateAttributes({
              valid: false
            });
          }
          next();
        });
      });
    }
  }).catch(next);
}, respondWithToken);


//Serve forget password page (start of reset process)
router.get('/forget', function (req, res, next) {
  //SERVE THE FORGOT PASSWORD PAGE
  res.render('forgot-password');
});

//Handle forget page
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
        link = constants.BASE_URL + '/reset/' + sign_token({ key: payload }, {
          expiresIn: '1h'
        });
        //mailer.sendMail('success-link-template');
        res.status(constants.HTTP.CODES.SUCCESS);
        res.send(link);
        //res.render('redirect-mail');
      }).catch(next);
    } else {
      //mailer.sendMail('malicious-template');      
      res.sendStatus(constants.HTTP.CODES.SUCCESS);
      //res.render('redirect-mail');
    }
  }).catch(next);
});


//SIGNUP AND LOGIN APIS
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
    }).then(next).catch(function (err) {
      if (err.name == "SequelizeValidationError") {
        res.status(constants.HTTP.CODES.BAD_REQUEST)
        res.json(response(constants.MESSAGES.GENERAL.FIELDS_INVALID));
      } else if (err.name == "SequelizeUniqueConstraintError") {
        res.status(constants.HTTP.CODES.BAD_REQUEST)
        res.json(response(constants.MESSAGES.SIGNUP.EXIST));
      }
      else {
        next(err);
      }
    });
  } else {
    res.status(constants.HTTP.CODES.BAD_REQUEST)
    res.json(response(constants.MESSAGES.GENERAL.FIELDS_INVALID));
  }
}, respondWithToken);

router.post('/login', function (req, res, next) {
  var post = req.body;
  models.User.find({
    where: {
      [Op.or]: [{
        username: post.username
      }, {
        email: post.username
      }]
      //email: post.email
    }
  }).then(function (user) {
    if (user) {
      if (hasher.compare(post.password, user.password)) {
        req.auth = user.id;
        res.status(constants.HTTP.CODES.SUCCESS);
        next();
      } else {
        res.status(constants.HTTP.CODES.UNAUTHORIZED);
        res.json(response(constants.MESSAGES.LOGIN.AUTH_FAILED));
      }
    } else {
      res.status(constants.HTTP.CODES.UNAUTHORIZED);
      res.json(response(constants.MESSAGES.LOGIN.AUTH_FAILED));
    }
  }).catch(next);
}, respondWithToken);

router.get('/status', passport.authenticate('jwt', { session: false }),
  function (req, res, next) {
    res.status(constants.HTTP.CODES.SUCCESS);
    res.json(response(constants.MESSAGES.GENERAL.SUCCESS));
  }
);

module.exports = router;