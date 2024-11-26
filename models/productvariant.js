"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductVariant.belongsTo(models.Product, { foreignKey: "product_id" });
      ProductVariant.belongsTo(models.ProductSize, { foreignKey: "size_id" });
      ProductVariant.belongsTo(models.ProductColor, { foreignKey: "color_id" });
      ProductVariant.hasMany(models.OrderItem, {
        foreignKey: "product_variant_id",
      });
      ProductVariant.hasMany(models.Wishlist, {
        foreignKey: "product_variant_id",
      });
      ProductVariant.hasMany(models.Review, {
        foreignKey: "product_variant_id",
      });
      ProductVariant.hasMany(models.Cart, {
        foreignKey: "product_variant_id",
      });
    }
  }
  ProductVariant.init(
    {
      product_id: DataTypes.INTEGER,
      size_id: DataTypes.INTEGER,
      color_id: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductVariant",
    }
  );
  return ProductVariant;
};
