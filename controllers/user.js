const nodemailer = require("nodemailer");
const Helpers = require("../helpers");
const { User, UserProfil } = require("../models");
const Authentication = require("../middlewares/authentication");

class UserController {
  static async GetUser(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ["password", "created_at", "updated_at"],
        },
      });

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async GetUserByEmail(req, res, next) {
    try {
      const user = await User.findOne({
        where: { email: req.params.email },
        attributes: {
          exclude: ["password", "created_at", "updated_at"],
        },
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async CreateUser(req, res, next) {
    try {
      const { username, email, password } = req.body;
      console.log(req.body);

      if (!username || !email || !password) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      const dataValidateEmail = Helpers.validateEmail(email);
      if (!dataValidateEmail) {
        return res.status(400).json({
          message: "Invalid email format",
        });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({
          message: "Email already exists",
        });
      }

      const hashPassword = Helpers.hashPassword(password);

      const user = await User.create(
        {
          username,
          email,
          password: hashPassword,
        },
        {
          returning: true,
          attributes: {
            exclude: ["password"],
          },
        }
      );

      await UserProfil.create({
        user_id: user.id
      });

      res.status(201).json({
        message: "User created successfully",
        user,
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
          message: "Email or username already exists",
        });
      }
      next(error);
    }
  }

  static async Login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await User.findOne({
        where: { email },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = Helpers.comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const userResponse = user.toJSON();
      delete userResponse.password;

      const token = Helpers.generateToken({
        id: user.id,
        role: user.role,
        email: user.email,
        username: user.username,
      });

      res.status(200).json({
        message: "Login successful",
        token,
        user: userResponse,
      });
    } catch (error) {
      next(error);
    }
  }

  static async UpdateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { username, email } = req.body;

      if (!username && !email) {
        return res.status(400).json({
          message: "At least one field to update is required",
        });
      }

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (email) {
        const existingEmail = await User.findOne({
          where: {
            email,
            id: { [Op.ne]: id },
          },
        });

        if (existingEmail) {
          return res.status(409).json({
            message: "Email already in use",
          });
        }
      }

      const updatedUser = await user.update(
        {
          username: username || user.username,
          email: email || user.email,
        },
        {
          attributes: { exclude: ["password"] },
        }
      );

      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
          message: "Email already exists",
        });
      }
      next(error);
    }
  }

  static async UpdatePassword(req, res, next) {
    try {
      const { oldPassword, newPassword, confirmNewPassword } = req.body;
      const userId = req.user.id;

      if (!oldPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({
          message: "New passwords do not match",
        });
      }

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const isMatchOldPassword = Helpers.comparePassword(
        oldPassword,
        user.password
      );

      if (!isMatchOldPassword) {
        return res.status(401).json({
          message: "Old password is incorrect",
        });
      }

      const hashNewPassword = Helpers.hashPassword(newPassword);

      await user.update({ password: hashNewPassword });

      res.status(200).json({
        message: "Password updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async ForgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const resetToken = Authentication.storeResetToken(user.id);

      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Password Reset Request",
        html: `
        <h1>Password Reset</h1>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          `,
      });

      res.status(200).json({
        message: "Password reset link sent to your email",
      });
    } catch (error) {
      next(error);
    }
  }

  static async ResetPassword(req, res, next) {
    try {
      const { token, newPassword, confirmNewPassword } = req.body;

      if (!newPassword || !confirmNewPassword) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const userId = req.resetTokenData.userId;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const hashNewPassword = Helpers.hashPassword(newPassword);

      await user.update({ password: hashNewPassword });

      Authentication.clearResetToken(token);

      res.status(200).json({
        message: "Password reset successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async DeleteUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      await user.destroy({ force: true });

      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
