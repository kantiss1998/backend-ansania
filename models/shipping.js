"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shipping.belongsTo(models.Order, { foreignKey: "order_id" });
    }
  }
  Shipping.init(
    {
      order_id: DataTypes.INTEGER,
      address: DataTypes.STRING,
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      postal_code: DataTypes.STRING,
      shipping_date: DataTypes.DATE,
      status: DataTypes.STRING,
      courir: DataTypes.STRING,
      tracking_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Shipping",
    }
  );
  return Shipping;
};
