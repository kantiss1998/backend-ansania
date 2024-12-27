"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
        onDelete: "SET NULL",
        as: "category",
      });
      Product.belongsTo(models.Type, {
        foreignKey: "type_id",
        onDelete: "SET NULL",
        as: "type",
      });
      Product.belongsTo(models.Material, {
        foreignKey: "material_id",
        onDelete: "SET NULL",
        as: "material",
      });
      Product.belongsTo(models.Finishing, {
        foreignKey: "finishing_id",
        onDelete: "SET NULL",
        as: "finishing",
      });

      Product.hasMany(models.ProductImage, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
        as: "images",
      });
      Product.hasMany(models.ProductSize, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
        as: "sizes",
      });
      Product.hasMany(models.ProductColor, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
        as: "colors",
      });
      Product.hasMany(models.ProductVariant, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
        as: "variants",
      });
      Product.hasMany(models.CollectionProductItem, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
        as: "collectionItems",
      });
    }
  }
  Product.init(
    {
      category_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      sku: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
