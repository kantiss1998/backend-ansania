const { ProductVariant, Product, ProductSize, ProductColor } = require("../models");

class ProductVariantController {
  static async getProductVariants(req, res, next) {
    try {
      const variants = await ProductVariant.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name", "description"],
          },
          {
            model: ProductSize,
            as: "size",
            attributes: ["id", "name"],
          },
          {
            model: ProductColor,
            as: "color",
            attributes: ["id", "name", "hex_code", "image_url"],
          },
        ],
      });

      res.status(200).json(variants);
    } catch (error) {
      next(error);
    }
  }

  static async getProductVariant(req, res, next) {
    try {
      const { id } = req.params;
      const variant = await ProductVariant.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name", "description"],
          },
          {
            model: ProductSize,
            as: "size",
            attributes: ["id", "name"],
          },
          {
            model: ProductColor,
            as: "color",
            attributes: ["id", "name", "hex_code", "image_url"],
          },
        ],
      });

      if (!variant) {
        return res.status(404).json({ message: "Product variant not found" });
      }

      res.status(200).json(variant);
    } catch (error) {
      next(error);
    }
  }

  static async createProductVariant(req, res, next) {
    try {
      const { product_id, size_id, color_id, price, stock } = req.body;

      if (!product_id || !size_id || !color_id || !price || stock == null) {
        return res.status(400).json({
          message: "Product ID, size, color, price, and stock are required",
        });
      }

      const variant = await ProductVariant.create({
        product_id,
        size_id,
        color_id,
        price,
        stock,
      });

      res.status(201).json(variant);
    } catch (error) {
      next(error);
    }
  }

  static async updateProductVariant(req, res, next) {
    try {
      const { id } = req.params;
      const { size_id, color_id, price, stock } = req.body;

      const variant = await ProductVariant.findByPk(id);
      if (!variant) {
        return res.status(404).json({ message: "Product variant not found" });
      }

      await variant.update({
        size_id: size_id || variant.size_id,
        color_id: color_id || variant.color_id,
        price: price || variant.price,
        stock: stock != null ? stock : variant.stock,
      });

      res.status(200).json(variant);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductVariant(req, res, next) {
    try {
      const { id } = req.params;

      const variant = await ProductVariant.findByPk(id);
      if (!variant) {
        return res.status(404).json({ message: "Product variant not found" });
      }

      await variant.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductVariantController;
