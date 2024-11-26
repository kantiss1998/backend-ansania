"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.ProductVariant, {
        foreignKey: "product_variant_id",
      });
      Review.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Review.init(
    {
      product_variant_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5,
          isValidRating(value) {
            if (value < 1 || value > 5) {
              throw new Error('Rating must be between 1 and 5');
            }
          }
        }
      },
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
