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
      ProductVariant.belongsTo(models.Product, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
        as: "product",
      });
      ProductVariant.belongsTo(models.ProductSize, {
        foreignKey: "size_id",
        onDelete: "SET NULL",
        as: "size",
      });
      ProductVariant.belongsTo(models.ProductColor, {
        foreignKey: "color_id",
        onDelete: "SET NULL",
        as: "color",
      });

      ProductVariant.hasMany(models.Wishlist, {
        foreignKey: "product_variant_id",
        onDelete: "CASCADE",
        as: "wishlists",
      });
      ProductVariant.hasMany(models.Review, {
        foreignKey: "product_variant_id",
        onDelete: "CASCADE",
        as: "reviews",
      });
      ProductVariant.hasMany(models.Cart, {
        foreignKey: "product_variant_id",
        onDelete: "CASCADE",
        as: "cartItems",
      });
      ProductVariant.hasMany(models.OrderItem, {
        foreignKey: "product_variant_id",
        onDelete: "CASCADE",
        as: "orderItems",
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
