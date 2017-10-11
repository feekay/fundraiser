var models = require('../../models');
var response = require('../../helpers/response');
var constants = require('../../config/constants');
var q = require('../../helpers/query-builder');

var obj = {};

    obj.searchCashCases= function (filter, options = {}) {
        return models.CashDonation.findAll({
            where: filter,
            include:[{ model : models.Case }],            
            limit: options.limit || constants.SEARCH_LIMIT,
            offset: options.offset || 0,
            order: options.sort
        });
    },
    obj.searchBloodCases= function (filter, options = {}) {
        return models.BloodDonation.findAll({
            where: filter,
            include:[{ model : models.Case }],
            limit: options.limit || constants.SEARCH_LIMIT,
            offset: options.offset || 0,
            order: options.sort
        });
    },
    obj.searchVolunteeringCases= function (filter, options = {}) {
        return models.Volunteering.findAll({
            where: filter,
            include:[{ model : models.Case }],            
            limit: options.limit || constants.SEARCH_LIMIT,
            offset: options.offset || 0,
            order: options.sort
        });
    },
    obj.query= function (req, res, next) {
        var func = null;
        switch (req.key) {
            case "blood":
                func = obj.searchBloodCases;
                break;
            case "cash":
                func = obj.searchCashCases;
                break;
            case "volunteer":
                func = obj.searchVolunteeringCases;
                break;
        }
        func(req.filter, req.options).then(function (result) {
            res.status(constants.HTTP.CODES.SUCCESS);
            res.json(response(constants.MESSAGES.GENERAL.SUCCESS, result));
        }).catch(next);
    },
    obj.search= function (req, res, next) {
        req.key = req.query.type;
        req.filter = q.getFilterFromQuery(req.query);
        req.options = q.getOptionsFromQuery(req.query);
        next();
    },
    obj.fetch= function (req, res, next) {
        req.filter = q.getFilter(req.query.relevance);
        req.options = q.getOptionsFromQuery(req.query);
        next();
    },
    obj.getCashCases= function (req, res, next) {
        req.key = 'cash';
        next();
    },
    obj.getBloodCases= function (req, res, next) {
        req.key = 'blood';
        next();
    },
    obj.getVolunteeringCases= function (req, res, next) {
        req.key = 'volunteer';
        next();
    }

module.exports = obj;