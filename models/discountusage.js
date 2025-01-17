"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DiscountUsage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DiscountUsage.belongsTo(models.Discount, {
        foreignKey: "discount_id",
        onDelete: "CASCADE",
        as: "discount",
      });
      DiscountUsage.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        as: "user",
      });
      DiscountUsage.belongsTo(models.Order, {
        foreignKey: "order_id",
        onDelete: "CASCADE",
        as: "order",
      });
    }
  }
  DiscountUsage.init(
    {
      user_id: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
      discount_id: DataTypes.INTEGER,
      usage_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "DiscountUsage",
    }
  );
  return DiscountUsage;
};
