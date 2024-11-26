"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductSize.belongsTo(models.Product, { foreignKey: "product_id" });
      ProductSize.hasMany(models.ProductVariant, { foreignKey: "size_id" });
    }
  }
  ProductSize.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProductSize",
    }
  );
  return ProductSize;
};
