const { Product, Category } = require("../models");

class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Product,
            as: "products",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async getCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Product,
            as: "products",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }

      const category = await Category.create({ name, description });

      res.status(201).json({
        message: "Category created successfully",
        category,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json({
        message: "Category updated successfully",
        category,
      });
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async uploadImageCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const filePath = `https://ansania.store/Category/${req.file.filename}`;
      await category.update({ image_url: filePath });

      res
        .status(200)
        .json({ message: "Image uploaded successfully", filePath });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      await category.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting category" });
      next(error);
    }
  }
}

module.exports = CategoryController;
