var models = require('../../models');
var response = require('../../helpers/response');
var constants = require('../../config/constants');
var response = require('../../helpers/query-builder');

var obj = {
    processTransaction: function (req, res, next) {
        req.amount = 100; //SET THIS VALUE AFTER PROCESSING
        next();
    },
    caseDonations: function (req, res, next) {
        var param = req.params.cashid;
        models.CashDonation.find({
            where: {
                id: param,
            },
            include: [{
                model: models.User,
                attributes: ['id', 'name'],
                through: {
                    where: {
                        paid: true
                    }
                },
                limit:5,
                offset:0
            }]
        }).then(function (c) {
            if (c) {
                res.status(constants.HTTP.CODES.SUCCESS);
                res.json(response(constants.HTTP.CODES.SUCCESS, c.Users));
            } else {
                res.status(constants.HTTP.CODES.NOT_FOUND);
                res.json(response(constants.MESSAGES.GENERAL.NOT_FOUND));
            }
        }).catch(next);
    },
    commitToDonate: function (req, res, next) {
        var post = req.body;
        var user = req.user.id;
        var caseId = req.query.cashid;

        models.CashDonation.find({
            where: {
                id: caseId
            }
        }).then(function (c) {
            if (c) {
                c.addUser(user, {
                    amount: post.amount,
                    paid: false
                });
                res.status(constants.HTTP.CODES.SUCCESS);
                res.json(constants.MESSAGES.GENERAL.SUCCESS);
            } else {
                res.status(constants.HTTP.CODES.BAD_REQUEST);
                res.json(constants.MESSAGES.GENERAL.FAILED);
            }
        }).catch(next);
    },
    donateToCase: function (req, res, next) {
        var post = req.body;
        var user = req.user.id;
        var caseId = req.query.cashid;

        models.CashDonation.find({
            where: {
                id: caseId
            }
        }).then(function (c) {
            if (c) {
                c.addUser(user, {
                    amount: req.amount,
                    paid: true
                });
                res.status(constants.HTTP.CODES.SUCCESS);
                res.json(constants.MESSAGES.GENERAL.SUCCESS);
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
            }
            res.status(constants.HTTP.CODES.BAD_REQUEST);
            res.json(constants.MESSAGES.GENERAL.FAILED);
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
            donations = user.getCashDonations();
            donations.forEach(function (user) {
                if (!donation.paid && donation.amount <= amount) {
                    donation.updateAttributes({
                        paid: true
                    });
                    amount -= donation.amount;
                }
            }, this);

        }).catch(next);
    }
};

module.exports = obj;