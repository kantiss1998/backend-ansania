"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductImage.belongsTo(models.Product, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
        as: "product",
      });
    }
  }
  ProductImage.init(
    {
      name: DataTypes.STRING,
      product_id: DataTypes.INTEGER,
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProductImage",
    }
  );
  return ProductImage;
};
