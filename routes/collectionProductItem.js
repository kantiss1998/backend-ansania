const express = require("express");
const CollectionProductItemController = require("../controllers/collectionProductItem");

const colllectionProductItem = express.Router();

colllectionProductItem.get("/", CollectionProductItemController.addProductToCollection);
colllectionProductItem.delete("/:id", CollectionProductItemController.removeProductFromCollection);

module.exports = colllectionProductItem;
