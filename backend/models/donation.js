'use strict';

module.exports = (sequelize, DataTypes) => {
  var Donation = sequelize.define('Donation', {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUID4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    amount: {
      type: DataTypes.INTEGER,
      validate: {
        min: 100
      }
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    annonymous: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    pay_time: DataTypes.DATE
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  Donation.associate = function (models) {
    // associations can be defined here
  }
  return Donation;
};