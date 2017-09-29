'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull:false,
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUID4
        
      },
      name: {
        type: Sequelize.STRING
      },
      username: {
        allowNull:false,
        unique:true,
        type: Sequelize.STRING
      },
      email: {
        allowNull:false,
        unique:true,
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      account_no: {
        type: Sequelize.STRING
      },
      bank: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      type:{
        type:Sequelize.STRING
      },
      credit: {
        type: Sequelize.FLOAT,
        defaultValue:0.0
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
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
    return queryInterface.dropTable('Users');
  }
};