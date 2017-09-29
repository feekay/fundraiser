'use strict';
module.exports = (sequelize, DataTypes) => {
  var Reset = sequelize.define('Reset', {
    key: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Reset.belongsTo(models.User);
      }
    },
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return Reset;
};