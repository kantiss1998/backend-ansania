const express = require("express");
const ProductSizeController = require("../controllers/productSize");

const productsize = express.Router();

productsize.get("/", ProductSizeController.getProductSizes);
productsize.post("/", ProductSizeController.createProductSize);
productsize.put("/:id", ProductSizeController.updateProductSize);
productsize.delete("/:id", ProductSizeController.deleteProductSize);
productsize.get("/:id", ProductSizeController.getProductSize);

module.exports = productsize;
