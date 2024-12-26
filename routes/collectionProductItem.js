const express = require("express");
const CollectionProductItemController = require("../controllers/collectionProductItem");

const collectionProductItem = express.Router();

collectionProductItem.get("/", CollectionProductItemController.addProductToCollection);
collectionProductItem.delete("/:id", CollectionProductItemController.removeProductFromCollection);

module.exports = collectionProductItem;
