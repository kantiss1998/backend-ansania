const { UserProfil } = require("../models");

class UserProfilController {
  static async getProfil(req, res, next) {
    try {
      const user = await UserProfil.findAll({
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getUserProfilByEmail(req, res, next) {
    try {
      const user = await UserProfil.findOne({
        where: { email: req.params.email },
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async updateUserProfil(req, res, next) {
    try {
      const user = await UserProfil.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await user.update(req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUserProfil(req, res, next) {
    try {
      const user = await UserProfil.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await user.destroy({ force: true });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserProfilController;