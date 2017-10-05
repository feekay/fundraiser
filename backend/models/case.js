'use strict';
var Sequelize = require('sequelize');

const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  var Case = sequelize.define('Case', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    contact: DataTypes.STRING,
    url: {
      type:DataTypes.STRING,
      validate:{
        [Op.isUrl]:true
      }
    },
    active: {
      type:DataTypes.BOOLEAN,
      defaultValue:true
    },
    verified: {
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }    
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Case.belongsTo(models.User);
      }
    },
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return Case;
};