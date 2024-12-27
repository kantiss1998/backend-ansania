"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.Order, {
        foreignKey: "order_id",
        onDelete: "CASCADE",
        as: "order",
      });
      OrderItem.belongsTo(models.ProductVariant, {
        foreignKey: "product_variant_id",
        onDelete: "CASCADE",
        as: "variant",
      });
    }
  }
  OrderItem.init(
    {
      order_id: DataTypes.INTEGER,
      product_variant_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderItem",
    }
  );
  return OrderItem;
};
