const express = require("express");
const ProductImageController = require("../controllers/productImage");
const checkFolder = require("../utils/checkFolder");
const upload = require("../utils/upload");

const productImage = express.Router();

productImage.get("/", ProductImageController.getProductImages);
productImage.post(
  "/",
  checkFolder("productImage"),
  upload.single("image"),
  ProductImageController.createProductImage
);
productImage.put(
  "/:id",
  checkFolder("productImage"),
  upload.single("image"),
  ProductImageController.updateProductImage
);
productImage.delete("/:id", ProductImageController.deleteProductImage);
productImage.get("/:id", ProductImageController.getProductImage);

module.exports = productImage;
