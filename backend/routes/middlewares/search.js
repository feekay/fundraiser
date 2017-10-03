var models = require('../../models');
var response = require('../../helpers/response');
var constants = require('../../config/constants');
var response = require('../../helpers/query-builder');

var obj = {

    searchCashCases: function (filter, options = {}) {
        return models.CashDonation.findAll({
            where: filter,
            limit: options.limit || constants.SEARCH_LIMIT,
            offset: options.offset || 0,
            order: options.sort
        });
    },
    searchBloodCases: function (filter, options = {}) {
        return models.BloodDonation.findAll({
            where: filter,
            limit: options.limit || constants.SEARCH_LIMIT,
            offset: options.offset || 0,
            order: options.sort
        });
    },
    searchVolunteeringCases: function (filter, options = {}) {
        return models.Volunteering.findAll({
            where: filter,
            limit: options.limit || constants.SEARCH_LIMIT,
            offset: options.offset || 0,
            order: options.sort
        });
    },
    query: function (req, res, next, key, filter, options) {
        var func = None;
        switch (req.key) {
            case "blood":
                func = this.searchBloodCases;
                break;
            case "cash":
                func = this.searchCashCases;
                break;
            case "volunteer":
                func = this.searchVolunteeringCases;
                break;
        }
        func(req.filter, req.options).then(function (result) {
            res.status(constants.HTTP.CODES.SUCCESS);
            res.json(response(constants.MESSAGES.GENERAL.SUCCESS, result));
        }).catch(next);
    },
    search: function (req, res, next) {
        req.key = req.query.type;
        req.filter = q.getFilterFromQuery(req.query);
        req.options = q.getOptionsFromQuery(req.query);
        next();
    },
    fetch: function (req, res, next) {
        req.filter = q.getFilter();
        req.options = q.getOptions();
        next();
    },
    getCashCases: function (req, res, next) {
        req.key = 'cash';
        next();
    },
    getBloodCases: function (req, res, next) {
        req.key = 'blood';
        next();
    },
    getVoluenteeringCases: function (req, res, next) {
        req.key = 'volunteer';
        next();
    }
};

module.exports = obj;