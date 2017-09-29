var bcrypt = require('bcrypt');
var saltRounds=10;
module.exports = {
    hash: function (data) {
        return bcrypt.hashSync(data, saltRounds);
    },
    compare: function (data, hash) {
        return bcrypt.compareSync(data, hash);
    }
}