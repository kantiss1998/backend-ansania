const express = require("express");
const ProductColorController = require("../controllers/productColor");

const productcolor = express.Router();

productcolor.get("/", ProductColorController.getAllProductColors);
productcolor.post("/", ProductColorController.createProductColor);
productcolor.put("/", ProductColorController.updateProductColor);
productcolor.delete("/", ProductColorController.deleteProductColor);
productcolor.get("/:id", ProductColorController.getProductColorById);
productcolor.get("/:productid", ProductColorController.getProductColorByProductId);

module.exports = productcolor;
