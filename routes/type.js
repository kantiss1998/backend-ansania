const express = require("express");
const TypeController = require("../controllers/type");

const type = express.Router();

type.get("/", TypeController.getTypes);
type.post("/", TypeController.createType);
type.get("/:id", TypeController.getType);
type.put("/:id", TypeController.updateType);
type.delete("/:id", TypeController.deleteType);

module.exports = type;
