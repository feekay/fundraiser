var models = require('../../models');
var response = require('../../helpers/response');
var constants = require('../../config/constants');

module.exports = {

    updateUserDetails: function (req, res, next) {
        user = req.user.id;

        models.User.find({
            where: {
                id: user
            }
        }).then(function (user) {
            if (user) {
                user.updateAttributes({
                    //TODO
                });
                res.status(constants.HTTP.CODES.UPDATE);
                res.json(response(constants.MESSAGES.GENERAL.SUCCESS));
            } else {
                res.status(constants.HTTP.CODES.NOT_FOUND);
                res.json(response(constants.MESSAGES.GENERAL.NOT_FOUND));
            }
        }).catch(next);
    },

    updateCashCase: function (req, res, next) {
        var post = req.body;
        var id = req.params;
        models.CashDonation.find({
            where: {
                id: id
            }
        }).then(function (c) {
            if (c) {
                c.updateAttributes({
                    //TODO
                });
                res.status(constants.HTTP.CODES.UPDATE);
                res.json(response(constants.MESSAGES.GENERAL.SUCCESS));
            } else {
                res.status(constants.HTTP.CODES.NOT_FOUND);
                res.json(response(constants.MESSAGES.GENERAL.NOT_FOUND));
            }
        }).catch(next);
    },
    updateBloodDonation: function (req, res, next) {
        var post = req.body;
        var id = req.params;
        models.BloodDonation.find({
            where: {
                id: id
            }
        }).then(function (c) {
            if (c) {
                c.updateAttributes({
                    //TODO
                });
                res.status(constants.HTTP.CODES.UPDATE);
                res.json(response(constants.MESSAGES.GENERAL.SUCCESS));
            } else {
                res.status(constants.HTTP.CODES.NOT_FOUND);
                res.json(response(constants.MESSAGES.GENERAL.NOT_FOUND));
            }
        }).catch(next);
    },
    updateVolunteering: function (req, res, next) {
        var post = req.body;
        var id = req.params;
        models.Volunteering.find({
            where: {
                id: id
            }
        }).then(function (c) {
            if (c) {
                c.updateAttributes({
                    //TODO
                });
                res.status(constants.HTTP.CODES.UPDATE);
                res.json(response(constants.MESSAGES.GENERAL.SUCCESS));
            } else {
                res.status(constants.HTTP.CODES.NOT_FOUND);
                res.json(response(constants.MESSAGES.GENERAL.NOT_FOUND));
            }
        }).catch(next);
    },
    closeCashCase: function (req, res, next) {
        var param = req.params.cashid;
        models.CashDonation.find({
            where: {
                id: param
            }
        }).then(function (cash) {
            var c = cash.getCase();
            c.updateAttributes({
                active: false
            });
            res.status(constants.HTTP.CODES.SUCCESS);
            res.json(response(constants.MESSAGES.GENERAL.SUCCESS));
        }).catch(next);
    },
    closeBloodCase: function (req, res, next) {
        var param = req.params.cashid;
        models.BloodDonation.find({
            where: {
                id: param
            }
        }).then(function (blood) {
            var c = blood.getCase();
            c.updateAttributes({
                active: false
            });
            res.status(constants.HTTP.CODES.SUCCESS);
            res.json(response(constants.MESSAGES.GENERAL.SUCCESS));
        }).catch(next);
    }
};