'use strict';
module.exports = (sequelize, DataTypes) => {
  var Attachment = sequelize.define('Attachment', {
    related_file: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Attachment.belongsTo(models.Case);
      }
    }
  });
  return Attachment;
};