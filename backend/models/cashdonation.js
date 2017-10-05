'use strict';
var literals = require('../helpers/literals');
module.exports = (sequelize, DataTypes) => {
  var CashDonation = sequelize.define('CashDonation', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    amount_required: {
      type: DataTypes.FLOAT,
      min: 1000
    },
    amount_recieved: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        isIn: [literals.CATEGORIES.ALL]
      }
    },
  }, {
    classMethods: {
      
    },
    getterMethods: {
      percent_raised() {
        return 100 * this.getDataValue('amount_recieved') / this.getDataValue('amount_required')
      }
    },
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  CashDonation.associate= function (models) {
        // associations can be defined here
        models.CashDonation.belongsTo(models.Case);
        models.CashDonation.belongsToMany(models.User, {
          through: models.Donation
        });
      }
  return CashDonation;
};