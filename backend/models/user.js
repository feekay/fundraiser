'use strict';
var literals = require('../helpers/literals');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUID4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
    },
    account_no: {
      type: DataTypes.STRING
    },
    bank: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    credit: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        isIn: [literals.ACCOUNTS.ALL]
      }
    },
    reset_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        models.User.belongsToMany(models.CashDonation, {
          through: models.Donation
        });
      }
    },
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return User;
};