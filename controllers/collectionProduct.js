const { CollectionProduct, Product, CollectionProductItem } = require("../models");

class CollectionProductController {
  static async getCollectionProducts(req, res, next) {
    try {
      const collections = await CollectionProduct.findAll({
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          {
            model: CollectionProductItem,
            as: "items",
            include: [
              {
                model: Product,
                as: "product",
                attributes: { exclude: ["created_at", "updated_at"] },
              },
            ],
          },
        ],
      });
      res.status(200).json(collections);
    } catch (error) {
      next(error);
    }
  }

  static async getCollectionProduct(req, res, next) {
    try {
      const { id } = req.params;
      const collection = await CollectionProduct.findByPk(id, {
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          {
            model: CollectionProductItem,
            as: "items",
            include: [
              {
                model: Product,
                as: "product",
                attributes: { exclude: ["created_at", "updated_at"] },
              },
            ],
          },
        ],
      });

      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }

      res.status(200).json(collection);
    } catch (error) {
      next(error);
    }
  }

  static async createCollectionProduct(req, res, next) {
    try {
      const { name, description } = req.body;

      const collection = await CollectionProduct.create({
        name,
        description,
        image_url: req.file ? `https://ansania.store/Collection/${req.file.filename}` : null,
      });

      res.status(201).json({
        message: "Collection created successfully",
        collection,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCollectionProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const collection = await CollectionProduct.findByPk(id);
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }

      await collection.update({
        name: name || collection.name,
        description: description || collection.description,
        image_url: req.file ? `https://ansania.store/Collection/${req.file.filename}` : collection.image_url,
      });

      res.status(200).json({
        message: "Collection updated successfully",
        collection,
      });
    } catch (error) {         
      next(error);
    }
  }

  static async deleteCollectionProduct(req, res, next) {
    try {
      const { id } = req.params;

      const collection = await CollectionProduct.findByPk(id);
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }

      await collection.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CollectionProductController;
