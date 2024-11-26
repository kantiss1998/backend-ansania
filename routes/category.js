const express = require("express");
const CategoryController = require("../controllers/category");

const category = express.Router();

category.get("/", CategoryController.getCategories);
category.post("/", CategoryController.createCategory)
category.put("/", CategoryController.updateCategory);
category.patch("/", CategoryController.uploadImageCategory);
category.delete("/", CategoryController.deleteCategory);
category.get("/:id", CategoryController.getCategory);

module.exports = category;