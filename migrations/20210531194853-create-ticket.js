'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
      },
      adminId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      gain: {
        allowNull: false,
        type: Sequelize.STRING
      },
      etat: {
        type: Sequelize.ENUM,
        values: [
          'distribue',
          'valide',
          'non-distribue'
        ],
        defaultValue: 'non-distribue'
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      magasin: {
        allowNull: true,
        type: Sequelize.STRING
      },
      validateAt: {
        allowNull: true,
        type: Sequelize.DATE
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tickets');
  }
};