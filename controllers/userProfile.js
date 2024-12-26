const { UserProfile, User } = require("../models");

class UserProfileController {
  static async getUserProfiles(req, res, next) {
    try {
      const profiles = await UserProfile.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "username", "email"],
          },
        ],
      });

      res.status(200).json(profiles);
    } catch (error) {
      next(error);
    }
  }

  static async getUserProfile(req, res, next) {
    try {
      const { id } = req.params;

      const profile = await UserProfile.findOne({
        where: { user_id: id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "username", "email"],
          },
        ],
      });

      if (!profile) {
        return res.status(404).json({ message: "User profile not found" });
      }

      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }

  static async createUserProfile(req, res, next) {
    try {
      const { user_id, fullname, phone_number, address } = req.body;

      if (!user_id) {
        return res.status(400).json({
          message: "User ID are required",
        });
      }

      const existingProfile = await UserProfile.findOne({ where: { user_id } });
      if (existingProfile) {
        return res.status(409).json({ message: "User profile already exists" });
      }

      const profile = await UserProfile.create({
        user_id,
        fullname,
        phone_number,
        address,
      });

      res.status(201).json(profile);
    } catch (error) {
      next(error);
    }
  }

  static async updateUserProfile(req, res, next) {
    try {
      const { id } = req.params;
      const { fullname, phone_number, address } = req.body;

      const profile = await UserProfile.findOne({ where: { user_id: id } });

      if (!profile) {
        return res.status(404).json({ message: "User profile not found" });
      }

      await profile.update({
        fullname: fullname || profile.fullname,
        phone_number: phone_number || profile.phone_number,
        address: address || profile.address,
      });

      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUserProfile(req, res, next) {
    try {
      const { id } = req.params;

      const profile = await UserProfile.findOne({ where: { id: id } });

      if (!profile) {
        return res.status(404).json({ message: "User profile not found" });
      }

      await profile.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserProfileController;
