var models = require('../../models');
var constants = require('../../config/constants');
var response = require('../../helpers/response');
var validate = require('../../helpers/validate');
var params = require('../../helpers/parameters');

//models.transaction();
var obj = {
    createBloodCase: function (req, res, next) {
        var post = req.body;
        var user_id= req.user.id;
        if (validate(params.CASE, post) && validate(params.BLOOD, post)) {
            models.sequelize.transaction(function (t) {
                return models.Case.create({
                        title: post.title,
                        description:post.description,
                        contact:post.contact,
                        url:post.url,
                        active:true,
                        verified:false,
                        //userId:user_id
                    }, {
                        transaction: t
                    }).then(function (c) {
                        c.setUser(user_id);
                        return models.BloodDonation.create({
                            blood_group : post.blood_group,
                            location:post.location,
                           // cordinate:{post.lognitude,post.lattitude}
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
        var user_id= req.user.id;
        var post = req.body;
        if (validate(params.CASE, post) && validate(params.CASH, post)) {
            models.sequelize.transaction(function (t) {
                return models.Case.create({
                        title: post.title,
                        description:post.description,
                        contact:post.contact,
                        url:post.url,
                        active:true,
                        verified:false,
                       // user_id:user_id
                    }, {
                        transaction: t
                    }).then(function (c) {
                        c.setUser(user_id);
                        return models.CashDonation.create({
                            amount_required:post.amount_required,
                            amount_recieved:0,
                            category : post.category
                        }, {
                            transaction: t
                        }).then(function (cash) {
                            cash.setCase(c);
                            res.status(constants.HTTP.CODES.CREATED);
                            res.json(response(constants.MESSAGES.GENERAL.SUCCESS));
                        }).catch(next);
                    })
                    .catch(next);
            }).then(function (result) {
                
            }).catch(next);

        } else {
            res.status(constants.HTTP.CODES.BAD_REQUEST);
            res.json(response(constants.MESSAGES.GENERAL.FIELDS_INVALID));
        }
    },

    createVolunteerCase:function (req, res, next) {
        var user_id= req.user.id;
        var post = req.body;
        if (validate(params.CASE, post) && validate(params.VOLUNTEER, post)) {
            models.sequelize.transaction(function (t) {
                return models.Case.create({
                        title: post.title,
                        description:post.description,
                        contact:post.contact,
                        url:post.url,
                        active:true,
                        verified:false,
                        //user_id:user_id
                    }, {
                        transaction: t
                    }).then(function (c) {
                        c.setUser(user_id);
                        return models.Volunteering.create({
                            duration:post.length,
                            time: post.time
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