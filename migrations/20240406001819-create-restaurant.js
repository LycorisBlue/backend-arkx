'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Restaurants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      key: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      adresse: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      numero: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      heure_ouverture: {
        type: Sequelize.STRING
      },
      heure_fermeture: {
        type: Sequelize.STRING
      },
      localisation: {
        type: Sequelize.STRING
      },
      enable: {
        type: Sequelize.INTEGER
      },
      delete: {
        type: Sequelize.INTEGER
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Restaurants');
  }
};