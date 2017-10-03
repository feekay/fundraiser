'use strict';
var literals = require('../helpers/literals');
var Sequelize = require('sequelize');

const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  var CashDonation = sequelize.define('CashDonation', {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUID4,
      primaryKey: true,
      type: DataTypes.UUID
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
        [Op.isIn]: [literals.CATEGORIES.ALL]
      }
    },
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        models.CashDonation.belongsTo(models.Case);
        models.CashDonation.belongsToMany(models.User, {
          through: models.Donation
        });
      }
    },
    getterMethods: {
      percent_raised() {
        return 100 * this.getDataValue('amount_recieved') / this.getDataValue('amount_required')
      }
    },
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return CashDonation;
};