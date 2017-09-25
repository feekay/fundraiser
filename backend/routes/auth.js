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
});


router.get('/reset/:token',function(req,res,next){
  //VERIFY TOKEN IS VALID AND THE PAYLOAD IS MATCHED WITH A MAIL ADDRESS
});

router.post('/reset/:token',function(req,res,next){
//VERIFY THE TOKEN IS VALID AND THE PAYLOAD IS MATCHED AGAINST A MAIL ADDRESS
//RESET THE PASSPOST FOR THE USER WITH THAT MAIL
});

router.get('/forget',function(req,res,next){
  //SERVE THE FORGOT PASSWORD PAGE
});

router.post('/forget',function(req,res,next){
  //SAVE A UUID AGAINST THE POSTED MAIL
  //GENERATE TOKEN OF THIS UUID4 PAYLOAD that expires in an hour
  //SEND MAIL TO THE POSTED EMAIL CONTAINING A LINK TO RESET/token
});
module.exports = router;
