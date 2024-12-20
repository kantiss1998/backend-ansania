const { CollectionProduct } = require("../models");

class CollectionProductController {
  static async getAllCollection(req, res, next) {
    try {
      const products = await CollectionProduct.findAll();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getCollectionProductById(req, res, next) {
    try {
      const { id } = req.params;
      const collectionProduct = await CollectionProduct.findByPk(id);
      if (!collectionProduct) {
        return res
          .status(404)
          .json({ message: "Collection product not found" });
      }
      res.status(200).json(collectionProduct);
    } catch (error) {
      next(error);
    }
  }

  static async createCollectionProduct(req, res, next) {
    try {
      const collectionProduct = await CollectionProduct.create(req.body);
      res.status(201).json(collectionProduct);
    } catch (error) {
      next(error);
    }
  }

  static async updateCollectionProduct(req, res, next) {
    try {
      const { id } = req.params;
      const collectionProduct = await CollectionProduct.findByPk(id);
      if (!collectionProduct) {
        return res
          .status(404)
          .json({ message: "Collection product not found" });
      }
      await collectionProduct.update({
        name: req.body.name || collectionProduct.name,
        description: req.body.description || collectionProduct.description,
      });
    } catch {
      next(error);
    }
  }

  static async uploadCollectionProduct(req, res, next) {
    try {
      const { id } = req.params;
      const collectionProduct = await CollectionProduct.findByPk(id);
      if (!collectionProduct) {
        return res
         .status(404)
         .json({ message: "Collection product not found" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const filePath = `https://ansania.store/CollectionProduct/${req.file.filename}`;
      await collectionProduct.update({ image_url: filePath });
      res.status(200).json(collectionProduct);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCollectionProduct(req, res, next) {
    try {
      const { id } = req.params;
      const collectionProduct = await CollectionProduct.findByPk(id);
      if (!collectionProduct) {
        return res
          .status(404)
          .json({ message: "Collection product not found" });
      }
      await collectionProduct.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CollectionProductController