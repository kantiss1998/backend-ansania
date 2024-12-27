"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        as: "user",
      });
      Order.hasMany(models.OrderItem, {
        foreignKey: "order_id",
        onDelete: "CASCADE",
        as: "items",
      });
      Order.hasOne(models.Payment, {
        foreignKey: "order_id",
        onDelete: "CASCADE",
        as: "payment",
      });
      Order.hasOne(models.Shipping, {
        foreignKey: "order_id",
        onDelete: "CASCADE",
        as: "shipping",
      });
      Order.hasMany(models.DiscountUsage, {
        foreignKey: "order_id",
        onDelete: "CASCADE",
        as: "discountUsages",
      });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      order_date: DataTypes.DATE,
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      shipping_fee: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
