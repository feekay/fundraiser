var jwt = require('jsonwebtoken');

module.exports=function(payload,options={}){
    secret = process.env.SECRET || secret.superSecret;
    return jwt.sign(payload,secret,options);
}