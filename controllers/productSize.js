const { ProductSize, Product } = require("../models");

class ProductSizeController {
  static async getProductSizes(req, res, next) {
    try {
      const sizes = await ProductSize.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name", "description"],
          },
        ],
      });

      res.status(200).json(sizes);
    } catch (error) {
      next(error);
    }
  }

  static async getProductSize(req, res, next) {
    try {
      const { id } = req.params;
      const size = await ProductSize.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name", "description"],
          },
        ],
      });

      if (!size) {
        return res.status(404).json({ message: "Product size not found" });
      }

      res.status(200).json(size);
    } catch (error) {
      next(error);
    }
  }

  static async createProductSize(req, res, next) {
    try {
      const { productId, name } = req.body;

      if (!productId || !name) {
        return res.status(400).json({ message: "Product ID and name are required" });
      }

      const size = await ProductSize.create({ product_id : productId, name });
      res.status(201).json(size);
    } catch (error) {
      next(error);
    }
  }

  static async updateProductSize(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const size = await ProductSize.findByPk(id);
      if (!size) {
        return res.status(404).json({ message: "Product size not found" });
      }

      await size.update({ name: name || size.name });
      res.status(200).json(size);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductSize(req, res, next) {
    try {
      const { id } = req.params;
      const size = await ProductSize.findByPk(id);
      if (!size) {
        return res.status(404).json({ message: "Product size not found" });
      }

      await size.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductSizeController;
