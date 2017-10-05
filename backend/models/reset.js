'use strict';
module.exports = (sequelize, DataTypes) => {
  var Reset = sequelize.define('Reset', {
    key: DataTypes.STRING,
    valid:{
      type: DataTypes.BOOLEAN,
      defaultValue:true
    }
  }, {
    classMethods: {
      
    },
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  Reset.associate= function(models) {
        // associations can be defined here
        models.Reset.belongsTo(models.User);
      }
  return Reset;
};