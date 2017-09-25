var express = require('express');
var router = express.Router();
var sign_token=require('../helpers/token');

function getTokenFromRequest(req){
  return {token: req.user.token}
}
router.get('/facebook', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/facebook/callback', function(req, res, next) {
  res.json(getTokenFromRequest(req));
  
});

router.get('/google', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/google/callback', function(req, res, next) {
  res.json(getTokenFromRequest(req));
});

router.post('/login',function(req,res, next){
  //sign_token(user);
})
module.exports = router;
