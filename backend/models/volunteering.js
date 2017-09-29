'use strict';
module.exports = (sequelize, DataTypes) => {
  var Volunteering = sequelize.define('Volunteering', {
    id: {
        allowNull: false,
        defaultValue: DataTypes.UUID4,
        primaryKey: true,
        type: DataTypes.UUID
      },
    duration: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        models.Volunteering.belongsTo(models.Case);
      }
    },
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return Volunteering;
};