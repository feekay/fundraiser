'use strict';
var literals = require('../helpers/literals');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    profile_photo: {
      type: DataTypes.STRING,
    },
    name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notIn: [
          '@', ' ', '.', ':', ';', '?'
        ]
      }
    },
    email: {
      allowNull: false,
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
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  User.associate = function (models) {
    // associations can be defined here
    models.User.belongsToMany(models.CashDonation, {
      through: models.Donation
    });
  }
  return User;
};