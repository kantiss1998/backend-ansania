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
      Product.belongsTo(models.Category, { foreignKey: "category_id" });
      Product.hasMany(models.ProductImage, { foreignKey: "product_id" });
      Product.hasMany(models.ProductColor, { foreignKey: "product_id" });
      Product.hasMany(models.ProductSize, { foreignKey: "product_id" });
      Product.hasMany(models.ProductVariant, { foreignKey: "product_id" });
      Product.hasMany(models.CollectionProductItem, { foreignKey: "product_id" });
    }
  }
  Product.init(
    {
      category_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
