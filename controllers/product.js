const {
  Product,
  Category,
  ProductImage,
  ProductSize,
  ProductColor,
  ProductVariant,
} = require("../models");

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      const products = await Product.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: ProductImage,
            as: "images",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: ProductSize,
            as: "sizes",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: ProductColor,
            as: "colors",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: ProductVariant,
            as: "variants",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const product = await Product.findByPk(req.params.id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: ProductImage,
            as: "images",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: ProductSize,
            as: "sizes",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: ProductColor,
            as: "colors",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: ProductVariant,
            as: "variants",
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
      const { name, description, categoryId } = req.body;

      if (!name || !description) {
        return res.status(400).json({
          message: "Name and description are required",
        });
      }

      let finalCategoryId;
      if (typeof categoryId == "string") {
        const [category, created] = await Category.findOrCreate({
          where: { name: categoryId },
          defaults: {
            name: categoryId,
            description: "-",
          },
        });
        finalCategoryId = category.id;
      } else {
        const existingCategory = await Category.findByPk(categoryId);
        if (!existingCategory) {
          return res.status(400).json({ message: "Invalid category ID" });
        }
        finalCategoryId = categoryId;
      }

      const product = await Product.create({
        name,
        description,
        categoryId: finalCategoryId,
      });

      res.status(201).json({
        status: "success",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, categoryId } = req.body;

      if (!name && !description && !categoryId) {
        return res
          .status(400)
          .json({ message: "At least one field must be updated" });
      }

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (categoryId) {
        const existingCategory = await Category.findByPk(categoryId);
        if (!existingCategory) {
          return res.status(400).json({ message: "Invalid category ID" });
        }
      }

      await product.update(req.body);

      res.status(200).json({ data: product });
    } catch (error) {
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

      res.status(200).json({ message: "Product successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
