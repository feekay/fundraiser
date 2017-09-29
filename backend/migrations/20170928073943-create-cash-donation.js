'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CashDonations', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUID4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      amount_required: {
        type: Sequelize.FLOAT
      },
      amount_recieved: {
        type: Sequelize.FLOAT,
        defaultValue:0.0
      },
      category: {
        type: Sequelize.STRING
      },
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
    return queryInterface.dropTable('CashDonations');
  }
};