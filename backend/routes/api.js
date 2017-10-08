var express = require('express');
var router = express.Router();
var passport = require('passport');
var multer = require('multer');

var upload = multer({dest:'public/uploads'});

var searchMiddlewares = require('./middlewares/search');
var detailMiddlewares = require('./middlewares/details');
var updateMiddlewares = require('./middlewares/update');
var donateMiddlewares = require('./middlewares/donate');
var createMiddlewares = require('./middlewares/new_case');

var paramMiddlewares = require('./middlewares/params');

router.param('cashid', paramMiddlewares.cashId);
router.param('bloodid', paramMiddlewares.bloodId);
router.param('vid', paramMiddlewares.volunteerId);
router.param('userid',paramMiddlewares.userId);


//------------FETCH AND SEARCH CASES---------//
router.get('/cash', searchMiddlewares.getCashCases,
    searchMiddlewares.fetch,
    searchMiddlewares.query);

router.get('/blood', searchMiddlewares.getBloodCases,
    searchMiddlewares.fetch,
    searchMiddlewares.query);

router.get('/volunteer', searchMiddlewares.getVolunteeringCases,
    searchMiddlewares.fetch,
    searchMiddlewares.query);

router.get('/find', searchMiddlewares.search,
    searchMiddlewares.query);

router.get('/cash/:cashid/donations', donateMiddlewares.caseDonations);

//------------------ADD CASE---------------//
router.post('/cash', passport.authenticate('jwt', {session: false}),
    upload.any(),
    createMiddlewares.createCashCase);

router.post('/blood', passport.authenticate('jwt', {session: false}),
    upload.any(),
    createMiddlewares.createBloodCase);

router.post('/volunteer', passport.authenticate('jwt', {session: false}),
    upload.any(),
    createMiddlewares.createVolunteerCase);

router.post('/case/comment',passport.authenticate('jwt', {session: false}),
    createMiddlewares.postComment);

//------------------DETAILS----------------//
router.get('/cash/:cashid', detailMiddlewares.cashCaseDetails);
router.get('/blood/:bloodid', detailMiddlewares.bloodCaseDetails);
router.get('/volunteer/:vid', detailMiddlewares.volunteeingCaseDetails);

//router.get('/cash/:cashid/donations', ) //Details about donations to this case
//router.get('/volunteer/:vid/participants', ); //Details about who is going



//------------------DONATE------------------//
router.post('/cash/:cashid/donate', passport.authenticate('jwt', {session: false}),
    donateMiddlewares.commitToDonate);

router.post('/volunteer/:vid/signup', passport.authenticate('jwt', {session: false}),
    donateMiddlewares.commitToVolunteering);

router.post('/blood/subscribe', passport.authenticate('jwt', {session: false}),
    donateMiddlewares.subscribeBloodDonor);

router.post('/volunteer/subscribe', passport.authenticate('jwt', {session: false}),
    donateMiddlewares.subscribeVolunteer);

router.post('/cash/:cashid/pay', passport.authenticate('jwt', {session: false}),
    donateMiddlewares.processTransaction,
    donateMiddlewares.donateToCase);

router.post('/checkout', passport.authenticate('jwt', {session: false}),
    donateMiddlewares.processTransaction,
    donateMiddlewares.checkout
);


//------------------UPDATE-------------------//
router.put('/cash/:cashid', passport.authenticate('jwt', {session: false}),
    upload.any(),
    updateMiddlewares.updateCashCase); //EDIT CASE

router.put('/blood/:bloodid', passport.authenticate('jwt', {session: false}),
    upload.any(),
    updateMiddlewares.updateBloodDonation); //EDIT CASE

router.put('/volunteer/:vid', passport.authenticate('jwt', {session: false}),
    upload.any(),
    updateMiddlewares.updateVolunteering); //EDIT CASE

router.post('/cash/:cashid/close', passport.authenticate('jwt', {session: false}),
    updateMiddlewares.closeCashCase);

router.post('/blood/:bloodid/close', passport.authenticate('jwt', { session: false}),
    updateMiddlewares.closeBloodCase);

router.post('/volunteer/:vid/close', passport.authenticate('jwt', { session: false}),
    updateMiddlewares.closeVolunteering);


//------------------ABOUT ME-------------------//
router.put('/profile', passport.authenticate('jwt', {session: false }),
    upload.single(),
    updateMiddlewares.updateUserDetails); //EDIT PROFILE

router.get('/:userid/profile',detailMiddlewares.publicUserDetails); //RETURN USER PROFILE

router.get('/profile/activity', passport.authenticate('jwt', {session: false}),
    detailMiddlewares.userDetails);

module.exports = router;