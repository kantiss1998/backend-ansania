const { ProductColor, Product } = require("../models");

class ProductColorController {
  static async getProductColors(req, res, next) {
    try {
      const colors = await ProductColor.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name", "description"],
          },
        ],
      });

      res.status(200).json(colors);
    } catch (error) {
      next(error);
    }
  }

  static async getProductColor(req, res, next) {
    try {
      const { id } = req.params;
      const color = await ProductColor.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name", "description"],
          },
        ],
      });

      if (!color) {
        return res.status(404).json({ message: "Product color not found" });
      }

      res.status(200).json(color);
    } catch (error) {
      next(error);
    }
  }

  static async createProductColor(req, res, next) {
    try {
      const { productId, name, hex_code } = req.body;

      if (!productId || !name || !hex_code) {
        return res
          .status(400)
          .json({ message: "Product ID, name, and hex code are required" });
      }

      const color = await ProductColor.create({ product_id : productId, name, hex_code });
      res.status(201).json(color);
    } catch (error) {
      next(error);
    }
  }

  static async updateProductColor(req, res, next) {
    try {
      const { id } = req.params;
      const { name, hex_code } = req.body;

      const color = await ProductColor.findByPk(id);
      if (!color) {
        return res.status(404).json({ message: "Product color not found" });
      }

      await color.update({
        name: name || color.name,
        hex_code: hex_code || color.hex_code,
      });

      res.status(200).json(color);
    } catch (error) {
      next(error);
    }
  }

  static async uploadImageColor(req, res, next) {
    try {
      const { id } = req.params;
      const color = await ProductColor.findByPk(id);
      if (!color) {
        return res.status(404).json({ message: "Product color not found" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const filePath = `https://ansania.store/ProductColor/${req.file.filename}`;
      await color.update({ image_url: filePath });

      res.status(200).json({ message: "Image uploaded successfully", filePath });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductColor(req, res, next) {
    try {
      const { id } = req.params;
      const color = await ProductColor.findByPk(id);
      if (!color) {
        return res.status(404).json({ message: "Product color not found" });
      }

      await color.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductColorController;
