const express = require("express");
const CategoryController = require("../controllers/category");
const checkFolder = require("../utils/checkFolder");
const upload = require("../utils/upload");

const category = express.Router();

category.get("/", CategoryController.getCategories);
category.post("/", CategoryController.createCategory)
category.put("/", CategoryController.updateCategory);
category.patch("/", CategoryController.uploadImageCategory);
category.delete("/", CategoryController.deleteCategory);
category.get("/:id", CategoryController.getCategory);
category.patch(
    "/:id",
    checkFolder("Category"),
    upload.single("image"),
    CategoryController.uploadImageCategory
  );

module.exports = category;