'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      timeDeadline: {
        type: Sequelize.DATE
      },
      task: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM(["done", "on process"])
      },
      categoryID: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Categories',
          key: 'id'
        },
        allowNull: true
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
    await queryInterface.dropTable('Todos');
  }
};