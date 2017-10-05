var models = require('../../models');
var response = require('../../helpers/response');
var constants = require('../../config/constants');

var obj = {

    caseDetails: function (id) {
        var param = req.params.id;
        models.Case.find({
            where: {
                id: param
            }
        }).then(function (cse) {
            if (cse) {
                res.status(constants.HTTP.CODES.SUCCESS);
                res.json(response(constants.MESSAGES.GENERAL.SUCCESS, cse));
            } else {
                res.status(constants.HTTP.CODES.NOT_FOUND);
                res.json(response(constants.MESSAGES.GENERAL.NOT_FOUND));
            }
        }).catch(next);
    },
    bloodCaseDetails: function (req, res, next) {
        var param = req.params.bloodid;
        models.BloodDonation.find({
            where: {
                id: param
            },
            include: [{
                model: models.Case,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: models.User,
                    attributes: ['id', 'name', 'username']
                }]
            }]
        }).then(function (blood) {
            if (blood) {
                res.status(constants.HTTP.CODES.SUCCESS);
                res.json(response(constants.MESSAGES.GENERAL.SUCCESS, blood));
            } else {
                res.status(constants.HTTP.CODES.NOT_FOUND);
                res.json(response(constants.MESSAGES.GENERAL.NOT_FOUND));
            }
        }).catch(next);
    },
    cashCaseDetails: function (req, res, next) {
        var param = req.params.cashid;
        models.CashDonation.find({
            where: {
                id: param
            },
            include: [{
                    model: models.Case,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [{
                        model: models.User,
                        attributes: ['id', 'name', 'username']
                    }]
                },
                {
                    model: models.User,
                    attributes: ['id', 'name'],
                    through: {
                        where: {
                            paid: true
                        }
                    }
                }
            ]
        }).then(function (cash) {
            if (cash) {
                res.status(constants.HTTP.CODES.SUCCESS);
                res.json(response(constants.MESSAGES.GENERAL.SUCCESS, cash));
            } else {
                res.status(constants.HTTP.CODES.NOT_FOUND);
                res.json(response(constants.MESSAGES.GENERAL.NOT_FOUND));
            }
        }).catch(next);
    },
    volunteeingCaseDetails: function (req, res, next) {
        var param = req.params.vid;
        models.Volunteering.find({
            where: {
                id: param
            },
            include: [{
                model: models.Case,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: models.User,
                    attributes: ['id', 'name', 'username']
                }]
            }]
        }).then(function (volunteer) {
            if (volunteer) {
                res.status(constants.HTTP.CODES.SUCCESS);
                res.json(response(constants.MESSAGES.GENERAL.SUCCESS, volunteer));
            } else {
                res.status(constants.HTTP.CODES.NOT_FOUND);
                res.json(response(constants.MESSAGES.GENERAL.NOT_FOUND));
            }
        }).catch(next);
    },
    userDetails: function (req, res, next) {
        var param = req.user.id;
        models.User.find({
            where: {
                id: param,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{
                model: models.CashDonation
            }]
        }).then(function (u) {
            res.status(constants.HTTP.CODES.SUCCESS);
            res.json(response(constants.HTTP.CODES.SUCCESS, u));
        }).catch(next);
    },
    publicUserDetails: function (req, res, next) {
        var param = req.user.id;
        models.User.find({
            where: {
                id: param,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'credit', 'bank', 'account_no', 'address', 'phone']
            },
            include: [{
                model: models.CashDonation
            }]
        }).then(function (u) {
            res.status(constants.HTTP.CODES.SUCCESS);
            res.json(response(constants.HTTP.CODES.SUCCESS, u));
        }).catch(next);
    }
};

module.exports = obj;