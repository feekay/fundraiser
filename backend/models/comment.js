'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    text: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  Comment.associate = function (models) {
    // associations can be defined here
    models.Comment.belongsTo(models.Case);
    models.Comment.belongsTo(models.User);
  }
  return Comment;
};