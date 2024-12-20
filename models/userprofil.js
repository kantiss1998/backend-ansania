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
      fullname: DataTypes.STRING,
      address: {
        type: DataTypes.STRING,
        defaultValue: "-",
      },
      phone_number: {
        type: DataTypes.INTEGER,
        defaultValue: "-",
      },
      date_of_birth: {
        type: DataTypes.DATE,
        defaultValue: "-",
      },
    },
    {
      sequelize,
      modelName: "UserProfil",
    }
  );
  return UserProfil;
};
