const express = require("express");
const CollectionProductController = require("../controllers/collectionProduct");

const collectionProduct = express.Router();

collectionProduct.get("/", CollectionProductController.getCollectionProducts);
collectionProduct.post("/", CollectionProductController.createCollectionProduct);
collectionProduct.get("/:id", CollectionProductController.getCollectionProduct);
collectionProduct.put("/:id", CollectionProductController.updateCollectionProduct);
collectionProduct.delete("/:id", CollectionProductController.deleteCollectionProduct);

module.exports = collectionProduct;
