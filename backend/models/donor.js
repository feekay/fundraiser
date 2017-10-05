'use strict';
var literals = require('../helpers/literals');

module.exports = (sequelize, DataTypes) => {
  var Donor = sequelize.define('Donor', {
    group: {
      type:DataTypes.STRING,
      validate: {
        isIn:[literals.BLOOD_GROUPS.ALL]
      }
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    classMethods: {
      
    }
  });
  Donor.associate= function(models) {
        // associations can be defined here
        models.Donor.belongsTo(models.User);
      }
  return Donor;
};