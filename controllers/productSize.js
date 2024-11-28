const { ProductSize } = require("../models");

class ProductSizeController {
  static async getProductSizes(req, res, next) {
    try {
      const productSizes = await ProductSize.findAll();
      res.status(200).json(productSizes);
    } catch (error) {
      next(error);
    }
  }

  static async getProductSize(req, res, next) {
    try {
      const { id } = req.params;
      const productSize = await ProductSize.findByPk(id);

      if (!productSize) {
        return res.status(404).json({ message: "Product size not found" });
      }

      res.status(200).json(productSize);
    } catch (error) {
      next(error);
    }
  }

  static async getProductSizeByProductId(req, res, next) {
    try {
      const { id } = req.params;
      const productSize = await ProductSize.findOne({
        where: { product_id: id },
      });

      if (!productSize) {
        return res
          .status(404)
          .json({ message: "Product size not found for this product" });
      }

      res.status(200).json(productSize);
    } catch (error) {
      next(error);
    }
  }

  static async createProductSize(req, res, next) {
    try {
      const { name, product_id } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }

      const productSize = await ProductSize.create({
        name,
        product_id: product_id,
      });

      res.status(201).json(productSize);
    } catch (error) {
      next(error);
    }
  }

  static async updateProductSize(req, res, next) {
    try {
      const { id } = req.params;
      const { name, product_id } = req.body;

      if (!name && !product_id) {
        return res
          .status(400)
          .json({ message: "At least one field must be updated" });
      }

      const productSize = await ProductSize.findByPk(id);

      if (!productSize) {
        return res.status(404).json({ message: "Product size not found" });
      }

      await productSize.update({
        name: name || productSize.name,
        product_id: product_id || productSize.product_id,
      });

      res.status(200).json(productSize);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductSize(req, res, next) {
    try {
      const { id } = req.params;
      const productSize = await ProductSize.findByPk(id);

      if (!productSize) {
        return res.status(404).json({ message: "Product size not found" });
      }

      await productSize.destroy();

      res.status(200).json(productSize);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductSizeController;
