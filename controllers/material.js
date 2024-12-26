const { Material } = require("../models");

class MaterialController {
  static async getMaterials(req, res, next) {
    try {
      const materials = await Material.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      res.status(200).json(materials);
    } catch (error) {
      next(error);
    }
  }

  static async getMaterial(req, res, next) {
    try {
      const { id } = req.params;
      const material = await Material.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!material) {
        return res.status(404).json({ message: "Material not found" });
      }

      res.status(200).json(material);
    } catch (error) {
      next(error);
    }
  }

  static async createMaterial(req, res, next) {
    try {
      const { name } = req.body;

      const material = await Material.create({ name });

      res.status(201).json({
        message: "Material created successfully",
        material,
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      next(error);
    }
  }

  static async updateMaterial(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const material = await Material.findByPk(id);
      if (!material) {
        return res.status(404).json({ message: "Material not found" });
      }

      await material.update({ name });

      res.status(200).json({
        message: "Material updated successfully",
        material,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteMaterial(req, res, next) {
    try {
      const { id } = req.params;

      const material = await Material.findByPk(id);
      if (!material) {
        return res.status(404).json({ message: "Material not found" });
      }

      await material.destroy();

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MaterialController;
