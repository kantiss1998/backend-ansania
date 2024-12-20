const { ProductVariant } = require("../models");

class ProductVariantController {
  static async getProductVariants(req, res, next) {
    try {
      const productVariants = await ProductVariant.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(productVariants);
    } catch (error) {
      next(error);
    }
  }

  static async getProductVariantById(req, res, next) {
    try {
      const productVariant = await ProductVariant.findByPk(
        req.params.variantId,
        {
          attributes: { exclude: ["createdAt", "updatedAt"] },
        }
      );
      if (!productVariant) {
        return res.status(404).json({ message: "Product variant not found" });
      }
      res.status(200).json(productVariant);
    } catch (error) {
      next(error);
    }
  }

  static async getProductVariantsByProductId(req, res, next) {
    try {
      const productVariants = await ProductVariant.findAll({
        where: { product_id: req.params.product_id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(productVariants);
    } catch (error) {
      next(error);
    }
  }

  static async createProductVariant(req, res, next) {
    try {
      const productVariant = await ProductVariant.create(req.body);
      res.status(201).json(productVariant);
    } catch (error) {
      next(error);
    }
  }

  static async updateProductVariant(req, res, next) {
    try {
      const { variantId } = req.params;
      const productVariant = await ProductVariant.findByPk(variantId);
      if (!productVariant) {
        return res.status(404).json({ message: "Product variant not found" });
      }
      await productVariant.update(req.body);
      res.status(200).json(productVariant);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductVariant(req, res, next) {
    try {
      const { variantId } = req.params;
      const productVariant = await ProductVariant.findByPk(variantId);
      if (!productVariant) {
        return res.status(404).json({ message: "Product variant not found" });
      }
      await productVariant.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductVariantController;
