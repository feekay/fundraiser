var models = require('../../models');
var sequelize = require('sequelize');
var constants = require('../../config/constants');
var response = require('../../helpers/response');
var validate = require('../../helpers/validate');
var params = require('../../helpers/parameters');

var obj = {
    createBloodCase: function (req, res, next) {
        var post = req.body;
        if (validate(params.CASE, post) && validate(params.BLOOD, post)) {
            sequelize.transaction(function (t) {
                return models.Case.create({

                    }, {
                        transaction: t
                    }).then(function (c) {
                        return models.BloodDonation.create({

                        }, {
                            transaction: t
                        }).then(function (blood) {
                            blood.setCase(c);
                        }).catch(next);
                    })
                    .catch(next);
            }).then(function (result) {
                res.status(constants.HTTP.CODES.CREATED);
                res.json(response(constants.MESSAGES.GENERAL.SUCCESS));
            }).catch(next);

        } else {
            res.status(constants.HTTP.CODES.BAD_REQUEST);
            res.json(response(constants.MESSAGES.GENERAL.FIELDS_INVALID));
        }
    },

    createCashCase: function (req, res, next) {
        var post = req.body;
        if (validate(params.CASE, post) && validate(params.CASH, post)) {
            sequelize.transaction(function (t) {
                return models.Case.create({

                    }, {
                        transaction: t
                    }).then(function (c) {
                        return models.CashDonation.create({

                        }, {
                            transaction: t
                        }).then(function (cash) {
                            cash.setCase(c);
                        }).catch(next);
                    })
                    .catch(next);
            }).then(function (result) {
                res.status(constants.HTTP.CODES.CREATED);
                res.json(response(constants.MESSAGES.GENERAL.SUCCESS));
            }).catch(next);

        } else {
            res.status(constants.HTTP.CODES.BAD_REQUEST);
            res.json(response(constants.MESSAGES.GENERAL.FIELDS_INVALID));
        }
    },

    createVolunteerCase:function (req, res, next) {
        var post = req.body;
        if (validate(params.CASE, post) && validate(params.VOLUNTEER, post)) {
            sequelize.transaction(function (t) {
                return models.Case.create({

                    }, {
                        transaction: t
                    }).then(function (c) {
                        return models.Volunteering.create({

                        }, {
                            transaction: t
                        }).then(function (volunteer) {
                            volunteer.setCase(c);
                        }).catch(next);
                    })
                    .catch(next);
            }).then(function (result) {
                res.status(constants.HTTP.CODES.CREATED);
                res.json(response(constants.MESSAGES.GENERAL.SUCCESS));
            }).catch(next);

        } else {
            res.status(constants.HTTP.CODES.BAD_REQUEST);
            res.json(response(constants.MESSAGES.GENERAL.FIELDS_INVALID));
        }
    }
}
module.exports = obj;