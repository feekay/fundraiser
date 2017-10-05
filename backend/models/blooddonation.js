'use strict';
var literals = require('../helpers/literals');

module.exports = (sequelize, DataTypes) => {
  var BloodDonation = sequelize.define('BloodDonation', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
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
      
    },
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  BloodDonation.associate= function (models) {
        // associations can be defined here
        models.BloodDonation.belongsTo(models.Case);

      }
  return BloodDonation;
};