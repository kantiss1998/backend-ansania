"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProfil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfil.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  UserProfil.init(
    {
      user_id: DataTypes.INTEGER,
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserProfil",
    }
  );
  return UserProfil;
};
