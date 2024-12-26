const express = require("express");
const ProductColorController = require("../controllers/productColor");
const checkFolder = require("../utils/checkFolder");
const upload = require("../utils/upload");

const productcolor = express.Router();

productcolor.get("/", ProductColorController.getProductColors);
productcolor.post("/", ProductColorController.createProductColor);
productcolor.put("/:id", ProductColorController.updateProductColor);
productcolor.delete("/:id", ProductColorController.deleteProductColor);
productcolor.get("/:id", ProductColorController.getProductColor);
productcolor.patch(
  "/:id",
  checkFolder("ProductColor"),
  upload.single("image"),
  ProductColorController.uploadImageColor
);

module.exports = productcolor;
