'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estate_id: {
        type: Sequelize.INT
      },
      wifi: {
        type: Sequelize.BOOLEAN
      },
      baños: {
        type: Sequelize.INT
      },
      estufa: {
        type: Sequelize.BOOLEAN
      },
      parking: {
        type: Sequelize.BOOLEAN
      },
      beds: {
        type: Sequelize.INT
      },
      refri: {
        type: Sequelize.BOOLEAN
      },
      tv: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Services');
  }
};