"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Finishing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Finishing.hasMany(models.Product, {
        foreignKey: "finishing_id",
        onDelete: "SET NULL",
        as: "products",
      });
    }
  }
  Finishing.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Finishing",
    }
  );
  return Finishing;
};
