'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BloodDonations', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUID4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      blood_group: {
        type: Sequelize.STRING
      },
      place: {
        type: Sequelize.STRING
      },
      cordinate:{
        type: Sequelize.GEOMETRY('POINT')
      },
      // latitude: {
      //   type: Sequelize.STRING
      // },
      // longnitude: {
      //   type: Sequelize.STRING
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BloodDonations');
  }
};