'use strict';
var literals = require('../helpers/literals');
module.exports = (sequelize, DataTypes) => {
  var BloodDonation = sequelize.define('BloodDonation', {
    id: {
        allowNull: false,
        defaultValue: DataTypes.UUID4,
        primaryKey: true,
        type: DataTypes.UUID
      },
    blood_group: {
      type:DataTypes.STRING,
      validate: {
        isIn:[literals.BLOOD_GROUPS.ALL]
      }
    },
    location: DataTypes.STRING,
    cordinate: DataTypes.GEOMETRY('POINT'),
    //latitude: DataTypes.STRING,
    //longnitude: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        models.BloodDonation.belongsTo(models.Case);

      }
    },
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return BloodDonation;
};