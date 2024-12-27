"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wishlist.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        as: "user",
      });
      Wishlist.belongsTo(models.ProductVariant, {
        foreignKey: "product_variant_id",
        onDelete: "CASCADE",
        as: "variant",
      });
    }
  }
  Wishlist.init(
    {
      product_variant_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Wishlist",
    }
  );
  return Wishlist;
};
