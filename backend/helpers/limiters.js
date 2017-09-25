var RateLimit=require('express-rate-limit');

module.exports={

    resetLimiter: new RateLimit({
        //1 REQUEST PER HOUR
        windowMs: 60*60*1000,    //1 hour
        max:1,
        delayMs:0
    }),
    loginLimiter: new RateLimit({
        //20 REQUESTS per 20 minutes
        windowMs: 20*60*1000,    //20 mins
        max:20,
        delayMs:0
    })
}