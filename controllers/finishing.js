const { Finishing } = require("../models");

class FinishingController {
  static async getFinishings(req, res, next) {
    try {
      const finishings = await Finishing.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      res.status(200).json(finishings);
    } catch (error) {
      next(error);
    }
  }

  static async getFinishing(req, res, next) {
    try {
      const { id } = req.params;
      const finishing = await Finishing.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!finishing) {
        return res.status(404).json({ message: "Finishing not found" });
      }

      res.status(200).json(finishing);
    } catch (error) {
      next(error);
    }
  }

  static async createFinishing(req, res, next) {
    try {
      const { name } = req.body;

      const finishing = await Finishing.create({ name });

      res.status(201).json({
        message: "Finishing created successfully",
        finishing,
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      next(error);
    }
  }

  static async updateFinishing(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const finishing = await Finishing.findByPk(id);
      if (!finishing) {
        return res.status(404).json({ message: "Finishing not found" });
      }

      await finishing.update({ name });

      res.status(200).json({
        message: "Finishing updated successfully",
        finishing,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteFinishing(req, res, next) {
    try {
      const { id } = req.params;

      const finishing = await Finishing.findByPk(id);
      if (!finishing) {
        return res.status(404).json({ message: "Finishing not found" });
      }

      await finishing.destroy();

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FinishingController;
