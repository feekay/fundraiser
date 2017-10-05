'use strict';
module.exports = (sequelize, DataTypes) => {
  var Volunteer = sequelize.define('Volunteer', {
    interest: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
  });
  Volunteer.associate = function (models) {
    // associations can be defined here
    models.Volunteer.belongsTo(models.User);
  }
  return Volunteer;
};