"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfil, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        as: "profile",
      });
      User.hasMany(models.Wishlist, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        as: "wishlists",
      });
      User.hasMany(models.Review, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        as: "reviews",
      });
      User.hasMany(models.Cart, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        as: "cartItems",
      });
      User.hasMany(models.Order, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        as: "orders",
      });
      User.hasMany(models.DiscountUsage, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        as: "discountUsages",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        defaultValue: "customer",
      },
      last_login: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
