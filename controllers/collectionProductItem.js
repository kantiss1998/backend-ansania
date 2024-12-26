const { CollectionProductItem } = require("../models");

class CollectionProductItemController {
  static async addProductToCollection(req, res, next) {
    try {
      const { product_id, collection_product_id } = req.body;

      const collectionProductItem = await CollectionProductItem.create({
        product_id,
        collection_product_id,
      });

      res.status(201).json({
        message: "Product added to collection successfully",
        collectionProductItem,
      });
    } catch (error) {
      next(error);
    }
  }

  static async removeProductFromCollection(req, res, next) {
    try {
      const { id } = req.params;

      const collectionProductItem = await CollectionProductItem.findByPk(id);
      if (!collectionProductItem) {
        return res
          .status(404)
          .json({ message: "Collection product item not found" });
      }

      await collectionProductItem.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CollectionProductItemController;
