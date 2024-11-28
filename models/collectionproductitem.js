"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CollectionProductItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CollectionProductItem.belongsTo(models.Product, { foreignKey: "product_id" });
      CollectionProductItem.belongsTo(models.CollectionProduct, { foreignKey: "collection_product_id" });
    }
  }
  CollectionProductItem.init(
    {
      product_id: DataTypes.INTEGER,
      collection_product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CollectionProductItem",
    }
  );
  return CollectionProductItem;
};
