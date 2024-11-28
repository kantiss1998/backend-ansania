const { ProductColor } = require("../models");

class ProductColorController {
  static async getProductColors(req, res, next) {
    try {
      const colors = await ProductColor.findAll();
      res.status(200).json(colors);
    } catch (error) {
      next(error);
    }
  }

  static async getProductColor(req, res, next) {
    try {
      const color = await ProductColor.findByPk(req.params.id);
      res.status(200).json(color);
    } catch (error) {
      next(error);
    }
  }

  static async getProductColorByProductId(req, res, next) {
    try {
      const colors = await ProductColor.findAll({
        where: { product_id: req.params.product_id },
      });
      res.status(200).json(colors);
    } catch (error) {
      next(error);
    }
  }

  static async createProductColor(req, res, next) {
    try {
      const color = await ProductColor.create(req.body);
      res.status(201).json(color);
    } catch (error) {
      next(error);
    }
  }

  static async updateProductColor(req, res, next) {
    try {
      const { id } = req.params;
      const color = await ProductColor.findByPk(id);
      if (!color) {
        return res.status(404).json({ message: "Color not found" });
      }
      await color.update(req.body);
      res.status(200).json(color);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductColor(req, res, next) {
    try {
      const { id } = req.params;
      const color = await ProductColor.findByPk(id);
      if (!color) {
        return res.status(404).json({ message: "Color not found" });
      }
      await color.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
