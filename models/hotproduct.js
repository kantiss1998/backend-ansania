"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HotProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HotProduct.belongsTo(models.Product, { foreignKey: "product_id" });
    }
  }
  HotProduct.init(
    {
      product_id: DataTypes.INTEGER,
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "HotProduct",
    }
  );
  return HotProduct;
};
