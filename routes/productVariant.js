const express = require("express");
const ProductVariantController = require("../controllers/productVariant");

const productVariant = express.Router();

productVariant.get("/", ProductVariantController.getProductVariants);
productVariant.post("/", ProductVariantController.createProductVariant);
productVariant.put("/:id", ProductVariantController.updateProductVariant);
productVariant.delete("/:id", ProductVariantController.deleteProductVariant);
productVariant.get("/:id", ProductVariantController.getProductVariant);

module.exports = productVariant;
