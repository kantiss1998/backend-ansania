const { Category } = require("../models");

class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
      next();
    } catch (error) {
      res.status(404).json({ message: "Categories not found" });
      next(error);
    }
  }

  static async getCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving category" });
      next(error);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const category = await Category.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Error creating category" });
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
      await category.update(req.body);
      res.status(200).json(category);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Error updating category" });
      next(error);
    }
  }

  static async uploadImageCategory(req, res, next) {
    try {
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