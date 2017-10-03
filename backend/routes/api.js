var express = require('express');
var router = express.Router();
var passport = require('passport');
var multer = require('multer');

var searchMiddlewares = require('./middlewares/search');
var detailMiddlewares = require('./middlewares/details');
var updateMiddlewares = require('./middlewares/update');
var donateMiddlewares = require('./middlewares/donate');
var createMiddlewares = require('./middlewares/new_case');

var paramMiddlewares = require('./middlewares/params');

router.param('cashid', paramMiddlewares.cashId);
router.param('bloodid', paramMiddlewares.bloodId);
router.param('vid', paramMiddlewares.volunteerId);


//------------FETCH AND SEARCH CASES---------//
router.get('/cash', searchMiddlewares.getCashCases,
    searchMiddlewares.fetch,
    searchMiddlewares.query);

router.get('/blood', searchMiddlewares.getBloodCases,
    searchMiddlewares.fetch,
    searchMiddlewares.query);

router.get('/volunteer', searchMiddlewares.getVoluenteeringCases,
    searchMiddlewares.fetch,
    searchMiddlewares.query);

router.get('/find', searchMiddlewares.search,
    searchMiddlewares.query);


//------------------ADD CASE---------------//
router.post('/cash', passport.authenticate('jwt', {session: false}),
    createMiddlewares.createCashCase);

router.post('/blood', passport.authenticate('jwt', {session: false}),
    createMiddlewares.createBloodCase);

router.post('/volunteer', passport.authenticate('jwt', {session: false}),
    createMiddlewares.createVolunteerCase);


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
    updateMiddlewares.updateCashCase); //EDIT CASE

router.put('/blood/:bloodid', passport.authenticate('jwt', {session: false}),
    updateMiddlewares.updateBloodDonation); //EDIT CASE

router.put('/volunteer/:vid', passport.authenticate('jwt', {session: false}),
    updateMiddlewares.updateVolunteering); //EDIT CASE

router.post('/cash/:cashid/close', passport.authenticate('jwt', {session: false}),
    updateMiddlewares.closeCashCase);

router.post('/blood/:bloodid/close', passport.authenticate('jwt', { session: false}),
    updateMiddlewares.closeBloodCase);

router.post('/volunteer/:vid/close', passport.authenticate('jwt', { session: false}),
    updateMiddlewares.closeVolunteering);


//------------------ABOUT ME-------------------//
router.put('/profile', passport.authenticate('jwt', {session: false }),
    updateMiddlewares.updateUserDetails); //EDIT PROFILE

//router.get('/profile',); //RETURN USER PROFILE

router.get('/profile/activity', passport.authenticate('jwt', {session: false}),
    detailMiddlewares.userDetails);

module.exports = router;