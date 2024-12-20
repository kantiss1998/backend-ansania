const express = require("express");
const ProductSizeController = require("../controllers/productSize");

const productsize = express.Router();

productsize.get("/", ProductSizeController.getAllProductSizes);
productsize.post("/", ProductSizeController.createProductSize);
productsize.put("/", ProductSizeController.updateProductSize);
productsize.delete("/", ProductSizeController.deleteProductSize);
productsize.get("/:id", ProductSizeController.getProductSizeById);
productsize.get("/:productid", ProductSizeController.getProductSizeByProductId);

module.exports = productsize;
