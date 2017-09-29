'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Volunteerings', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUID4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      duration: {
        type: DataTypes.STRING
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
    return queryInterface.dropTable('Volunteerings');
  }
};