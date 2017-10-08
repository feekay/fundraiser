var Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = {
    getFilterFromQuery: function (query) {
        filter = {};
        filter[query.filter] = {
            [Op.regexp]: '[[:<:]]' + query.key + '[[:>:]]'
        };
        filter['category']=query.category;
        return filter;
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
        return filter;
    },
    getOptionsFromQuery: function (query) {
        options ={};
        if(query.limit){
            options[limit]=query[limit];
        }
        if(query.offset){
            options[limit]=query[limit];            
        }
        if(query.sort){
            options[sort]=query.sort;
        }
        return options;
    }
}