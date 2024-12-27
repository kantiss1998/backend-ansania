"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Product, {
        foreignKey: "category_id",
        onDelete: "SET NULL",
        as: "products",
      });
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      description: DataTypes.STRING,
      image_url: {
        type: DataTypes.STRING,
        defaultValue: "-",
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
