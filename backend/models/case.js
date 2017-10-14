'use strict';

module.exports = (sequelize, DataTypes) => {
  var Case = sequelize.define('Case', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    contact: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    location:{
      type: DataTypes.STRING
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  Case.associate = function (models) {
    // associations can be defined here
    models.Case.belongsTo(models.User);
    models.Case.hasMany(models.Comment);  
    models.Case.hasMany(models.Attachment);  
  }
  return Case;
};