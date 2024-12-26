const { Type } = require("../models");

class TypeController {
  static async getTypes(req, res, next) {
    try {
      const types = await Type.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      res.status(200).json(types);
    } catch (error) {
      next(error);
    }
  }

  static async getType(req, res, next) {
    try {
      const { id } = req.params;
      const type = await Type.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!type) {
        return res.status(404).json({ message: "Type not found" });
      }

      res.status(200).json(type);
    } catch (error) {
      next(error);
    }
  }

  static async createType(req, res, next) {
    try {
      const { name } = req.body;

      const type = await Type.create({ name });

      res.status(201).json({
        message: "Type created successfully",
        type,
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      next(error);
    }
  }

  static async updateType(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const type = await Type.findByPk(id);
      if (!type) {
        return res.status(404).json({ message: "Type not found" });
      }

      await type.update({ name });

      res.status(200).json({
        message: "Type updated successfully",
        type,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteType(req, res, next) {
    try {
      const { id } = req.params;

      const type = await Type.findByPk(id);
      if (!type) {
        return res.status(404).json({ message: "Type not found" });
      }

      await type.destroy();

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TypeController;
