var models = require('../../models');
var response = require('../../helpers/response');
var constants = require('../../config/constants');
var addImages = require('../../helpers/create-attachments');
module.exports = {

    updateUserDetails: function (req, res, next) {
        var user = req.user.id;
        var post = req.body;
        var filename = req.file.path;
        if (filename) {
            filename = filename.substr(filename.indexOf("/"));
        }
        models.User.find({
            where: {
                id: user
            }
        }).then(function (user) {
            if (user) {
                user.updateAttributes({
                    //TODO
                    name: post.name || user.name,
                    username: post.username || user.username,
                    phone: post.phone || user.phone,
                    account_no: post.account_no || user.account_no,
                    bank: post.bank || user.bank,
                    address: post.address || user.address,
                    profile_photo: filename || user.profile_photo
                }).then(function () {
                    res.status(constants.HTTP.CODES.UPDATE);
                    res.json(response(constants.MESSAGES.GENERAL.SUCCESS));
                }).catch(next);

            } else {
                res.status(constants.HTTP.CODES.NOT_FOUND);
                res.json(response(constants.MESSAGES.GENERAL.NOT_FOUND));
            }
        }).catch(next);
    },

    updateCashCase: function (req, res, next) {
        var post = req.body;
        var id = req.params.cashid;
        var user = req.user.id;

        models.CashDonation.find({
            where: {
                id: id
            },
            include: [{
                model: models.Case,
                where: {
                    UserId: user
                }
            }]
        }).then(function (c) {
            if (c) {
                Promise.all([
                    c.Case.updateAttributes({
                        title: post.title || c.Case.title,
                        description: post.description || c.Case.description,
                        contact: post.contact || c.Case.contact,
                        url: post.url || c.Case.url,
                    }),
                    c.updateAttributes({
                        category: c.category || post.category
                    }),
                    addImages(req.files, c.Case)
                ]).then(function () {
                    res.status(constants.HTTP.CODES.UPDATE);
                    res.json(response(constants.MESSAGES.GENERAL.SUCCESS));
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
        var id = req.params.bloodid;
        user = req.user.id;
        models.BloodDonation.find({
            where: {
                id: id
            },
            include: [{
                model: models.Case,
                where: {
                    UserId: user
                }
            }]
        }).then(function (c) {
            if (c) {

                Promise.all([c.Case.updateAttributes({
                    title: post.title || c.Case.title,
                    description: post.description || c.Case.description,
                    contact: post.contact || c.Case.contact,
                    url: post.url || c.Case.url,
                }),
                c.updateAttributes({
                    blood_group: post.blood_group || c.blood_group,
                    location: post.location || c.location
                }),
                addImages(req.files, c.Case)

                ]).then(function () {
                    res.status(constants.HTTP.CODES.UPDATE);
                    res.json(response(constants.MESSAGES.GENERAL.SUCCESS));
                });

            } else {
                res.status(constants.HTTP.CODES.NOT_FOUND);
                res.json(response(constants.MESSAGES.GENERAL.NOT_FOUND));
            }
        }).catch(next);
    },
    updateVolunteering: function (req, res, next) {
        var post = req.body;
        var id = req.params.vid;
        models.Volunteering.find({
            where: {
                id: id
            },
            include: [{
                model: models.Case,
                where: {
                    UserId: user
                }
            }]
        }).then(function (c) {
            if (c) {
                Promise.all([
                    c.Case.updateAttributes({
                        title: post.title || c.Case.title,
                        description: post.description || c.Case.description,
                        contact: post.contact || c.Case.contact,
                        url: post.url || c.Case.url,
                    }),
                    c.updateAttributes({
                        duration: post.duration || c.duration,
                        time: post.time || c.time
                    }),
                    addImages(req.files,c.Case)                    
                ]).then(function () {
                    res.status(constants.HTTP.CODES.UPDATE);
                    res.json(response(constants.MESSAGES.GENERAL.SUCCESS));
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
            },
            include: [{
                model: models.Case,
                where: {
                    //user_id : user                
                }
            }]
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
        var param = req.params.bloodid;
        var user = req.user.id;
        models.BloodDonation.find({
            where: {
                id: param
            },
            include: [{
                model: models.Case,
                where: {
                    UserId: user
                }
            }]
        }).then(function (blood) {
            var c = blood.Case;
            if (c.active) {
                c.updateAttributes({
                    active: false
                });
            }
            res.status(constants.HTTP.CODES.SUCCESS);
            res.json(response(constants.MESSAGES.GENERAL.SUCCESS));
        }).catch(next);
    },
    closeVolunteering: function (req, res, next) {
        var param = req.params.vid;
        var user = req.user.id;
        models.Volunteering.find({
            where: {
                id: param
            },
            include: [{
                model: models.Case,
                where: {
                    UserId: user
                }
            }]
        }).then(function (v) {
            var c = v.Case;
            if (c.active) {
                c.updateAttributes({
                    active: false
                });
            }
            res.status(constants.HTTP.CODES.SUCCESS);
            res.json(response(constants.MESSAGES.GENERAL.SUCCESS));
        }).catch(next);
    }
};