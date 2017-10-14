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
                    attributes: ['id', 'name', 'profile_photo']
                }, {
                    model: models.Comment
                }, {
                    model: models.Attachment
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
                    attributes: ['id', 'name', 'profile_photo']
                }, {
                    model: models.Comment
                }, {
                    model: models.Attachment
                }]
            },
            {
                model: models.Donation,
                include: [{
                    model: models.User,
                    attributes: ['id', 'name', 'profile_photo'],
                    required: false,
                    where: {
                        '$Donations.annonymous$': false
                    }
                }],
                where: {
                    paid: true
                },
                required: false
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
                    attributes: ['id', 'name', 'profile_photo']
                }, {
                    model: models.Comment
                }, {
                    model: models.Attachment
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
                exclude: ['createdAt', 'updatedAt', 'password', 'type', 'reset_time']
            }
        }).then(function (u) {
            res.status(constants.HTTP.CODES.SUCCESS);
            res.json(response(constants.HTTP.CODES.SUCCESS, u));
        }).catch(next);
    },
    publicUserDetails: function (req, res, next) {
        var param = req.params.userid;
        models.User.find({
            where: {
                id: param,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'credit', 'bank', 'account_no', 'address', 'phone', 'password', 'type', 'reset_time']
            }
        }).then(function (u) {
            res.status(constants.HTTP.CODES.SUCCESS);
            res.json(response(constants.HTTP.CODES.SUCCESS, u));
        }).catch(next);
    },
    userDonations(req, res, next) {
        var query= req.query;        
        models.Donation.findAll({
            where: {
                UserId: req.user.id
            },
            limit: 20,
            offset: Number(query.offset) ||0,            
            order: ['createdAt']
        }).then(function (donations) {
            res.status(constants.HTTP.CODES.SUCCESS);
            res.json(response(constants.HTTP.CODES.SUCCESS, donations));
        }).catch(next);
    },
    userPendingDonations(req, res, next) {
        var query= req.query;
        models.Donation.findAll({
            where: {
                UserId: req.user.id,
                paid:false
            },
            limit: 20,
            offset: Number(query.offset) ||0,
            order: ['createdAt']
        }).then(function (donations) {
            res.status(constants.HTTP.CODES.SUCCESS);
            res.json(response(constants.HTTP.CODES.SUCCESS, donations));
        }).catch(next);
    },
    userCases(req, res, next) {
        Promise.all([
            models.CashDonation.findAll({
                include: [{
                    model: models.Case,
                    where: {
                        UserId: req.user.id
                    }
                }],
                limit:10
            }),
            models.BloodDonation.findAll({
                include: [{
                    model: models.Case,
                    where: {
                        UserId: req.user.id
                    }
                }],
                limit:10
            }), models.Volunteering.findAll({
                include: [{
                    model: models.Case,
                    where: {
                        UserId: req.user.id
                    }
                }],
                limit:10
            })
        ]).then(function (results) {
            res.status(constants.HTTP.CODES.SUCCESS);
            res.json(response(constants.HTTP.CODES.SUCCESS, { cash: results[0], blood: results[1], volunteer: results[2] }));
        }).catch(next);
    }
};

module.exports = obj;