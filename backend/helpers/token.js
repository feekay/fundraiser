var jwt = require('jsonwebtoken');
var secret = require('../config/constants').SECRET;
module.exports=function(payload,options={}){
    s = process.env.SECRET || secret.superSecret;
    console.log(s);
    return jwt.sign(payload,s,options);
}