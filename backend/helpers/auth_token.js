var sign_token = require('./token');
var response = require('./response');
var constants = require('../config/constants');

module.exports = function (req, res, next) {
  if (!req.auth) {
    next()
  } else {
    res.json(response(constants.MESSAGES.LOGIN.SUCCESS, {
      token: sign_token({user_id:req.auth}, {
        expiresIn: '5d'
      })
    }));
  }
}