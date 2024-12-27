"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Discount.hasMany(models.DiscountUsage, {
        foreignKey: "discount_id",
        onDelete: "CASCADE",
        as: "usages",
      });
    }
  }
  Discount.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      promotion_period: DataTypes.STRING,
      description: DataTypes.STRING,
      discount_amount: DataTypes.STRING,
      image_url: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Discount",
    }
  );
  return Discount;
};
