const express = require("express");
const CategoryController = require("../controllers/category");
const checkFolder = require("../utils/checkFolder");
const upload = require("../utils/upload");

const category = express.Router();

category.get("/", CategoryController.getCategories);
category.post("/", CategoryController.createCategory)
category.get("/:id", CategoryController.getCategory);
category.put("/:id", CategoryController.updateCategory);
category.delete("/:id", CategoryController.deleteCategory);
category.patch(
    "/:id",
    checkFolder("Category"),
    upload.single("image"),
    CategoryController.uploadImageCategory
  );

module.exports = category;