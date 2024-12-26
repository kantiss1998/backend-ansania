const express = require("express");
const MaterialController = require("../controllers/material");

const material = express.Router();

material.get("/", MaterialController.getMaterials);
material.post("/", MaterialController.createMaterial);
material.get("/:id", MaterialController.getMaterial);
material.put("/:id", MaterialController.updateMaterial);
material.delete("/:id", MaterialController.deleteMaterial);

module.exports = material;
