module.exports=function(user){
    secret = process.env.SECRET || secret.superSecret;
    return jwt.sign(user.id,secret);
}