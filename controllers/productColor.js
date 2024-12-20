  const { ProductColor } = require("../models");

  class ProductColorController {
    static async getAllProductColors(req, res, next) {
      try {
        const colors = await ProductColor.findAll({
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        res.status(200).json(colors);
      } catch (error) {
        next(error);
      }
    }

    static async getProductColorById(req, res, next) {
      try {
        const color = await ProductColor.findByPk(req.params.id, {
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        res.status(200).json(color);
      } catch (error) {
        next(error);
      }
    }

    static async getProductColorByProductId(req, res, next) {
      try {
        const colors = await ProductColor.findAll({
          where: { product_id: req.params.productid },
          attributes: { exclude: ["createdAt", "updatedAt"] },
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

  module.exports = ProductColorController;
