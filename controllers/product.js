const { Product, Category, Material, Finishing, Type, ProductImage } = require("../models");

class ProductController {
  static async getProducts(req, res, next) {
    try {
      const products = await Product.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Category,
            as: "category",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: Material,
            as: "material",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: Finishing,
            as: "finishing",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: Type,
            as: "type",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: ProductImage,
            as: "images",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Category,
            as: "category",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: Material,
            as: "material",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: Finishing,
            as: "finishing",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: Type,
            as: "type",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: ProductImage,
            as: "images",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const { name, description, category_id, type_id, material_id, finishing_id } = req.body;

      const product = await Product.create({
        name,
        description,
        sku : "-",
        category_id,
        type_id,
        material_id,
        finishing_id,
      });

      res.status(201).json({
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const { name, description, sku, category_id, type_id, material_id, finishing_id } = req.body;

      await product.update({
        name: name || product.name,
        description: description || product.description,
        sku: sku || product.sku,
        category_id: category_id || product.category_id,
        type_id: type_id || product.type_id,
        material_id: material_id || product.material_id,
        finishing_id: finishing_id || product.finishing_id,
      });

      res.status(200).json({
        message: "Product updated successfully",
        product,
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await product.destroy();

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
