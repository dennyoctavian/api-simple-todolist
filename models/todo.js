'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.Category,{
        foreignKey: "CategoryID",
      });
    }
  }
  Todo.init({
    timeDeadline: DataTypes.DATE,
    task: DataTypes.STRING,
    categoryID: DataTypes.INTEGER,
    status: DataTypes.ENUM(["done", "on process"])
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};