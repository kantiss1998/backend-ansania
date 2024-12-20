class CollectionProductItemController {
  static async getAllCollectionProductItems(req, res, next) {
    try {
      const collectionProductItems = await CollectionProductItem.findAll({
        include: [{ model: Product, attributes: ["id", "name"] }],
      });
      res.status(200).json(collectionProductItems);
    } catch (error) {
      next(error);
    }
  }

  static async getCollectionProductItemsByCollectionId(req, res, next) {
    try {
      const { id } = req.params;
      const collectionProductItems = await CollectionProductItem.findAll({
        where: { collection_id: id },
        include: [{ model: Product, attributes: ["id", "name"] }],
      });
      res.status(200).json(collectionProductItems);
    } catch (error) {
      next(error);
    }
  }

  static async getCollectionProductItemsByProductId(req, res, next) {
    try {
      const { id } = req.params;
      const collectionProductItems = await CollectionProductItem.findAll({
        where: { product_id: id },
        include: [{ model: Collection, attributes: ["id", "name"] }],
      });
      res.status(200).json(collectionProductItems);
    } catch (error) {
      next(error);
    }
  }

  static async createCollectionProductItem(req, res, next) {
    try {
      const { collection_id, product_id } = req.body;
      const collectionProductItem = await CollectionProductItem.create({
        collection_id,
        product_id,
      });
      res.status(201).json(collectionProductItem);
    } catch (error) {
      next(error);
    }
  }

  static async updateCollectionProductItem(req, res, next) {
    try {
      const { id } = req.params;
      const collectionProductItem = await CollectionProductItem.findByPk(id);
      if (!collectionProductItem) {
        return res.status(404).json({ message: "Collection product item not found" });
      }
      await collectionProductItem.update(req.body);
      res.status(200).json(collectionProductItem);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCollectionProductItem(req, res, next) {
    try {
      const { id } = req.params;
      await CollectionProductItem.destroy({ where: { id } });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
