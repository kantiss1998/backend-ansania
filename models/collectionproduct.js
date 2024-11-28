"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CollectionProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CollectionProduct.hasMany(models.CollectionProductItem, {
        foreignKey: "collection_product_id",
      });
    }
  }
  CollectionProduct.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CollectionProduct",
    }
  );
  return CollectionProduct;
};
