var express = require('express');
var router = express.Router();

router.param('cashid',);
router.param('bloodid',);
router.param('vid',);

//router.use('/', );
//FETCH AND SEARCH CASES
router.get('/cash',);
router.get('/blood',);
router.get('/volunteer',);
router.get('/find', );

//ADD CASE
router.post('/cash',);
router.post('/blood',);
router.post('/volunteer',);

//DETAILS
router.get('/cash/:cashid',);
router.get('/cash/:cashid/donations',) //Details about donations to this case
router.get('/blood/:bloodid',);
router.get('/volunteer/:vid',);
router.get('/volunteer/:vid/participants',);     //Details about who is going


//DONATE
router.post('/cash/:cashid/donate',);
router.post('/volunteer/:vid/signup',);
router.post('/blood/subscribe',);
router.post('/volunteer/subscribe',);

router.post('/cash/:cashid/pay',);
router.post('/checkout');


//UPDATE
router.put('/cash/:cashid',);   //EDIT CASE
router.put('/blood/:bloodid',); //EDIT CASE
router.put('/volunteer/:vid',); //EDIT CASE
router.post('/cash/:cashid/close',);
router.post('/blood/:bloodid/close',);

//ABOUT ME
router.put('/profile',);    //EDIT PROFILE
router.get('/profile',);    //RETURN USER PROFILE
router.post('/profile/activity',);

module.exports = router;