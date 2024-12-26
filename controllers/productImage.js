const { ProductImage, Product } = require("../models");

class ProductImageController {
  static async getProductImages(req, res, next) {
    try {
      const images = await ProductImage.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name", "description"],
          },
        ],
      });

      res.status(200).json(images);
    } catch (error) {
      next(error);
    }
  }

  static async getProductImage(req, res, next) {
    try {
      const { id } = req.params;
      const image = await ProductImage.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name", "description"],
          },
        ],
      });

      if (!image) {
        return res.status(404).json({ message: "Product image not found" });
      }

      res.status(200).json(image);
    } catch (error) {
      next(error);
    }
  }

  static async createProductImage(req, res, next) {
    try {
      const { product_id } = req.body;

      if (!product_id) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const filePath = `https://ansania.store/ProductImage/${req.file.filename}`;
      const image = await ProductImage.create({
        product_id,
        image_url: filePath,
      });

      res.status(201).json(image);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      next(error);
    }
  }

  static async updateProductImage(req, res, next) {
    try {
      const { id } = req.params;

      const image = await ProductImage.findByPk(id);
      if (!image) {
        return res.status(404).json({ message: "Product image not found" });
      }

      if (req.file) {
        const filePath = `https://ansania.store/ProductImage/${req.file.filename}`;
        await image.update({ image_url: filePath });
      }

      res.status(200).json(image);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductImage(req, res, next) {
    try {
      const { id } = req.params;

      const image = await ProductImage.findByPk(id);
      if (!image) {
        return res.status(404).json({ message: "Product image not found" });
      }

      await image.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductImageController;
