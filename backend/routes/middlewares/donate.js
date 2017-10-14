var models = require('../../models');
var response = require('../../helpers/response');
var constants = require('../../config/constants');
var q = require('../../helpers/query-builder');

var obj = {
    processTransaction: function (req, res, next) {
        req.amount = 400; //SET THIS VALUE AFTER PROCESSING
        next();
    },
    caseDonations: function (req, res, next) {
        var param = req.params.cashid;
        var query = req.query;
        models.CashDonation.find({
            where: {
                id: param
            },
            include: [{
                model: models.Donation,
                include: [{
                    model: models.User,
                    attributes: ['id', 'name', 'profile_photo'],
                    required: false,
                    where: {
                        '$Donation.annonymous$': false
                    }
                }],
                where: {
                    paid: true
                },
                required: false,
                limit: 10,
                offset: Number(query.offset) || 0
            }],
            required: false
        }).then(function (c) {
            if (c) {
                res.status(constants.HTTP.CODES.SUCCESS);
                res.json(response(constants.HTTP.CODES.SUCCESS, c.Donations));
            } else {
                res.status(constants.HTTP.CODES.NOT_FOUND);
                res.json(response(constants.MESSAGES.GENERAL.NOT_FOUND));
            }
        }).catch(next);
    },
    commitToDonate: function (req, res, next) {
        var post = req.body;
        var user = req.user;
        var caseId = req.params.cashid;

        models.CashDonation.find({
            where: {
                id: caseId
            }
        }).then(function (c) {
            if (c) {
                models.Donation.create({
                    amount: post.amount,
                    paid: false,
                    UserId: user.id,
                    CashDonationId: caseId
                }).then(function (d) {
                    res.status(constants.HTTP.CODES.SUCCESS);
                    res.json(constants.MESSAGES.GENERAL.SUCCESS);
                }).catch(next);
            } else {
                res.status(constants.HTTP.CODES.NOT_FOUND);
                res.json(constants.MESSAGES.GENERAL.NOT_FOUND);
            }
        }).catch(next);
    },
    donateToCase: function (req, res, next) {
        var post = req.body;
        var user = req.user;
        var caseId = req.params.cashid;
        models.CashDonation.find({
            where: {
                id: caseId
            }
        }).then(function (c) {
            if (c) {
                models.Donation.create({
                    amount: post.amount,
                    paid: true,
                    pay_time: Date.now(),
                    UserId: user.id,
                    CashDonationId: caseId
                }).then(function () {
                    c.updateAttributes({
                        amount_recieved: c.amount_recieved + req.amount
                    });
                    res.status(constants.HTTP.CODES.SUCCESS);
                    res.json(constants.MESSAGES.GENERAL.SUCCESS);
                }).catch(next);
            } else {
                res.status(constants.HTTP.CODES.BAD_REQUEST);
                res.json(constants.MESSAGES.GENERAL.FAILED);
            }
        }).catch(next);
    },
    subscribeBloodDonor: function (req, res, next) {
        var post = req.body;
        var user = req.user.id;
        models.User.find({
            where: {
                id: user
            }
        }).then(function (user) {
            if (user) {
                models.Donor.create({
                    group: post.blood_group,
                }).then(function (donor) {
                    donor.setUser(user);
                    res.status(constants.HTTP.CODES.CREATED);
                    res.json(constants.MESSAGES.GENERAL.SUCCESS);
                }).catch(next);
            } else {
                res.status(constants.HTTP.CODES.BAD_REQUEST);
                res.json(constants.MESSAGES.GENERAL.FAILED);
            }
        }).catch(next);
    },
    commitToVolunteering: function (req, res, next) {

    },
    subscribeVolunteer: function (req, res, next) {
        var post = req.body;
        var user = req.user.id;
        models.User.find({
            where: {
                id: user
            }
        }).then(function (user) {
            if (user) {
                models.Volunteer.create({
                    location: post.location,
                    interest: post.interest
                }).then(function (volunteer) {
                    volunteer.setUser(user);
                    res.status(constants.HTTP.CODES.CREATED);
                    res.json(constants.MESSAGES.GENERAL.SUCCESS);
                }).catch(next);
            }
            res.status(constants.HTTP.CODES.BAD_REQUEST);
            res.json(constants.MESSAGES.GENERAL.FAILED);
        }).catch(next);
    },
    checkout: function (req, res, next) {
        //PROCESS TRANSACTION
        var user = req.user.id;
        var post = req.body;
        var amount = req.amount;
        models.User.find({
            id: user
        }).then(function (user) {
            var i = 0;
            user.getDonations().then(function (donations) {
                for (donation of donations) {
                    if (!donation.paid && donation.amount <= amount) {
                        donation.updateAttributes({
                            paid: true,
                            pay_time: Date.now()
                        }).then(function (d) {
                            d.getCashDonation().then(function (cash) {
                                cash.updateAttributes({
                                    amount_recieved: cash.amount_recieved + d.amount
                                }).catch(next);
                            });
                        }).catch(next);
                        amount -= donation.amount;
                    }
                };
                res.status(constants.HTTP.CODES.SUCCESS);
                res.json(response(constants.MESSAGES.GENERAL.SUCCESS, { balance: amount }));
            }).catch(next);
        }).catch(next);
    }
};

module.exports = obj;