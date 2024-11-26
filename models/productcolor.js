"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductColor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductColor.belongsTo(models.Product, { foreignKey: "product_id" });
      ProductColor.hasMany(models.ProductVariant, { foreignKey: "color_id" });
    }
  }
  ProductColor.init(
    {
      product_id: DataTypes.INTEGER,
      image_url: DataTypes.STRING,
      hex_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProductColor",
    }
  );
  return ProductColor;
};
