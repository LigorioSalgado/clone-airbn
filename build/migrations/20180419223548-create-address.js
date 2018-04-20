'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      calle: {
        type: Sequelize.STRING
      },
      num_ext: {
        type: Sequelize.STRING
      },
      num_int: {
        type: Sequelize.STRING
      },
      colonia: {
        type: Sequelize.STRING
      },
      ciudad: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      pais: {
        type: Sequelize.STRING
      },
      cp: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.FLOAT
      },
      long: {
        type: Sequelize.FLOAT
      },
      ref: {
        type: Sequelize.TEXT
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
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Addresses');
  }
};