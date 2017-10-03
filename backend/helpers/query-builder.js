var Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = {
    getFilterFromQuery: function (query) {
        filter = {};
        filter[query.filter] = {
            [Op.regexp]: '[[:<:]]' + query.key + '[[:>:]]'
        };
        filter['category']=query.category;
    },
    getFilter: function (str) {
        var filter = {};
        switch (str) {

            case 'trending':
                break;
            case 'newest':
                break;
            case 'urgent':
                break;
            case 'closest':
                break;
        }
    },
    getOptionsFromQuery: function (query) {},
    getOptions: function (str) {},
}