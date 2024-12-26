const express = require("express");
const ProductController = require("../controllers/product");

const product = express.Router();

product.get("/", ProductController.getProducts);
product.post("/", ProductController.createProduct);
product.put("/", ProductController.updateProduct);
product.delete("/", ProductController.deleteProduct);
product.get("/:id", ProductController.getProduct);

module.exports = product;
